import React, { useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState("");

  const currencies = ["USD", "INR", "EUR", "GBP", "JPY", "AUD", "CAD"];

  const convertCurrency = async () => {
    if (!amount || amount <= 0) {
      setResult("Enter a valid amount");
      return;
    }

    try {
      const res = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await res.json();
      const rate = data.rates[toCurrency];
      const converted = (amount * rate).toFixed(2);

      setResult(`${converted} ${toCurrency}`);
    } catch {
      setResult("Error fetching data");
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="app">
      <div className="card">
        <h1>💱 Currency Converter</h1>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="row">
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

        <button className="convert" onClick={convertCurrency}>
          Convert
        </button>

        <div className="result">{result}</div>
      </div>
    </div>
  );
}

export default App;