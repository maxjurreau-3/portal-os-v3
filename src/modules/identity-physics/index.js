import { createIdentityPhysicsEngine } from "../../engines/identityPhysicsEngine.js";

let identityEngine = null;

export function identityPhysics() {
  identityEngine = createIdentityPhysicsEngine();
  console.log("[Identity Physics] Module loaded.");
}

export function getIdentityPhysicsEngine() {
  return identityEngine;
}
