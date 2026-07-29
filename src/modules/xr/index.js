import { createXREngine } from "../../engines/xrEngine.js";

let xrEngine = null;

export function xrEngineInit() {
  xrEngine = createXREngine();
  console.log("[XR] Engine module loaded.");
}

export function getXREngine() {
  return xrEngine;
}

// XR interaction layer

export function xrCreateScene(name, config) {
  if (!xrEngine) return null;
  return xrEngine.createScene(name, config);
}

export function xrListScenes() {
  if (!xrEngine) return [];
  return xrEngine.listScenes();
}

export function xrGetActiveScene() {
  if (!xrEngine) return null;
  return xrEngine.getActiveScene();
}

export function xrActivateScene(name) {
  if (!xrEngine) return null;
  return xrEngine.activateScene(name);
}
