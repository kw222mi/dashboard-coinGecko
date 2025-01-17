import axios from "axios";

export default async function handler(req, res) {

  console.log("HANDLER")
  // Hantera endast GET-anrop
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Skicka en begäran till CoinGecko API
    const { endpoint } = req.query; // Hämta vilken del av API:t som ska anropas
     console.log("Endpoint received:", endpoint);
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/${endpoint}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Private-Token": process.env.API_KEY,
        },
      }
    );

    // Returnera datan från CoinGecko API till frontend
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch data from CoinGecko" });
  }
}
