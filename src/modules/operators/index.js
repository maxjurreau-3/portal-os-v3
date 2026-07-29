import { createOperatorsEngine } from "../../engines/operatorsEngine.js";

let operatorsEngine = null;

export function operators() {
  operatorsEngine = createOperatorsEngine();
  console.log("[Operators] Module loaded.");
}

export function getOperatorsEngine() {
  return operatorsEngine;
}
