import React from 'react'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Doughnut } from "react-chartjs-2";
  ChartJS.register(ArcElement, Tooltip, Legend);
  
const DoughnutChart = ({dataSet}) => {
    
    const data = {
        labels: ["Online", "Cash"],
        datasets: [
          {
            label: 'Amount',
            data: dataSet,
            backgroundColor: ["#5984c2", "#deb771"], 
            hoverBackgroundColor: ["#064196", "#e09610"],
            hoverOffset: 4
          },
        ],
      };

    const options = {
    responsive: true,
    plugins: {
        legend: {
        position: "bottom",
        labels: {
          color: "white",
        },
        },
    },
    };
  return (
      <Doughnut data={data} options={options} />
  )
}

export default DoughnutChart
