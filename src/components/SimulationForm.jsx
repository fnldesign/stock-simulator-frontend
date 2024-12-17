import React, { useState, useEffect } from "react";
import { simulateInvestment } from "../services/apiService";
import "./SimulationForm.css";

const SimulationForm = ({ onSimulate }) => {
  // Valores padrão do ambiente
  const defaultRiskTolerance = import.meta.env.VITE_APP_RISK_TOLERANCE || "Medium";
  const defaultAnalysisPeriod = import.meta.env.VITE_APP_ANALYSIS_PERIOD || "1 Year";

  // Estado principal do formulário
  const [formData, setFormData] = useState({
    stockSymbol: "",
    startDate: "",
    endDate: "",
    initialInvestment: "",
  });

  // Estado das opções avançadas
  const [advancedOptions, setAdvancedOptions] = useState({
    riskTolerance: defaultRiskTolerance,
    analysisPeriod: defaultAnalysisPeriod,
  });

  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [simulationResults, setSimulationResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Atualização das datas com base no período de análise
  useEffect(() => {
    const updateDatesForPeriod = () => {
      const today = new Date();
      const periods = {
        "1 Year": 365,
        "6 Months": 180,
        "3 Months": 90,
      };

      if (!formData.startDate) {
        // Sem data inicial preenchida
        const endDate = today.toISOString().split("T")[0];
        const startDate = new Date(today.setDate(today.getDate() - periods[advancedOptions.analysisPeriod]))
          .toISOString()
          .split("T")[0];

        setFormData((prev) => ({ ...prev, startDate, endDate }));
      } else {
        // Com data inicial preenchida
        const startDate = formData.startDate;
        const endDate = new Date(new Date(startDate).setDate(new Date(startDate).getDate() + periods[advancedOptions.analysisPeriod]))
          .toISOString()
          .split("T")[0];

        setFormData((prev) => ({ ...prev, endDate }));
      }
    };

    updateDatesForPeriod();
  }, [advancedOptions.analysisPeriod]);

  // Manipulação dos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdvancedChange = (e) => {
    const { name, value } = e.target;
    setAdvancedOptions((prev) => ({ ...prev, [name]: value }));
  };

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        symbol: formData.stockSymbol,
        start_date: formData.startDate,
        end_date: formData.endDate,
        start_value: parseFloat(formData.initialInvestment),
      };

      // Chamada da API
      const response = await simulateInvestment(data);

      // Verificação do status da API
      console.error(response.status);
      if (response.status !== 200) {
        const errorMessage = response.error || "An unexpected error occurred.";
        throw new Error(`API Error: ${errorMessage}`);
      }

      if (response.status == 400) {
        const errorMessage = response.error || "An unexpected error occurred.";
        throw new Error(`API Error: ${errorMessage}`);
      }
      onSimulate(response.data);
      setSimulationResults(response.data);

    } catch (error) {
      console.error("Error simulating investment:", error);
      setSimulationResults({
        errorMessage: "Failed to simulate investment. " + (error.message || "Please try again."),
      });
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="simulation-container">
      <form className="simulation-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Stock Investment Simulation</h2>
        <p className="form-instructions">
          Please provide the following information to simulate your investment:
        </p>

        {/* Campos do Formulário */}
        <input
          type="text"
          name="stockSymbol"
          placeholder="Stock Symbol (e.g., AAPL)"
          value={formData.stockSymbol}
          onChange={handleInputChange}
          required
        />

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          required
        />

        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          required
        />

        <input
          type="number"
          name="initialInvestment"
          placeholder="Initial Investment Value"
          value={formData.initialInvestment}
          onChange={handleInputChange}
          required
        />

        {/* Opções Avançadas */}
        <div className="accordion">
          <div className="accordion-header" onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}>
            <h3>Advanced Options</h3>
            <span>{showAdvancedOptions ? "▲" : "▼"}</span>
          </div>
          {showAdvancedOptions && (
            <div className="accordion-content">
              <label>
                Risk Tolerance:
                <select name="riskTolerance" value={advancedOptions.riskTolerance} onChange={handleAdvancedChange}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </label>

              <label>
                Analysis Period:
                <select name="analysisPeriod" value={advancedOptions.analysisPeriod} onChange={handleAdvancedChange}>
                  <option value="1 Year">1 Year</option>
                  <option value="6 Months">6 Months</option>
                  <option value="3 Months">3 Months</option>
                </select>
              </label>
            </div>
          )}
        </div>

        <p className="terms-text">
          By simulating this investment, you agree to the
          <a href="/terms" className="terms-link" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
        </p>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Simulating..." : "Simulate Investment"}
        </button>
      </form>

      {/* Resultados */}
      {simulationResults?.errorMessage && (
        <div className="error-message">
          {simulationResults.errorMessage}
        </div>
      )}
    </div>
  );
};

export default SimulationForm;
