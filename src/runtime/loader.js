import { ModuleRoutes } from "./routing.js";
import { PortalState } from "./state.js";

import { gamesEngineInit } from "../modules/games/index.js";
import { identityPhysics } from "../modules/identity-physics/index.js";
import { operators } from "../modules/operators/index.js";
import { simCore } from "../modules/sim/index.js";
import { xrEngineInit } from "../modules/xr/index.js";

const moduleMap = {
  games: gamesEngineInit,
  "identity-physics": identityPhysics,
  operators,
  sim: simCore,
  xr: xrEngineInit
};

export function loadModules(modules) {
  console.log("[Portal‑OS‑v3] Loading modules...");

  Object.keys(modules).forEach(moduleName => {
    const route = ModuleRoutes[moduleName] || null;

    PortalState.modules[moduleName] = {
      name: moduleName,
      route,
      loaded: true
    };

    console.log(
      `[Portal‑OS‑v3] Module Loaded: ${moduleName} → Route: ${route}`
    );

    if (moduleMap[moduleName]) {
      moduleMap[moduleName]();
    }
  });

  console.log("[Portal‑OS‑v3] All modules loaded.");
}
