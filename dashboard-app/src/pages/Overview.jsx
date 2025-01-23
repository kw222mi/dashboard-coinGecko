import React, { useEffect, useState } from "react";
import {
  fetchCoinData,
  fetchHistoricData,
  fetchGlobalData,

} from "../services/coinGeckoService";
import TopFiveBarChart from "../components/TopFiveBarChart";
import PercentageChangeChart from "../components/PercentageChangeChart";
import HistoricalLineChart from "../components/LineChart"
import MarketDominanceChart from "../components/MarketDominanceChart"


const Overview = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topFive, setTopFive] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [global, setGlobal] = useState({})

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
        console.log("parsed")
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
          price_change_percentage_24h: item.price_change_percentage_24h
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
      <div>
        <h1>Cryptocurrency</h1>
        <p>Global data</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold">Active cryptocurrencies</h2>
            <p>{global.data.active_cryptocurrencies}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold">Number of marketplaces</h2>
            <p>{global.data.markets}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold">Total market cap (USD)</h2>
            <p>${(global.data.total_market_cap.usd / 1e12).toFixed(2)}T</p>
          </div>
        </div>

        <p>Total volume (EUR): {global.data.total_volume.eur}</p>

        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Kryptovaluta Översikt</h1>
          {global && (
            <>
          
              <MarketDominanceChart
                marketCapPercentage={global.data.market_cap_percentage}
              />
            </>
          )}
        </div>

        <p>
          Currency: {coins[0]?.name || "Unknown"}
          {coins[0]?.image && (
            <img src={coins[0].image} width={15} alt={coins[0]?.name} />
          )}
        </p>

        <p>Price: {coins[0].current_price}</p>
        <p>Market cap rank: {coins[0].market_cap_rank}</p>
        <p>Total volume: {coins[0].total_volume}</p>
        <p>Highest price in 24h: {coins[0].high_24h}</p>
        <p>Lowest price in 24h: {coins[0].low_24h}</p>
        <p>Price change in 24h: {coins[0].price_change_percentage_24h} %</p>
        <p>All time high: {coins[0].ath}</p>
      </div>

      <div>
        <TopFiveBarChart topFive={topFive} />
      </div>

      <div>
        <PercentageChangeChart topFive={topFive} />
      </div>
    </>
  );
};

export default Overview;

//  <HistoricalLineChart historicalData={historicalData} />

/**
 * 
 *   useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCoinData(
          "coins/markets?vs_currency=eur"
        );
        setCoins(data);
        //console.log(data)
        setLoading(false);

        const newArray= data.map((item) => ({
          name: item.name,
          market_cap: item.market_cap,
          image: item.image,
        }));
        setTopFive(newArray.slice(0, 5))
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchData();
  }, []);




  useEffect(() => {
      const fetchHData = async () => {
        try {
          const data = await fetchHistoricData("bitcoin", "30-12-2024");
          setHistoricalData(data)
          console.log(data);
          console.log("Current price" + data.market_data.current_price.eur);
          setLoading(false);
        } catch (error) {
          console.error("Failed to load data:", error);
        }
      };

      fetchHData();
    }, []); 
 */
