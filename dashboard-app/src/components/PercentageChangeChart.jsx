import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";  
import PropTypes from "prop-types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);



const PercentageChangeChart = ({ topFive }) => {
  // Skapa datan för diagrammet
  const labels = topFive.map((item) => item.name);
  const dataValues = topFive.map((item) => item.price_change_percentage_24h);

  const data = {
    labels,
    datasets: [
      {
        label: "24h %-förändring",
        data: dataValues,
        backgroundColor: dataValues.map((value) =>
          value > 0 ? "rgba(75, 192, 192, 0.8)" : "rgba(255, 99, 132, 0.8)"
        ),
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y", // Gör det horisontellt
    responsive: true,
    plugins: {
      legend: { display: false }, // Dölj legend
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw.toFixed(2)}%`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          callback: (value) => `${value}%`,
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>24h %-förändring för de 5 största kryptovalutorna</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {/* Stapeldiagrammet */}
        <div style={{ flex: 1 }}>
          <Bar data={data} options={options} />
        </div>

        {/* Procentförändringspilar */}
        <div>
          {topFive.map((item, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: "1rem" }}>
                {item.name}:{" "}
                <span
                  style={{
                    color:
                      item.price_change_percentage_24h > 0 ? "green" : "red",
                  }}
                >
                  {item.price_change_percentage_24h > 0 ? "▲" : "▼"}{" "}
                  {item.price_change_percentage_24h.toFixed(2)}%
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

PercentageChangeChart.propTypes = {
  topFive: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price_change_percentage_24h: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PercentageChangeChart;
