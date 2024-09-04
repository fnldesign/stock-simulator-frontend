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
      </div>
      <h3>Closing Price Line Chart</h3>
      <StockChart ohlcvData={result.ohlcv_data} />
      <h3>Candlestick Chart</h3>
      <LightweightCandlestickChart ohlcvData={result.ohlcv_data} />
    </div>
  );
};

export default SimulationResults;
