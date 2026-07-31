import React, { useState } from "react";
import { createRoot } from "react-dom/client";
//import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./app/MaterialTheme";
import "./css/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalContext } from "./app/hooks/useGlobals";
import { Member } from "./lib/types/member";

const container = document.getElementById("root")!;
const root = createRoot(container);

function GlobalProviderWrapper() {
  const [authMember, setAuthMember] = useState<Member | null>(null);

  return (
    <GlobalContext.Provider value={{ authMember, setAuthMember }}>
      <Router>
        <App />
      </Router>
    </GlobalContext.Provider>
  );
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalProviderWrapper />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();