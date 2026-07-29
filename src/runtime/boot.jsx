import { PortalState } from "./state.js";
import { loadModules } from "./loader.js";

export async function bootPortalOS() {
  console.log("Portal‑OS‑v3 Booting...");

  try {
    const config = await fetch("/portal.config.json").then(r => r.json());
    console.log("Config Loaded:", config);

    PortalState.config = config;

    loadModules(config.modules);

    console.log("Boot Complete");
  } catch (err) {
    console.error("Boot Error:", err);
  }
}
