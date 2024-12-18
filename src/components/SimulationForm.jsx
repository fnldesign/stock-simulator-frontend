// Componente SimulationForm atualizado com integração ao simulateInvestmentService
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Select from "react-select";
import { simulateInvestment } from "../services/simulateInvestmentService";
import StockIcon from "../assets/icons/app_icon.png";
import "./SimulationForm.css";

const SimulationForm = ({ onSimulate }) => {
  const { control, handleSubmit, setValue } = useForm();
  const [expanded, setExpanded] = useState(false); // Controle do Accordion
  const [selectedPeriod, setSelectedPeriod] = useState("1 Year"); // Estado para analysisPeriod
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  const handleAnalysisPeriodChange = (option) => {
    setSelectedPeriod(option.value); // Atualiza o estado local

    // Lógica: Atualizar startDate e endDate com base no período selecionado
    const today = new Date();
    let startDate = new Date();

    switch (option.value) {
      case "1 Year":
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      case "6 Months":
        startDate.setMonth(today.getMonth() - 6);
        break;
      case "3 Months":
        startDate.setMonth(today.getMonth() - 3);
        break;
      default:
        break;
    }

    setValue("startDate", startDate.toISOString().split("T")[0]);
    setValue("endDate", today.toISOString().split("T")[0]);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await simulateInvestment({
        symbol: data.symbol,
        start_date: data.startDate,
        end_date: data.endDate,
        start_value: parseFloat(data.initialInvestment),
        benchmarks: data.benchMarkIndex ? data.benchMarkIndex.map((b) => b.value) : [],
      });
      onSimulate && onSimulate(response.data);
    } catch (error) {
      console.error("Error simulating investment:", error);
      setErrorMessage("An error occurred while simulating the investment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const benchmarkOptions = [
    { value: "IBOV", label: "IBOV" },
    { value: "CDI", label: "CDI" },
    { value: "S&P 500", label: "S&P 500" },
    { value: "Down Jones", label: "Down Jones" },
    { value: "AGG", label: "Aggregate Bond Index (AGG)" },
  ];

  const analysisPeriodOptions = [
    { value: "1 Year", label: "1 Year" },
    { value: "6 Months", label: "6 Months" },
    { value: "3 Months", label: "3 Months" },
  ];

  return (
    <div className="simulation-container">
      <div className="form-header">
        <img src={StockIcon} alt="Stock Icon" className="form-icon" style={{ width: "40px", height: "40px", marginRight: "10px" }} />

        <Typography variant="h4" component="h2" className="form-title">
          Stock Investment Simulation
        </Typography>
      </div>
      <Typography variant="body1" paragraph className="form-instructions">
        Please provide the following information to simulate your investment:
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="simulation-form">
        <Controller
          name="symbol"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Stock Symbol" placeholder="e.g., AAPL" variant="outlined" fullWidth />
          )}
        />

        <Controller
          name="startDate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Start Date" type="date" InputLabelProps={{ shrink: true }} fullWidth />
          )}
        />

        <Controller
          name="endDate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="End Date" type="date" InputLabelProps={{ shrink: true }} fullWidth />
          )}
        />

        <Controller
          name="initialInvestment"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Initial Investment Value"
              type="number"
              placeholder="Enter initial value"
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Accordion expanded={expanded} onChange={handleAccordionChange} className="advanced-options">
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" className="accordion-title">Advanced Options</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Controller
              name="analysisPeriod"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={analysisPeriodOptions}
                  placeholder="Select Analysis Period"
                  onChange={(option) => {
                    field.onChange(option); // Atualiza o React Hook Form
                    handleAnalysisPeriodChange(option); // Atualiza lógica local
                  }}
                  value={analysisPeriodOptions.find((opt) => opt.value === selectedPeriod)}
                />
              )}
            />

            <Controller
              name="benchMarkIndex"
              control={control}
              render={({ field }) => (
                <Select {...field} options={benchmarkOptions} isMulti placeholder="Select Benchmarks" />
              )}
            />
          </AccordionDetails>
        </Accordion>

        {errorMessage && <Typography color="error" align="center">{errorMessage}</Typography>}

        <Typography variant="body2" align="center" className="terms-text">
          By simulating this investment, you agree to the{' '}
          <a href="/terms" target="_blank" rel="noopener noreferrer">
            Terms & Conditions
          </a>
        </Typography>

        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? "Simulating..." : "Simulate Investment"}
        </Button>
      </form>
    </div>
  );
};

export default SimulationForm;
