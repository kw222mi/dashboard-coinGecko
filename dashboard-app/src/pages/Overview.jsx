import { useEffect, useState } from "react";
import { fetchCoinData, fetchGlobalData } from "../services/coinGeckoService";
import TopFiveBarChart from "../components/TopFiveBarChart";
import PercentageChangeChart from "../components/PercentageChangeChart";
import MarketDominanceChart from "../components/MarketDominanceChart";

const Overview = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topFive, setTopFive] = useState([]);
  const [global, setGlobal] = useState({});

  // Hämtar aktuell globaldata
  useEffect(() => {
    const fetchGData = async () => {
      const cachedData = localStorage.getItem("globalData");
      const cachedTimestamp = localStorage.getItem("globalDataTimestamp");

      if (
        cachedData &&
        cachedTimestamp &&
        Date.now() - cachedTimestamp < 3600000 // 1 timme
      ) {
        const parsedData = JSON.parse(cachedData);
        console.log("parsed");
        console.log(parsedData.data.active_cryptocurrencies);
        setGlobal(parsedData);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchGlobalData("global");
        localStorage.setItem("globalData", JSON.stringify(data));
        localStorage.setItem("globalDataTimestamp", Date.now());
        setGlobal(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGData();
  }, []);

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

        const newArray = parsedData.map((item) => ({
          name: item.name,
          market_cap: item.market_cap,
          image: item.image,
          price_change_percentage_24h: item.price_change_percentage_24h,
        }));
        setTopFive(newArray.slice(0, 5));

        return;
      }

      try {
        const data = await fetchCoinData("coins/markets?vs_currency=eur");
        localStorage.setItem("coinsData", JSON.stringify(data));
        localStorage.setItem("coinsDataTimestamp", Date.now());
        setCoins(data);
        setLoading(false);

        const newArray = data.map((item) => ({
          name: item.name,
          market_cap: item.market_cap,
          image: item.image,
          price_change_percentage_24h: item.price_change_percentage_24h,
        }));
        setTopFive(newArray.slice(0, 5));
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* Hämtar historiska data
  useEffect(() => {
    const fetchHistoricalData = async () => {
      const cachedHistoricalData = localStorage.getItem("weeklyHistData");
      const cachedHistoricalTimestamp = localStorage.getItem(
        "weeklyHistDataTimestamp"
      );

      // Kontrollera om cachen är giltig (1 timme)
      if (
        cachedHistoricalData &&
        cachedHistoricalTimestamp &&
        Date.now() - cachedHistoricalTimestamp < 3600000
      ) {
        const parsedData = JSON.parse(cachedHistoricalData);
        console.log("Using cached weekly historical data:", parsedData);
        setHistoricalData(parsedData);
        return;
      }

      try {
        const now = new Date();
        const dates = [];
        for (let i = 0; i < 7; i++) {
          const pastDate = new Date();
          pastDate.setDate(now.getDate() - i);
          const day = String(pastDate.getDate()).padStart(2, "0");
          const month = String(pastDate.getMonth() + 1).padStart(2, "0"); // Månader är 0-indexerade
          const year = pastDate.getFullYear();
          dates.push(`${day}-${month}-${year}`);
        }

        console.log("Fetching historical data for dates:", dates);

        // Hämta data för varje dag
        const historicalDataArray = await Promise.all(
          dates.map(async (date) => {
            const data = await fetchHistoricData("bitcoin", date);
            return {
              date,
              price: data.market_data.current_price.eur, // Eller annan relevant data
            };
          })
        );

        console.log("Fetched weekly historical data:", historicalDataArray);

        // Spara i localStorage
        localStorage.setItem(
          "weeklyHistData",
          JSON.stringify(historicalDataArray)
        );
        localStorage.setItem("weeklyHistDataTimestamp", Date.now());

        setHistoricalData(historicalDataArray);
      } catch (error) {
        console.error("Failed to fetch weekly historical data:", error);
      }
    };

    fetchHistoricalData();
  }, []);
  */

  if (loading || coins.length === 0) {
    return <p>Laddar data...</p>;
  }

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <h1 className="text-3xl font-bold p-6 text-center bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md">
          Cryptocurrency Overview
        </h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Active Cryptocurrencies
            </h2>
            <p className="text-xl font-bold text-gray-700">
              {global.data.active_cryptocurrencies}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Number of Marketplaces
            </h2>
            <p className="text-xl font-bold text-gray-700">
              {global.data.markets}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Total Market Cap (USD)
            </h2>
            <p className="text-xl font-bold text-gray-700">
              ${(global.data.total_market_cap.usd / 1e12).toFixed(2)}T
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Total Volume (USD)
            </h2>
            <p className="text-xl font-bold text-gray-700">
              ${(global.data.total_volume.usd / 1e12).toFixed(2)}T
            </p>
          </div>
        </div>

        {/* Market Dominance Chart Section */}
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Market Dominance Overview
          </h2>
          {global && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <MarketDominanceChart
                marketCapPercentage={global.data.market_cap_percentage}
              />
            </div>
          )}
        </div>

        {/* Top Five Bar Chart */}
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Top 5 Cryptocurrencies by Market Cap
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <TopFiveBarChart topFive={topFive} />
          </div>
        </div>

        {/* Percentage Change Chart */}
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            24h Percentage Change for Top 5 Cryptocurrencies
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <PercentageChangeChart topFive={topFive} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;

//  <HistoricalLineChart historicalData={historicalData} />
