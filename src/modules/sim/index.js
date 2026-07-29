import { createSimEngine } from "../../engines/simEngine.js";

let simEngine = null;

export function simCore() {
  simEngine = createSimEngine();
  console.log("[SIM] Core module loaded.");
}

export function getSimEngine() {
  return simEngine;
}
