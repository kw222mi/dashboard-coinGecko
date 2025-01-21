import { Line } from "react-chartjs-2";
import PropTypes from "prop-types"; 
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


// Registrera nödvändiga komponenter
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const HistoricalLineChart = ({ historicalData }) => {
  // Förbered data för linjediagrammet
  const chartData = {
    labels: historicalData.map((item) => item.date), // Datum på X-axeln
    datasets: [
      {
        label: "Bitcoin Price (EUR)",
        data: historicalData.map((item) => item.price), // Priser på Y-axeln
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (EUR)",
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};


HistoricalLineChart.propTypes = {
  historicalData: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default HistoricalLineChart;
