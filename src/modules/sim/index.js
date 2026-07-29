import { createSimEngine } from "../../engines/simEngine.js";

let simEngine = null;

export function simCore() {
  simEngine = createSimEngine();
  console.log("[SIM] Core module loaded.");
}

export function getSimEngine() {
  return simEngine;
}

// SIM interaction layer

export function simCreateSpace(name, config) {
  if (!simEngine) {
    console.warn("[SIM] Engine not initialized.");
    return null;
  }
  return simEngine.createSpace(name, config);
}

export function simListSpaces() {
  if (!simEngine) return [];
  return simEngine.listSpaces();
}

export function simGetActiveSpace() {
  if (!simEngine) return null;
  return simEngine.getActiveSpace();
}

export function simSwitchSpace(name) {
  if (!simEngine) return null;
  return simEngine.switchSpace(name);
}

export function simRunInSpace(name, fn) {
  if (!simEngine) return null;
  return simEngine.runInSpace(name, fn);
}

