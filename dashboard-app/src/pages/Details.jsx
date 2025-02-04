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
} from "chart.js";
import { Card, CardContent } from "../components/ui/Card";
import { Select, SelectItem } from "../components/ui/Select"
import  Button  from "../components/ui/Button"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Details = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchCoinData(
          `coins/markets?vs_currency=eur&ids=${selectedCoin}`
        );
        setCoins(data);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCoin]);

  if (loading || coins.length === 0) {
    return <p className="text-center text-lg mt-6">Loading data...</p>;
  }

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

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-teal-500 text-white p-4 rounded-md shadow-md">
        Cryptocurrency Dashboard
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
    </div>
  );
};

export default Details;