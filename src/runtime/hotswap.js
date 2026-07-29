import { PortalState } from "./state.js";

export function activateModule(name) {
  if (!PortalState.modules[name]) {
    console.warn(`[Portal‑OS‑v3] Cannot activate unknown module: ${name}`);
    return null;
  }

  PortalState.active = name;

  return {
    name,
    route: PortalState.modules[name].route
  };
}
