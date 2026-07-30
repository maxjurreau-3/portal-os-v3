import { EventBus } from "../../runtime/event-bus.js";
import { opRun } from "../operators/index.js";

let simSpaces = [];
let activeSpace = null;

export function simCore() {
  console.log("[SIM] Engine initialized");

  // Create default space on boot
  if (simSpaces.length === 0) {
    createSimSpace("default", { mode: "core" });
  }
}

export function createSimSpace(name, config = {}) {
  const space = { name, config };
  simSpaces.push(space);
  activeSpace = space;

  EventBus.emit("sim:spaceCreated", space);

  console.log("[SIM] Space created:", name);
  return space;
}

export function removeSimSpace(name) {
  simSpaces = simSpaces.filter(s => s.name !== name);

  EventBus.emit("sim:spaceRemoved", { name });

  console.log("[SIM] Space removed:", name);
}

export function listSpaces() {
  return simSpaces.map(s => s.name);
}

export function getActiveSpace() {
  return activeSpace ? activeSpace.name : null;
}

export function activateSpace(name) {
  const space = simSpaces.find(s => s.name === name);
  if (!space) {
    console.warn("[SIM] No such space:", name);
    return null;
  }

  activeSpace = space;

  EventBus.emit("sim:spaceActivated", { name });

  console.log("[SIM] Switched to space:", name);
  return space;
}

export function runOperatorInActive(opName) {
  if (!activeSpace) {
    console.warn("[SIM] No active space to run operator in.");
    return null;
  }

  const result = opRun(opName);

  EventBus.emit("sim:operatorRun", {
    operator: opName,
    space: activeSpace.name,
    result
  });

  console.log("[SIM] Operator executed in space:", activeSpace.name, "→", result);
  return result;
}

export function getSimEngine() {
  return {
    listSpaces,
    getActiveSpace,
    createSimSpace,
    removeSimSpace,
    activateSpace,
    runOperator: runOperatorInActive
  };
}
