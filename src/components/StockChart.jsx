import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, LineElement, PointElement, Tooltip, Legend, Title } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { format, parseISO } from 'date-fns';
import _ from 'lodash';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const StockChart = ({
  ohlcvData,
  label,
  xField,
  yField,
  xFieldFormat = 'yyyy-MM-dd', // Default daily format
  yFieldFormat = 'rounded',
}) => {
  // Formatar eixo X dinamicamente
  const formatXAxis = (value) => {
    const date = new Date(value);
    return format(date, xFieldFormat); // Formata no formato especificado
  };

  // Formatar eixo Y dinamicamente
  const formatYAxis = (value) => {
    if (yFieldFormat === 'percent') {
      return `${parseFloat(value).toFixed(2)} %`;
    }
    if (yFieldFormat === 'rounded') {
      return parseFloat(value).toFixed(2);
    }
    return value;
  };

  // Agrupar os dados por mês se necessário
  const aggregateDataByMonth = (data) => {
    const grouped = _.groupBy(data, (entry) =>
      format(parseISO(entry[xField]), 'yyyy-MM')
    );

    return Object.keys(grouped).map((month) => {
      const avgValue =
        grouped[month].reduce((sum, entry) => sum + entry[yField], 0) /
        grouped[month].length;

      return { Date: month, Value: avgValue };
    });
  };

  // Aplicar agregação somente para o formato 'yyyy-MM'
  const aggregatedData =
    xFieldFormat === 'yyyy-MM' ? aggregateDataByMonth(ohlcvData) : ohlcvData;

  // Preparar os dados para o gráfico
  const lineChartData = {
    labels: aggregatedData.map((entry) => formatXAxis(entry[xField] || entry.Date)),
    datasets: [
      {
        label: label,
        data: aggregatedData.map((entry) => formatYAxis(entry[yField] || entry.Value)),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
        tension: 0.0, // Suavização da linha
      },
    ],
  };

  const lineChartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: xFieldFormat === 'yyyy-MM' ? 'month' : 'day',
          tooltipFormat: xFieldFormat,
          displayFormats: {
            month: 'yyyy-MM',
            day: 'yyyy-MM-dd',
          },
        },
        title: {
          display: true,
          text: xField,
        },
        ticks: {
          maxRotation: 45, // Inclina os labels em 45°
          minRotation: 45,
          padding: 10, // Adiciona espaçamento entre os labels e o eixo
          autoSkip: true, // Ajusta automaticamente para evitar sobreposição
        },
      },
      y: {
        title: {
          display: true,
          text: yField,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Chart type="line" data={lineChartData} options={lineChartOptions} />
    </div>
  );
};

export default StockChart;
