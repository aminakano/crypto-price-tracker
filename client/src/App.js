import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";
import './App.css';
const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(url)
      .then(res => {
        setCoins(res.data);
      })
      .catch(err => console.log(err))
  }, []);
  
  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="coin-container">
        <div className="coin-row">
          <div className="coin">
            <h4>Name</h4>
          </div>
          <div className="coin-data">
            <h4 className="coin-price">Price</h4>
            <h4 className="coin-volume">Volume</h4>
            <h4 className="coin-percent">24h</h4>
            <h4 className="coin-marketcap">Market Cap</h4>
          </div>
        </div>
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              volume={coin.total_volume}
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              marketcap={coin.market_cap}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
