const API_KEY = "cvv3m59r01qphtc8uli0cvv3m59r01qphtc8ulig";
const BASE_URL = "https://finnhub.io/api/v1";

export const searchStock = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search?q=${query}&token=${API_KEY}`);
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error searching stock:", error);
    return [];
  }
};
