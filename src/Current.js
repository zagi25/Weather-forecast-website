import { icons } from "./icons";
import { DynamicWiIcon } from "./Icon";
import moment from "moment";

const Current = ({ time, cityName, data, index }) => {
  const dt = moment.unix(data.daily[index].dt).format("dddd, MMM Do, YYYY");
  const weather_icon = data.daily[index].weather[0].id;
  const temp_daily = data.daily[index].temp.day;
  const state_daily = data.daily[index].weather[0].description;
  const humidity_daily = data.daily[index].humidity;
  const wind_speed_daily = data.daily[index].wind_speed;
  const { temp, state, humidity, wind_speed, id } = data;
  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

  return (
   <>
   {index === 0 ? 
    (<section>
      <h1>{cityName}</h1>
      <p className="time">{time}</p>
      <div className="temp_icon">
        <DynamicWiIcon name={icons[id]} className="icon" />
        <p className="temp">   
          {Math.round(temp)}
          <sup>
            <sup>o</sup>C
          </sup>
        </p>
      </div>

      <p className="state">{capitalize(state)}</p>

      <div className="hiw">
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {wind_speed} m/s</p>
      </div>
    </section>) :
	
  
    (<section>
      <h1>{cityName}</h1>
      <p className="time">{dt}</p>
      <div className="temp_icon">
        <DynamicWiIcon name={icons[weather_icon]} className="icon" />
        <p className="temp">   
          {Math.round(temp_daily)}
          <sup>
            <sup>o</sup>C
          </sup>
        </p>
      </div>

      <p className="state">{capitalize(state_daily)}</p>

      <div className="hiw">
        <p>Humidity: {humidity_daily}%</p>
        <p>Wind Speed: {wind_speed_daily} m/s</p>
      </div>
    </section>)
   }
   
     </> 	  
  );
};

export default Current;
