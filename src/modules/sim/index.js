import { createSimEngine } from "../../engines/simEngine.js";
import { opRun } from "../operators/index.js";

let simEngine = null;

export function simCore() {
  // Detect Cloudflare Edge (no navigator)
  const isEdge = typeof navigator === "undefined";

  simEngine = createSimEngine();

  if (isEdge) {
    console.log("[SIM] Edge-safe mode enabled.");
  }

  console.log("[SIM] Core module loaded.");
}

export function getSimEngine() {
  return simEngine;
}

// SIM interaction layer

export function simCreateSpace(name, config) {
  if (!simEngine) return null;
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

// SIM ↔ Operators Bridge

export function simRunOperatorInActive(operatorName, ...args) {
  const active = simGetActiveSpace();
  if (!active) {
    console.warn("[SIM] No active space.");
    return null;
  }

  return opRun(operatorName, active, ...args);
}
