// src/components/SimulationResults.jsx

import React from 'react';
import LightweightCandlestickChart from './LightweightCandlestickChart';
import StockChart from './StockChart';
import './SimulationResults.css'; // Import CSS for styling

const SimulationResults = ({ result }) => {
  return (
    <div className="results-card">
      <h2>Result of Simulation</h2>
      <div className="growth-info">
        <p>Growth Rate: {result.growth_rate}%</p>
        <p>Value Change: ${result.value_change}</p>
        <p>End Value: {result.end_value}</p>
      </div>
      <h3>Closing Price Line Chart</h3>
      <StockChart 
        ohlcvData={result.change_data}
        label="Cumulative Return"
        xField="Date"
        yField="Cumulative_Return"
        xFieldFormat="yyyy-MM" // Exemplo: 01 Jan 2023
        yFieldFormat="rounded" />
      <h3>Candlestick Chart</h3>
      <LightweightCandlestickChart ohlcvData={result.ohlcv_data} />
    </div>
  );
};

export default SimulationResults;
