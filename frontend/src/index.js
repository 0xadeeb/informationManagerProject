import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TokenProvider } from "./stores/context";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

ReactDOM.render(
  <TokenProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TokenProvider>,
  document.getElementById("root")
);
