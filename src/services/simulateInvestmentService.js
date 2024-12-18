// src/services/simulateInvestment.js

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BACKEND_ENDPOINT || "http://localhost:5000/api";
const FIXED_EXCHANGE = 'NYSE'; // Fixed exchange parameter

export const simulateInvestment = async (data) => {
  // Always use the fixed exchange "NYSE"
  const requestData = {
    ...data,
    exchange: FIXED_EXCHANGE, // Fixed to NYSE
  };

  const response = await axios.post(`${BASE_URL}/simulate`, requestData);
  return response;
};

export const fetchBenchmarks = async (exchange) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/benchmarks?exchange=${exchange}`);
    return response.data.benchmarks;
  } catch (error) {
    console.error("Error fetching benchmarks:", error);
    return [];
  }
};
