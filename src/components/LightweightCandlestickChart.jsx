// src/components/LightweightCandlestickChart.jsx

import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const LightweightCandlestickChart = ({ ohlcvData }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    // Create the chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 350,
    });

    // Create the candlestick series
    const candlestickSeries = chart.addCandlestickSeries();

    // Format the data for lightweight-charts
    const formattedData = ohlcvData.map((entry) => ({
      time: new Date(entry.Date).toISOString().split('T')[0], // yyyy-mm-dd format
      open: entry.Open,
      high: entry.High,
      low: entry.Low,
      close: entry.Close,
    }));

    // Set the data for the candlestick series
    candlestickSeries.setData(formattedData);

    // Handle chart resize
    const handleResize = () => {
      chart.resize(chartContainerRef.current.clientWidth, 350);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [ohlcvData]);

  return <div ref={chartContainerRef} style={{ width: '100%', height: '350px' }} />;
};

export default LightweightCandlestickChart;
