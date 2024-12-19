import axios from "axios";

export default async function handler(req, res) {
  // Hantera endast GET-anrop
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Skicka en begäran till CoinGecko API
    const { endpoint } = req.query; // Hämta vilken del av API:t som ska anropas
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/${endpoint}`,
      {
        headers: {
          "Content-Type": "application/json",
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
