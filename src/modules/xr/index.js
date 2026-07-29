import { createXREngine } from "../../engines/xrEngine.js";

let xrEngine = null;

export function xrEngineInit() {
  xrEngine = createXREngine();
  console.log("[XR] Engine module loaded.");
}

export function getXREngine() {
  return xrEngine;
}
