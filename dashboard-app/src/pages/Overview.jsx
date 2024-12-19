import React, { useEffect, useState } from "react";
import { fetchCoinData } from "../services/coinGeckoService";

const Overview = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCoinData("coins/markets?vs_currency=usd");
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
      <ul>
        {coins.map((coin) => (
          <li key={coin.id}>
            {coin.name}: ${coin.current_price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Overview;
