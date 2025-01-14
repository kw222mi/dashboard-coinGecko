import React, { useEffect, useState } from "react";
import { fetchCoinData, fetchCoinMarketsData } from "../services/coinGeckoService";
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

const Overview = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topFive, setTopFive] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCoinMarketsData()
        setCoins(data);
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
        <h1>Kryptovalutor</h1>
        <p>{coins[0].name}</p>
        <img src={coins[0].image} width={15}></img>
        <p>{coins[0].current_price}</p>
        <p>{coins[0].market_cap_rank}</p>
        <p>{coins[0].total_volume}</p>
        <p>{coins[0].high_24h}</p>
        <p>{coins[0].low_24h}</p>
        <p>{coins[0].price_change_percentage_24h}</p>
        <p>{coins[0].ath}</p>
      </div>

      <div>
        <h1>Top 5 kryptovalutor </h1>
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

export default Overview;


/**
 *    <ul>
        {coins.map((coin) => (
          <li key={coin.id}>
            {coin.name}: ${coin.current_price}
          </li>
        ))}
      </ul>
 */