// src/services/apiService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Replace with your backend URL
const FIXED_EXCHANGE = 'NYSE'; // Fixed exchange parameter

export const simulateInvestment = async (data) => {
  // Always use the fixed exchange "NYSE"
  const requestData = {
    ...data,
    exchange: FIXED_EXCHANGE, // Fixed to NYSE
  };

  const response = await axios.post(`${BASE_URL}/simulate`, requestData);
  return response.data;
};
