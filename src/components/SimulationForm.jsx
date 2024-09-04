// src/components/SimulationForm.jsx

import React, { useState } from 'react';
import { simulateInvestment } from '../services/apiService';
import './SimulationForm.css';  // Import the CSS file

const SimulationForm = ({ onSimulate }) => {
  const [symbol, setSymbol] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startValue, setStartValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { symbol, start_date: startDate, end_date: endDate, start_value: parseFloat(startValue) };
    const result = await simulateInvestment(data);
    onSimulate(result);
  };

  return (
    <div className="form-container">
      <h2>Stock Investment Simulation</h2>
      <p>Please provide the following information to simulate your investment:</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="input-field"
          value={symbol} 
          onChange={(e) => setSymbol(e.target.value)} 
          placeholder="Stock Symbol (e.g., AAPL)" 
          required 
        />
        <input 
          type="date" 
          className="input-field"
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
          required 
        />
        <input 
          type="date" 
          className="input-field"
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          className="input-field"
          value={startValue} 
          onChange={(e) => setStartValue(e.target.value)} 
          placeholder="Initial Investment Value" 
          required 
        />
        <p className="terms-text">
          By simulating this investment, you agree to the 
          <a href="#" className="terms-link">Terms & Conditions</a>
        </p>
        <button type="submit" className="confirm-btn">Simulate Investment</button>
      </form>
    </div>
  );
};

export default SimulationForm;
