import React from "react";

const CurrencySelect = ({ value, onChange, currencies }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {currencies.map((cur) => (
        <option key={cur.code} value={cur.code}>
          {cur.code} - {cur.name}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelect;