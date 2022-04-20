import React from 'react';
// import { Chart as ChartJS } from 'chart.js/auto'
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, PieController } from 'chart.js';



ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, PieController);


// <LineChart
//   width={400}
//   height={400}
//   data={data}
//   margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
// >
//   <XAxis dataKey="name" />
//   <Tooltip />
//   <CartesianGrid stroke="#f5f5f5" />
//   <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
//   <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
// </LineChart>


// import React, { useState, useEffect } from 'react'

// import cubejs from "@cubejs-client/core";
// import Chart from "chart.js/auto";
// import moment from "moment";
// import flatpickr from "flatpickr";

// const cubejsApi = cubejs(
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjEwMDAwMDAwMDAsImV4cCI6NTAwMDAwMDAwMH0.OHZOpOBVKr-sCwn8sbZ5UFsqI3uCs6e4omT7P6WVMFw",
//   {
//     apiUrl:
//       "https://awesome-ecom.gcp-us-central1.cubecloudapp.dev/cubejs-api/v1"
//   }
// );

// let chart;

// var drawChart = function (startDate, endDate) {
//   cubejsApi
//     .load({
//       measures: ["Orders.count"],
//       timeDimensions: [
//         {
//           dimension: "Orders.createdAt",
//           granularity: `day`,
//           dateRange: [startDate, endDate]
//         }
//       ]
//     })
//     .then((resultSet) => {
//       if (chart) {
//         chart.data = chartJsData(resultSet);
//         chart.update();
//       } else {
//         chart = new Chart(document.getElementById("chart"), {
//           type: "line",
//           options: {},
//           data: chartJsData(resultSet)
//         });
//       }
//     });
// };

// const MIN_DATE = "2020-08-01";
// const MAX_DATE = "2020-09-01";

// flatpickr("#dates", {
//   mode: "range",
//   dateFormat: "Y-m-d",
//   defaultDate: [MIN_DATE, MAX_DATE],

//   onChange: function (selectedDates) {
//     if (selectedDates.length === 2) {
//       drawChart(selectedDates[0], selectedDates[1]);
//     }
//   }
// });

// drawChart(MIN_DATE, MAX_DATE);

// var chartJsData = function (resultSet) {
//   return {
//     datasets: [
//       {
//         label: "Orders Count",
//         data: resultSet.chartPivot().map(function (r) {
//           return r["Orders.count"];
//         }),
//         backgroundColor: "rgb(255, 99, 132)"
//       }
//     ],
//     labels: resultSet.categories().map(function (c) {
//       return moment(c.x).format("DD MMM");
//     })
//   };
// };


function MyChart() {


    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "First dataset",
                data: [33, 53, 85, 41, 44, 65],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "Second dataset",
                data: [33, 25, 35, 51, 54, 76],
                fill: false,
                borderColor: "#742774"
            }
        ]
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ height: '500px', width: '900px' }}>
                    <Line data={data} />
                    
                </div>
            </div>
        </>
    )
}

export default MyChart;