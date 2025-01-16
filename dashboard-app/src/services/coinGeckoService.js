import axios from "axios";

export const fetchCoinData = async (endpoint) => {
  try {
   const response = await axios.get(
     `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur`
   );

   //const response = await axios.get(`/api/coingecko?endpoint=${endpoint}`);
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

export const fetchHistoricData = async (id, date) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Could not fetch data");
  }
};


// 'https://api.coingecko.com/api/v3/coins/bitcoin/history?date=30-12-2024' \

// https://api.coingecko.com/api/v3/coins/{id}/history?date={date}