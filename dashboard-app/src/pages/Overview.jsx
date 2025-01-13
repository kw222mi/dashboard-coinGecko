import React, { useEffect, useState } from "react";
import { fetchCoinData, fetchCoinMarketsData } from "../services/coinGeckoService";

const Overview = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const data = await fetchCoinData("?time_period=24h");
        const data = await fetchCoinMarketsData()
        console.log("DATA" + data)
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Laddar...</p>;
  }

  return (
    <div>
      <h1>Kryptovalutor</h1>
      <p>{coins[0].name}</p>
   
    </div>
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