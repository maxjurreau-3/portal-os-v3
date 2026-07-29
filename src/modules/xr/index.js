import { EventBus } from "../../runtime/event-bus.js";

let frameCount = 0;
let xrState = {};

export function xrEngineInit() {
  console.log("[XR] Engine initialized");
}

export function xrFrame(data = {}) {
  frameCount++;
  xrState = data;

  EventBus.emit("xr:frame", { frameCount, data });
}

export function getFrameCount() {
  return frameCount;
}

export function getState() {
  return xrState;
}

export function getXREngine() {
  return {
    xrFrame,
    getFrameCount,
    getState
  };
}
