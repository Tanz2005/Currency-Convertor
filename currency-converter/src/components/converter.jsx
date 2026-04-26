import React, { useEffect, useState } from "react";
import CurrencySelect from "./currencyselect";
import { currencyList } from "../data/currencies";

const Converter = () => {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState("...");
  const [loading, setLoading] = useState(false);

  // Auto convert
  useEffect(() => {
    if (!amount) return;

    const convert = async () => {
  setLoading(true);
  try {
    const res = await fetch(
      `https://open.er-api.com/v6/latest/${from}`
    );
    const data = await res.json();

    console.log("API DATA:", data);

    if (!data || !data.rates || !data.rates[to]) {
      throw new Error("Invalid API response");
    }

    const rate = data.rates[to];
    const converted = amount * rate;

    setResult(converted.toFixed(2));
  } catch (err) {
    console.error(err);
    setResult("Error");
  }
  setLoading(false);
};

    convert();
  }, [amount, from, to]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
  <div className="card">
    <h1>💱 Converter</h1>

    <input
      type="number"
      placeholder="Enter amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />

    <div className="row">
      <CurrencySelect value={from} onChange={setFrom} currencies={currencyList} />

      <button className="swap" onClick={swap}>
        🔄
      </button>

      <CurrencySelect value={to} onChange={setTo} currencies={currencyList} />
    </div>

    <div className="result">
      {loading ? "Converting..." : `${result} ${to}`}
    </div>
  </div>
);
};
export default Converter;