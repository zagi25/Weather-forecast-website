import { Line } from "react-chartjs-2";
import moment from "moment";

const Chart = ({ data, setIndex }) => {
  let chartData = {
    labels: data.map((day) => (moment.unix(day.dt).format("MMM Do"))),
    datasets: [
      {
        label: "Temperature",
        backgroundColor: "#2e2d2b",
      	borderColor:"white",
	      pointBackgroundColor: "#55bae7",
	      pointBorderColor: "#55bae7",
   	    pointHoverBackgroundColor: "#55bae7",
   	    pointHoverBorderColor: "#55bae7",      
      	data: data.map((day) => Math.round(day.temp.day)),
      },
    ],
  };

  return (
    <div>
      <h1 className="label">Temperature in the next 7 days:</h1>
      <Line
        data={chartData}
        options={{
	  onClick: function (evt, item) {
            if (item.length > 0) {
              setIndex(item[0].index);
            }
          },
          elements: {
            point: {
              pointRadius: 7,
	    },
            line: {
              tension: 0.18,
            },
          },
          plugins: {
            title: {
              display: false,
              text: "Temperature in next 7 days:",
            },
            legend: {
              display: false,
              position: "bottom",
            },
          },

          scales: {
            x: {
              display: true,
              grid: {
                display: false,
		borderColor: "white",	      
              },
	      ticks : {
		      color: "white",
		      font: {
			family: "Source Code Pro",
		      },

	      },
            },
            y: {
              display: true,
              grid: {
                display: false,
		borderColor: "white",	      
              },
	      ticks : {
		     color: "white",
		     font: {
			family: "Source Code Pro",
		      },
	      },
              suggestedMin: 0,
              suggestedMax: 40,
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;

//  setChartData({
//    labels: [1, 2, 3, 4, 5, 6, 7, 8],
//    datasets: [
//      {
//        label: "Temperature",
//        data: data.daily.map((day) => day.temp.day),
//      },
//    ],
//  });
