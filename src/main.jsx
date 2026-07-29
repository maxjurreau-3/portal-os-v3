import { enableHotModuleReload } from "./runtime/hmr.js";
enableHotModuleReload();
import React from "react";
import ReactDOM from "react-dom/client";
import { PortalShell } from "./runtime/shell.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PortalShell />
);
