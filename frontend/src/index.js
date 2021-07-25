import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TokenProvider } from "./stores/context";

ReactDOM.render(
  <TokenProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TokenProvider>,
  document.getElementById("root")
);
