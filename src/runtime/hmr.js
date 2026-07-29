import { PortalState } from "./state.js";
import { loadPortalModules } from "./loader.js";

export function enableHotModuleReload() {
  console.log("[HMR] Enabling Portal‑OS‑v3 hot module reload…");

  if (!import.meta.hot) {
    console.log("[HMR] No HMR available in this environment.");
    return;
  }

  // Reload unified module surface when any module changes
  import.meta.hot.accept(
    [
      "../modules/sim/index.js",
      "../modules/operators/index.js",
      "../modules/xr/index.js",
      "../modules/identity-physics/index.js",
      "../modules/games/index.js",
      "./renderers.jsx",
      "./loader.js"
    ],
    (newModules) => {
      console.log("[HMR] Module update detected. Reloading Portal‑OS‑v3…");

      // Rebuild module registry
      const loader = loadPortalModules();

      PortalState.modules = loader.modules;

      console.log("[HMR] Portal‑OS‑v3 modules reloaded:", loader.listModules());
    }
  );

  console.log("[HMR] Portal‑OS‑v3 hot module reload active.");
}
