import { useEffect, useState } from "react";
import { fetchCoinData } from "../services/coinGeckoService";
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
import { Card, CardContent } from "../components/ui/Card";
import { Select, SelectItem } from "../components/ui/Select"
import  Button  from "../components/ui/Button"
import axios from "axios";

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

const Details = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [historicData, setHistoricData] = useState([]);
  const [historicPriceData, setHistoricPriceData] = useState([]);
  const [historicMarketCapData, setHistoricMarketCapData] = useState([])
  const [historicTotalVolumesData, setHistoricTotalVolumesData] = useState([])

 useEffect(() => {
   const fetchData = async () => {
    console.log("SELECTED COIN " + selectedCoin)
     const cacheKey = `coinData-${selectedCoin}`;
     const cachedData = localStorage.getItem(cacheKey);
     const cachedTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);

     if (
       cachedData &&
       cachedTimestamp &&
       Date.now() - cachedTimestamp < 3600000
     ) {
       setCoins(JSON.parse(cachedData));
       setLoading(false);
       return;
     }

     try {
       setLoading(true);
       const data = await fetchCoinData(
         selectedCoin
       );
       localStorage.setItem(cacheKey, JSON.stringify(data));
       localStorage.setItem(`${cacheKey}-timestamp`, Date.now());
       setCoins(data);
       console.log('DATA ' + data.data)
     } catch (error) {
       console.error("Failed to load data:", error);
     } finally {
       setLoading(false);
     }
   };

   fetchData();
 }, [selectedCoin]);

  useEffect(() => {
    const fetchHistoricData = async () => {
      const cacheKey = `historicData-${selectedCoin}`;
      const cachedData = localStorage.getItem(cacheKey);
      const cachedTimestamp = localStorage.getItem(`${cacheKey}-timestamp`);

      if (
        cachedData &&
        cachedTimestamp &&
        Date.now() - cachedTimestamp < 3600000
      ) {

        const parsedData = JSON.parse(cachedData);
        setHistoricData(parsedData);
        setHistoricPriceData(parsedData.prices);
        setHistoricMarketCapData(parsedData.market_caps);
        setHistoricTotalVolumesData(parsedData.total_volumes);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=eur&days=7&interval=daily`
        );

        if (response.data && response.data.prices) {
          localStorage.setItem(cacheKey, JSON.stringify(response.data));
          localStorage.setItem(`${cacheKey}-timestamp`, Date.now());
          setHistoricData(response.data)
          setHistoricPriceData(response.data.prices);
          setHistoricMarketCapData(response.data.market_caps);
          setHistoricTotalVolumesData(response.data.total_volumes);
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
  }, [selectedCoin]);

  if (loading || coins.length === 0) {
    return <p className="text-center text-lg mt-6">Loading data...</p>;
  }

  // Gradient för linjediagrammet
  const createGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(59, 130, 246, 0.8)");
    gradient.addColorStop(1, "rgba(59, 130, 246, 0.1)");
    return gradient;
  };

  const priceHistData = {
    labels: historicPriceData.map((entry) =>
      new Date(entry[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Price (EUR)",
        data: historicPriceData.map((entry) => entry[1]),
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
  const marketCapHistData = {
    labels: historicMarketCapData.map((entry) =>
      new Date(entry[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Market Cap (EUR)",
        data: historicMarketCapData.map((entry) => entry[1]),
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
  const volumeHistData = {
    labels: historicTotalVolumesData.map((entry) =>
      new Date(entry[0]).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Total Volume (EUR)",
        data: historicTotalVolumesData.map((entry) => entry[1]),
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

  const coin = coins[0];
  const priceData = {
    labels: ["24h Low", "Current", "24h High"],
    datasets: [
      {
        label: "Price (€)",
        data: [coin.low_24h, coin.current_price, coin.high_24h],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
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
    <div className="bg-gray-50 min-h-screen">
      <h1 className=" font-main text-4xl font-bold p-6 text-center bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md">
        Cryptocurrency Details
      </h1>

      <div className="flex justify-center my-4">
        <Select onValueChange={setSelectedCoin} defaultValue={selectedCoin}>
          <SelectItem value="bitcoin">Bitcoin</SelectItem>
          <SelectItem value="ethereum">Ethereum</SelectItem>
          <SelectItem value="ripple">Ripple</SelectItem>
        </Select>
        <Button className="ml-2" onClick={() => setLoading(true)}>
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">{coin.name}</h2>
            <img src={coin.image} alt={coin.name} width={40} className="my-2" />
            <p className="text-lg font-bold">Price: €{coin.current_price}</p>
            <p
              className={
                coin.price_change_percentage_24h >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Market Data</h2>
            <p>Rank: {coin.market_cap_rank}</p>
            <p>Volume: {coin.total_volume.toLocaleString()} €</p>
            <p>Market Cap: {coin.market_cap.toLocaleString()} €</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">History</h2>
            <p>All time high: {coin.ath} €</p>
            <p>All time low: {coin.atl} €</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white p-4 mt-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-center">Price Changes</h2>
        <div className="w-full h-80">
          <Line
            data={priceData}
            options={{ responsive: true, maintainAspectRatio: true }}
          />
        </div>
      </div>

      <div className="bg-white p-6 mt-6 rounded-md shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-center mb-4">
          Last 7 Days Price
        </h2>
        <div className="w-full h-80">
          <Line data={priceHistData} options={chartOptions} />
        </div>
      </div>
      <div className="bg-white p-6 mt-6 rounded-md shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-center mb-4">
          Last 7 Days Market Cap
        </h2>
        <div className="w-full h-80">
          <Line data={marketCapHistData} options={chartOptions} />
        </div>
      </div>
      <div className="bg-white p-6 mt-6 rounded-md shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-center mb-4">
          Last 7 Days Total volume
        </h2>
        <div className="w-full h-80">
          <Line data={volumeHistData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Details;


  
        