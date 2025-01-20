import React, { useEffect, useState } from "react";
import {
  fetchCoinData,
  fetchCoinMarketsData,
  fetchHistoricData,
} from "../services/coinGeckoService";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const TopFiveBarChart = () => {
 const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topFive, setTopFive] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  

useEffect(() => {
  const fetchData = async () => {
    const cachedData = localStorage.getItem("coinsData");
    const cachedTimestamp = localStorage.getItem("coinsDataTimestamp");

    // Kontrollera om datan är ny
    if (
      cachedData &&
      cachedTimestamp &&
      Date.now() - cachedTimestamp < 3600000 // 1 timme
    ) {
      const parsedData = JSON.parse(cachedData);
      setCoins(parsedData);
      setLoading(false);

      // Sätt topFive baserat på den cachade datan
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

      // Sätt topFive baserat på den hämtade datan
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


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options2 = {
    responsive: true,
    plugins: {
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
        },
      },
    },
  };



 const data2 = {
   labels: topFive.map((item) => item.name), // Använd namnen som etiketter
   datasets: [
     {
       label: "Market Cap",
       data: topFive.map((item) => item.market_cap), // Plocka ut market_cap för varje objekt
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
     },
   ],
 };

 

  if (loading) {
    return <p>Laddar...</p>;
  }

  return (
    <>
  

      <div>
        <h1>Top 5 Cryptocurrency </h1>
        <p>
          {coins[0].name} <img src={coins[0].image} width={15}></img>
          {coins[0].market_cap}
        </p>
        <p>
          {coins[1].name} <img src={coins[1].image} width={15}></img>
          {coins[1].market_cap}
        </p>
        <p>
          {coins[2].name} <img src={coins[2].image} width={15}></img>
          {coins[2].market_cap}
        </p>
        <p>
          {coins[3].name} <img src={coins[3].image} width={15}></img>
          {coins[3].market_cap}
        </p>
        <p>
          {coins[4].name} <img src={coins[4].image} width={15}></img>
          {coins[4].market_cap}
        </p>

        <Bar options={options2} data={data2} />
      </div>
    </>
  );
};

export default TopFiveBarChart;
