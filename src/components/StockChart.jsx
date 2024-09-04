// src/components/StockChart.jsx

import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, LineElement, PointElement, Tooltip, Legend, Title } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

// Register the necessary components for the line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const StockChart = ({ ohlcvData }) => {
  // Prepare data for the line chart (closing prices over time)
  const lineChartData = {
    labels: ohlcvData.map((entry) => new Date(entry.Date).toISOString().split('T')[0]), // Format date to yyyy-mm-dd
    datasets: [
      {
        label: 'Closing Price',
        data: ohlcvData.map((entry) => entry.Close),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
        tension: 0.1, // Smooth line
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'yyyy-MM-dd',
          displayFormats: {
            day: 'yyyy-MM-dd',
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Closing Price',
        },
      },
    },
    maintainAspectRatio: false, // Adjust size to fit the container
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Chart type="line" data={lineChartData} options={lineChartOptions} />
    </div>
  );
};

export default StockChart;
