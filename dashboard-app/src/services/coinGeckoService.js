import axios from "axios";

export const fetchCoinData = async (endpoint) => {
  try {
    const response = await axios.get(`/api/coingecko?endpoint=${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Could not fetch data");
  }
};
