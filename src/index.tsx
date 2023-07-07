import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme, lightTheme, darkTheme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

function ThemeToggleButton() {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  return (
    <button onClick={toggleTheme}>
      Toggle Theme ({currentTheme === lightTheme ? "Light" : "Dark"})
    </button>
  );
}

function RootComponent() {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={currentTheme}>
        <button onClick={toggleTheme}>토글</button>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>,
  document.getElementById("root")
);
