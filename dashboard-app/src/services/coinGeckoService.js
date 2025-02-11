import axios from "axios";

export const fetchCoinData = async (selectedCoin) => {
  try {
   const response = await axios.get(
     `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${selectedCoin}`
   );

   //const response = await axios.get(`/api/coingecko?endpoint=${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Could not fetch data");
  }
};

export const fetchGlobalData = async () => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/global`
    );
   
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Could not fetch data");
  }
};


export const fetchCoinMarketsData = async () => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Could not fetch data");
  }
};


export const fetchHistoricData = async (coin, days) => {
  try {
    const response = await axios.get(
      `/api/crypto?endpoint=coins/${coin}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Could not fetch data");
  }
};






//  https://api.coingecko.com/api/v3/global

// 'https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-12-2024' \

// https://api.coingecko.com/api/v3/coins/{id}/history?date={date}