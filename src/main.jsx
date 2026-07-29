import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { bootPortalOS } from "./runtime/boot.jsx";

bootPortalOS();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
