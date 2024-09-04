// src/components/ApexCandlestickChart.jsx

import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './ApexCandlestickChart.css'; // Import CSS for overall page styling

const ApexCandlestickChart = ({ ohlcvData }) => {
  // Transform the OHLCV data into the format required by ApexCharts
  const series = [
    {
      name: 'Candlestick',
      data: ohlcvData.map((entry) => ({
        x: new Date(entry.Date).toISOString().split('T')[0], // Format date to yyyy-mm-dd
        y: [entry.Open, entry.High, entry.Low, entry.Close], // [Open, High, Low, Close]
      })),
    },
  ];

  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: 'Stock Price Movement',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: (val) => {
          const date = new Date(val);
          const day = date.getDay();
          // Skip weekends by formatting them as empty
          if (day === 6 || day === 0) return '';
          return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        },
      },
      tooltip: {
        enabled: true,
        formatter: (val) => {
          const date = new Date(val);
          return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
    plotOptions: {
      candlestick: {
        wick: {
          useFillColor: true,
        },
      },
    },
    tooltip: {
      x: {
        format: 'MMM dd, yyyy',
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="candlestick" height={350} />
    </div>
  );
};

export default ApexCandlestickChart;
