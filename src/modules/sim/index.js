import { EventBus } from "../../runtime/event-bus.js";

let simSpaces = [];
let activeSpace = null;

export function simCore() {
  console.log("[SIM] Engine initialized");
}

export function createSimSpace(name, config = {}) {
  const space = { name, config };
  simSpaces.push(space);
  activeSpace = space;

  EventBus.emit("sim:spaceCreated", space);

  return space;
}

export function removeSimSpace(name) {
  simSpaces = simSpaces.filter(s => s.name !== name);

  EventBus.emit("sim:spaceRemoved", { name });
}

export function listSpaces() {
  return simSpaces;
}

export function getActiveSpace() {
  return activeSpace;
}

export function getSimEngine() {
  return {
    listSpaces,
    getActiveSpace,
    createSimSpace,
    removeSimSpace
  };
}
