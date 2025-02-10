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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Settings = () => {
  const [historicData, setHistoricData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");


 useEffect(() => {
   const fetchHistoricData = async () => {
     try {
       setLoading(true);
       const response = await axios.get(
         `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily`
       );

       console.log("Full response:", response); // Logga hela responsen
       console.log("Response data:", response.data); // Logga responsens data
       console.log("Prices:", response.data.prices); // Förväntade värdet

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



  const chartData = {
    labels: historicData.map((entry) =>
      new Date(entry[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Price (USD)",
        data: historicData.map((entry) => entry[1]),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-teal-500 text-white p-4 rounded-md shadow-md">
        Historic Cryptocurrency Data
        <p style={{ color: "red", fontSize: "24px" }}>
          🔥 Settings is rendering! 🔥
        </p>
      </h1>

      {loading ? (
        <p className="text-center text-lg mt-6">Loading data...</p>
      ) : (
        <div className="bg-white p-4 mt-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-center">
            Last 7 Days Price
          </h2>
          <div className="w-full h-80">
            <Line
              data={chartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
