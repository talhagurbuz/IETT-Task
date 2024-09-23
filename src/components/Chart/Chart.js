import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Chart.css';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ data, onBarClick }) => {
  const chartRef = useRef();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            weight: 900,
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Ortalama UnitPrice Grafiği',
        color: '#fff',
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    onClick: (event) => {
      const chart = chartRef.current;
      if (!chart) return;
  
      const elements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
      if (elements.length > 0) {
        const { index } = elements[0];
        onBarClick(index);
      }
    }
  };

  return (
    <div className='chart-wrapper'>
      <h2 className='text-center fw-bold'>Ortalama UnitPrice Grafiği</h2>
      <div className="chart-container">
        <Bar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartComponent;
