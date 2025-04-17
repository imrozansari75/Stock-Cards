import React, { useEffect, useState } from 'react';
import StockCard from './StockCard';

const API_KEY = "d00au69r01qmsivrspe0d00au69r01qmsivrspeg";
const URL = "https://finnhub.io/api/v1";
const DEFAULT_STOCKS = ['AMZN', 'AAPL', 'MSFT', 'GOOGL', 'TSLA', 'META', 'NFLX'];

const StockDashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchStockData = async (symbol) => {
    try {
      console.log(`Fetching data for: ${symbol}`); // Debug log
      
      const [profileRes, quoteRes] = await Promise.all([
        fetch(`${URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`),
        fetch(`${URL}/quote?symbol=${symbol}&token=${API_KEY}`)
      ]);

      // Check if responses are OK
      if (!profileRes.ok || !quoteRes.ok) {
        throw new Error(`API request failed for ${symbol}`);
      }

      const [profileData, quoteData] = await Promise.all([
        profileRes.json(),
        quoteRes.json()
      ]);

      // Check if data is valid
      if (!profileData || !quoteData || Object.keys(quoteData).length === 0) {
        throw new Error(`Invalid data received for ${symbol}`);
      }

      console.log('Received data:', { profileData, quoteData }); // Debug log

      return {
        ticker: symbol,
        name: profileData.name || "N/A",
        sector: profileData.finnhubIndustry || "N/A",
        price: quoteData.c || 0,
        change: (quoteData.c - quoteData.pc) || 0,
        changePercent: (((quoteData.c - quoteData.pc) / quoteData.pc) * 100 || 0).toFixed(2),
        marketCap: profileData.marketCapitalization || 0,
        volume: quoteData.v || 0,
      };
    } catch (err) {
      console.error(`Error fetching ${symbol}:`, err);
      return null;
    }
  };

  const fetchMultipleStocks = async (symbols) => {
    setLoading(true);
    setError(null);
    
    try {
      const stockDataPromises = symbols.map(fetchStockData);
      const stockData = await Promise.all(stockDataPromises);
      
      const validStocks = stockData.filter(stock => stock !== null);
      setStocks(validStocks);
      
      if (validStocks.length === 0) {
        setError('No valid stock data received');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toUpperCase();
    if (!query) return;
    
    setLoading(true);
    setError(null);
    
    try {
      console.log(`Searching for: ${query}`); // Debug log
      const stock = await fetchStockData(query);
      
      if (stock) {
        console.log('Search result:', stock); // Debug log
        setSearchResults([stock]);
      } else {
        setSearchResults([]);
        setError(`No data found for ${query}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMultipleStocks(DEFAULT_STOCKS);
  }, []);

  const displayStocks = searchQuery.trim() ? searchResults : stocks;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stock symbol (e.g., AAPL)"
            className="flex-1 p-2 border rounded"
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
          {searchQuery.trim() && (
            <button 
              type="button" 
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
                setError(null);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {loading && <div className="p-4 text-center">Loading...</div>}
      {error && <div className="p-4 text-center text-red-500">Error: {error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayStocks.length > 0 ? (
            displayStocks.map((stock) => (
              <StockCard key={stock.ticker} stock={stock} />
            ))
          ) : (
            <div className="col-span-full text-center p-4">
              {searchQuery.trim() 
                ? "No stocks found for your search." 
                : "No stock data available."}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StockDashboard;