import { useEffect, useState } from "react";
import { fetchCoinData } from "../services/coinGeckoService";

const Details = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  

  // Hämtar aktuell marknadsdata
  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem("coinsData");
      const cachedTimestamp = localStorage.getItem("coinsDataTimestamp");

      if (
        cachedData &&
        cachedTimestamp &&
        Date.now() - cachedTimestamp < 3600000 // 1 timme
      ) {
        const parsedData = JSON.parse(cachedData);
        setCoins(parsedData);
        setLoading(false);

        return;
      }

      try {
        const data = await fetchCoinData("coins/markets?vs_currency=eur");
        localStorage.setItem("coinsData", JSON.stringify(data));
        localStorage.setItem("coinsDataTimestamp", Date.now());
        setCoins(data);
        setLoading(false);

      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

   if (loading || coins.length === 0) {
     return <p>Laddar data...</p>;
   }

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <h1 className="text-3xl font-bold p-6 text-center bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md">
          Cryptocurrency Details
        </h1>
        <p>
          Currency: {coins[0]?.name || "Unknown"}
          {coins[0]?.image && (
            <img src={coins[0].image} width={15} alt={coins[0]?.name} />
          )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
          <h2>Price</h2>
          <p>Price: {coins[0].current_price}</p>
          <p>Price change in 24h: {coins[0].price_change_percentage_24h} %</p>
          <p>Highest price in 24h: {coins[0].high_24h}</p>
          <p>Lowest price in 24h: {coins[0].low_24h}</p>
          <p>All time high: {coins[0].ath}</p>
          <p>All time high date: {coins[0].ath_date}</p>

          <p>All time low: {coins[0].atl}</p>
          <p>All time low date: {coins[0].atl_date}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
          <h2>Market</h2>
          <p>Market cap rank: {coins[0].market_cap_rank}</p>
          <p>Market cap change 24h: {coins[0].market_cap_change_24h}</p>
          <p>
            Market cap change %: {coins[0].market_cap_change_percentage_24h}
          </p>
          <p>Circulating supply: {coins[0].circulating_supply}</p>
          <p>Total supply: {coins[0].total_supply}</p>
          <p>Total volume: {coins[0].total_volume}</p>
        </div>
      </div>
    </>
  );
};

export default Details;


