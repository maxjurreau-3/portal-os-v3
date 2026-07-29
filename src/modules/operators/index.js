import { createOperatorsEngine } from "../../engines/operatorsEngine.js";

let operatorsEngine = null;

export function operators() {
  operatorsEngine = createOperatorsEngine();
  console.log("[Operators] Module loaded.");
}

export function getOperatorsEngine() {
  return operatorsEngine;
}

// interaction layer

export function opRegister(name, fn) {
  if (!operatorsEngine) return null;
  return operatorsEngine.registerOperator(name, fn);
}

export function opRun(name, ...args) {
  if (!operatorsEngine) return null;
  return operatorsEngine.runOperator(name, ...args);
}

export function opList() {
  if (!operatorsEngine) return [];
  return operatorsEngine.listOperators();
}

export function opLogs() {
  if (!operatorsEngine) return [];
  return operatorsEngine.getLogs();
}
