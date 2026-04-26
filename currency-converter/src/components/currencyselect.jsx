import React from "react";

const CurrencySelect = ({ value, onChange, currencies }) => {
  const selected = currencies.find((c) => c.code === value);

  return (
    <div className="currency-select">
      <img
        src={`https://flagsapi.com/${selected.flag}/flat/32.png`}
        alt="flag"
      />

      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {currencies.map((cur) => (
          <option key={cur.code} value={cur.code}>
            {cur.code} - {cur.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;