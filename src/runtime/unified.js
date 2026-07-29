import { simCore } from "../modules/sim/index.js";
import { operators } from "../modules/operators/index.js";
import { xrEngineInit } from "../modules/xr/index.js";
import { identityPhysics } from "../modules/identity-physics/index.js";
import { gamesEngineInit } from "../modules/games/index.js";

import { ModuleRenderers } from "./renderers.jsx";
import { PortalState } from "./state.js";

export function UnifiedSurface() {
  console.log("[UnifiedSurface] Initializing Portal‑OS‑v3 unified runtime...");

  // Initialize all engines and modules in correct OS order
  simCore();
  operators();
  xrEngineInit();
  identityPhysics();
  gamesEngineInit();

  console.log("[UnifiedSurface] All engines initialized.");

  // Build unified module map
  const modules = {
    sim: ModuleRenderers.sim,
    operators: ModuleRenderers.operators,
    xr: ModuleRenderers.xr,
    "identity-physics": ModuleRenderers["identity-physics"],
    games: ModuleRenderers.games
  };

  // Register unified modules into PortalState
  PortalState.modules = modules;

  console.log("[UnifiedSurface] Unified module surface registered.");

  return {
    modules,
    getModule(name) {
      return modules[name];
    },
    listModules() {
      return Object.keys(modules);
    }
  };
}
