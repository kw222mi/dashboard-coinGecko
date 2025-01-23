import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopFiveBarChart = ({ topFive }) => {
  const options2 = {
    responsive: true,
    plugins: {
      legend: { display: false }, // Dölj legend för renare design
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Market Cap: $${context.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return `$${value / 1e9}B`; // Visar i miljarder
          },
          color: "#4A5568", // Färg på text
        },
        grid: {
          drawBorder: false, // Dölj ramlinje
          color: "#E2E8F0", // Ljus grå för rutnät
        },
      },
      x: {
        ticks: {
          color: "#4A5568", // Färg på text
        },
        grid: {
          drawBorder: false,
          display: false, // Dölj vertikala linjer
        },
      },
    },
  };

  const data2 = {
    labels: topFive.map((item) => item.name),
    datasets: [
      {
        label: "Market Cap",
        data: topFive.map((item) => item.market_cap),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        borderRadius: 5, // Rundade hörn på staplar
        barPercentage: 0.6, // Justera bredden på staplar
      },
    ],
  };

  return (
    <div
      style={{
        background: "#FFF",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        marginTop: "2rem",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#2D3748",
        }}
      >
        Top 5 Cryptocurrencies by Market Cap
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {topFive.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              background: "#F7FAFC",
              padding: "0.5rem",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={item.image}
              alt={`${item.name} logo`}
              style={{ width: "24px", height: "24px", borderRadius: "50%" }}
            />
            <span
              style={{
                fontWeight: "bold",
                color: "#2D3748",
                flex: 1,
              }}
            >
              {item.name}
            </span>
            <span style={{ color: "#4A5568" }}>
              Market Cap: ${item.market_cap.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <Bar data={data2} options={options2} />
    </div>
  );
};

TopFiveBarChart.propTypes = {
  topFive: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      market_cap: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TopFiveBarChart;
