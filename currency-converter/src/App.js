import React, { useEffect, useState } from "react";
import Converter from "./components/converter";
import ThemeToggle from "./components/themetoggle";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="app">
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <Converter />
    </div>
  );
}

export default App;