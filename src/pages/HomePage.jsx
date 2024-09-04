// src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import SimulationForm from '../components/SimulationForm';
import SimulationResults from '../components/SimulationResults';
import './HomePage.css'; // Import CSS for overall page styling

const HomePage = () => {
  const [simulationResult, setSimulationResult] = useState(null);

  useEffect(() => {
    document.title = 'Stock Investment Simulation'; // Defina o novo título da página aqui
  }, []);

  return (
    <div className="home-page">
      <div className="left-panel">
        <SimulationForm onSimulate={setSimulationResult} />
      </div>
      <div className="right-panel">
        {simulationResult && simulationResult.result && (
          <SimulationResults result={simulationResult.result} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
