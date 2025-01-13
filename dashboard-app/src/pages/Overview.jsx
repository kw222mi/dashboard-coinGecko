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
        <h1>Kryptovalutor</h1>
        <p>{coins[1].name}</p>
        <img src={coins[1].image} width={15}></img>
        <p>{coins[1].current_price}</p>
        <p>{coins[1].market_cap_rank}</p>
        <p>{coins[1].total_volume}</p>
        <p>{coins[1].high_24h}</p>
        <p>{coins[1].low_24h}</p>
        <p>{coins[1].price_change_percentage_24h}</p>
        <p>{coins[1].ath}</p>
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