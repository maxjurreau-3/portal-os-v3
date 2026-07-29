import { PortalState } from "./state.js";

// Engines
import { simCore } from "../modules/sim/index.js";
import { operators } from "../modules/operators/index.js";
import { xrEngineInit } from "../modules/xr/index.js";
import { identityPhysics } from "../modules/identity-physics/index.js";
import { gamesEngineInit } from "../modules/games/index.js";

// Unified renderers
import { ModuleRenderers } from "./renderers.jsx";

export function loadPortalModules() {
  console.log("[Loader] Portal‑OS‑v3 dynamic module loader starting...");

  // Boot engines in correct OS order
  simCore();
  operators();
  xrEngineInit();
  identityPhysics();
  gamesEngineInit();

  console.log("[Loader] Engines initialized.");

  // Build dynamic module registry
  const modules = {
    sim: ModuleRenderers.sim,
    operators: ModuleRenderers.operators,
    xr: ModuleRenderers.xr,
    "identity-physics": ModuleRenderers["identity-physics"],
    games: ModuleRenderers.games
  };

  PortalState.modules = modules;

  console.log("[Loader] Module registry built:", Object.keys(modules));

  return {
    modules,
    getModule(name) {
      return modules[name];
    },
    listModules() {
      return Object.keys(modules);
    },
    addModule(name, rendererFn) {
      modules[name] = rendererFn;
      console.log("[Loader] Module added:", name);
    },
    removeModule(name) {
      delete modules[name];
      console.log("[Loader] Module removed:", name);
    }
  };
}
