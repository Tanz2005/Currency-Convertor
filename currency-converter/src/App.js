import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState("");

  // Fetch currency list
  useEffect(() => {
    setCurrencies(["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD"]);
  }, []);

  // Convert currency
  const convertCurrency = async () => {
    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    try {
      const res = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await res.json();

      const rate = data.rates[toCurrency];
      const converted = (amount * rate).toFixed(2);

      setResult(`${amount} ${fromCurrency} = ${converted} ${toCurrency}`);
    } catch (error) {
      setResult("Error fetching data");
    }
  };

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="container">
      <h1>💱 Currency Converter</h1>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="dropdowns">
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((cur) => (
            <option key={cur}>{cur}</option>
          ))}
        </select>

        <button className="swap" onClick={swapCurrencies}>
          🔄
        </button>

        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((cur) => (
            <option key={cur}>{cur}</option>
          ))}
        </select>
      </div>

      <button className="convert-btn" onClick={convertCurrency}>
        Convert
      </button>

      <h2 className="result">{result}</h2>
    </div>
  );
}

export default App;