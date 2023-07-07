import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, styled } from "styled-components";
import App from "./App";
import { theme, lightTheme, darkTheme } from "./theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const queryClient = new QueryClient();

const Toggle = styled.button`
  background-color: ${(prop) => prop.theme.bgColor};
  color: ${(prop) => prop.theme.textColor};
`;

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
        <App />
        <Toggle onClick={toggleTheme}>
          {currentTheme === lightTheme ? "Dark 전환" : "Light 전환"}
        </Toggle>
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
