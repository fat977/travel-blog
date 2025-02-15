import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SearchContext from "./context/SearchBarContext";

import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { DarkModeProvider } from "./context/DarkModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
    <SearchContext>
      <App />
    </SearchContext>
    </DarkModeProvider>
  </React.StrictMode>
);
