import React from 'react'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = ({dataSet, label, color}) => {
    const data = {
      labels: label,
      datasets: [
        {
          label: 'Amount',
          barPercentage: 0.5,
          backgroundColor: color,
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: dataSet,
        },
      ],
    };

    const options = {
      indexAxis: 'x',  
      responsive: true,
      plugins: {
        legend: {
          display: false, 
        },
      },
      scales: {
        x: {
          beginAtZero: true, 
          ticks: {
            color: "white",
          },
        },
        y : {
          ticks: {
            color: "white",
          }
        }
      },
    };
  return (
    <Bar
      data={data} options={options}
    />
  )
}

export default BarChart
