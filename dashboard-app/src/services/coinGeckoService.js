import axios from "axios";

export const fetchCoinData = async (endpoint) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/bitcoin${endpoint}`
    ); 
   // const response = await axios.get(`/api/coingecko?endpoint=${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Could not fetch data");
  }
};


export const fetchCoinMarketsData = async (endpoint) => {
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