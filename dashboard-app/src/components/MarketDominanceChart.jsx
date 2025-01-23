
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from "prop-types";

// Registrera Chart.js-komponenter
ChartJS.register(ArcElement, Tooltip, Legend);

const MarketDominanceChart = ({ marketCapPercentage }) => {
  const data = {
    labels: Object.keys(marketCapPercentage), // Kryptovalutors namn
    datasets: [
      {
        data: Object.values(marketCapPercentage), // Dominans i procent
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9DE00",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#C9DE00",
        ],
        borderWidth: 2,
        borderColor: "#fff",
        hoverBorderColor: "#000",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 14,
          },
          color: "#333",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        bodyFont: {
          size: 14,
        },
        bodyColor: "#fff",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="p-6 bg-white rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
       
      </h2>
      <div style={{ height: "300px" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

MarketDominanceChart.propTypes = {
  marketCapPercentage: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default MarketDominanceChart;
