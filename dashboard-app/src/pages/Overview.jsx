import React, { useEffect, useState } from "react";
import { fetchCoinData, fetchHistoricData } from "../services/coinGeckoService";
import TopFiveBarChart from "../components/TopFiveBarChart";
import PercentageChangeChart from "../components/PercentageChangeChart";

const Overview = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topFive, setTopFive] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);

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
        }));
        setTopFive(newArray.slice(0, 5));
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchData();
  }, []);

  // Hämtar historiska data
  useEffect(() => {
    const fetchHistoricalData = async () => {
      const cachedHistoricalData = localStorage.getItem("histData");
      const cachedHistoricalTimestamp =
        localStorage.getItem("histDataTimestamp");

      if (
        cachedHistoricalData &&
        cachedHistoricalTimestamp &&
        Date.now() - cachedHistoricalTimestamp < 3600000 // 1 timme
      ) {
        const parsedData = JSON.parse(cachedHistoricalData);
        console.log("Using cached historical data:", parsedData);
        console.log(parsedData.market_data.current_price.eur);
        setHistoricalData(parsedData);
        return;
      }

      try {
        const data = await fetchHistoricData (
          "bitcoin","30-12-2024"
        );
        console.log("Fetched new historical data:", data);

        localStorage.setItem("histData", JSON.stringify(data));
        localStorage.setItem("histDataTimestamp", Date.now());

        setHistoricalData(data);
      } catch (error) {
        console.error("Failed to fetch historical data:", error);
      }
    };

    fetchHistoricalData();
  }, []);

  if (loading || coins.length === 0) {
    return <p>Laddar data...</p>;
  }

  return (
    <>
      <div>
        <h1>Cryptocurrency</h1>
        <p>
          Currency: {coins[0].name}
          <img src={coins[0].image} width={15} alt={coins[0].name} />
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
        <PercentageChangeChart topFive={coins.slice(0, 5)} />
      </div>
    </>
  );
};

export default Overview;

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
