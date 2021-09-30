import { useState, useEffect, useRef } from "react";
import moment from "moment";
import Current from "./Current";
import Loading from "./Loading";
import Chart from "./Chart";
import { FaSearch } from "react-icons/fa";

function App() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [input, setInput] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [data, setData] = useState({
    date_time: null,
    temp: null,
    humidity: null,
    wind_speed: null,
    id: null,
    state: "",
    daily: [],
  });
  const [cityName, setCityName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const isMounted = useRef(0);
  const url1 = `http://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&appid=0a0015fb406229dfc0d39446cf26e8e4`;
  const url2 = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=0a0015fb406229dfc0d39446cf26e8e4`;
  const url3 = `http://api.openweathermap.org/geo/1.0/reverse?lat=${location.lat}&lon=${location.lon}&appid=0a0015fb406229dfc0d39446cf26e8e4`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(input);
    setInput("");
    isMounted.current = 3;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        isMounted.current = 1;
      },
      function (error) {
        setCity("London");
        setLocation({ lat: 51.5085, lon: -0.1257 });
        isMounted.current = 3;
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  }, []);

  useEffect(() => {}, [data]);

  useEffect(() => {
    const fetchLoLa = async () => {
      try {
        const response1 = await fetch(url2);
        const cityd = await response1.json();
        setLocation({ lat: cityd[0].lat, lon: cityd[0].lon });
      } catch (error) {
        console.log(error);
      }
    };
    if (isMounted.current === 3) {
      fetchLoLa();
    }
  }, [city, url2]);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url1);
        const weather = await response.json();
        setData({
          date_time: weather.current.dt,
          temp: weather.current.temp,
          humidity: weather.current.humidity,
          wind_speed: weather.current.wind_speed,
          id: weather.current.weather[0].id,
          state: weather.current.weather[0].description,
          daily: weather.daily,
        });
	setIndex(0);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    const fetchCityN = async () => {
      try {
        const response = await fetch(url3);
        const name = await response.json();
        setCityName(name[0].name);
      } catch (error) {
        console.log(error);
      }
    };
    if (isMounted.current === 1) {
      fetchCityN();
      isMounted.current = 2;
    }
    if (isMounted.current === 2 || isMounted.current === 3) {
      fetchWeather();
      fetchCityN();
      setTime(moment().format("HH:mm, dd, MMM Do, YYYY"));
    }
  }, [location, url1, url3]);


  return (
    <>
      {isLoading ? (
        
    <div className="loading">
        <Loading />
    </div>
      ) : (
        <main>
          <form onSubmit={handleSubmit} className="form-control">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter city"
            />
            <FaSearch onClick={handleSubmit} className="search-btn" />
          </form>
          <div className="current">
            	<Current
             	 time={time}
              	 cityName={cityName}
             	 data={data}
              	 loading={isLoading}
	         index = {index}
           	 />  
          </div>

          <div className="chart">
            <Chart data={data.daily} setIndex={setIndex} />
          </div>

         
        </main>
      )}
    </>
  );
}

export default App;
