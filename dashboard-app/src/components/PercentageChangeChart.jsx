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
        borderRadius: 5,
        barPercentage: 0.8,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false, // Gör att diagrammet kan expandera
    plugins: {
      legend: { display: false },
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
        grid: { drawBorder: false },
        beginAtZero: true,
      },
      y: {
        grid: { drawBorder: false },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg mt-8">
     
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Stapeldiagrammet */}
        <div className="flex-1 w-full h-[300px] md:h-[400px] lg:h-[500px]">
          <Bar data={data} options={options} />
        </div>

        {/* Procentförändringspilar */}
        <div className="flex flex-col flex-0.5 space-y-4">
          {topFive.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <span className="mr-4 font-semibold">{item.name}:</span>
              <span
                className={`${
                  item.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {item.price_change_percentage_24h > 0 ? "▲" : "▼"}{" "}
                {item.price_change_percentage_24h.toFixed(2)}%
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
