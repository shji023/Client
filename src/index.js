import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
