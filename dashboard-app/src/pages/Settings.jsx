import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Settings = () => {
  const [historicData, setHistoricData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoricData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily`
        );

        if (response.data && response.data.prices) {
          setHistoricData(response.data.prices);
        } else {
          console.error("Prices data is missing in API response!");
        }
      } catch (error) {
        console.error("Failed to load historic data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricData();
  }, []);

  // Gradient för linjediagrammet
  const createGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(59, 130, 246, 0.8)");
    gradient.addColorStop(1, "rgba(59, 130, 246, 0.1)");
    return gradient;
  };

  const priceData = {
    labels: historicData.map((entry) =>
      new Date(entry[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Price (USD)",
        data: historicData.map((entry) => entry[1]),
        borderColor: "#3b82f6",
        backgroundColor: (context) => createGradient(context.chart.ctx),
        pointBackgroundColor: "#1e40af",
        pointBorderColor: "#fff",
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4, // Gör linjen mjukare
        fill: true, // Fyll under linjen
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#374151", // Textfärg på legend
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(30, 58, 138, 0.9)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        cornerRadius: 5,
        displayColors: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#374151",
          font: {
            size: 12,
          },
        },
        grid: {
          display: false, // Dölj vertikala gridlinjer
        },
      },
      y: {
        ticks: {
          color: "#374151",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Lätt synliga horisontella gridlinjer
          lineWidth: 0.5,
        },
      },
    },
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-teal-500 text-white p-4 rounded-md shadow-md w-full max-w-2xl">
        Historic Cryptocurrency Data
      </h1>

      {loading ? (
        <p className="text-center text-lg mt-6">Loading data...</p>
      ) : (
        <div className="bg-white p-6 mt-6 rounded-md shadow-md w-full max-w-2xl">
          <h2 className="text-xl font-semibold text-center mb-4">
            Last 7 Days Price
          </h2>
          <div className="w-full h-80">
            <Line data={priceData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
