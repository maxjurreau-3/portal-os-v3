import { createIdentityPhysicsEngine } from "../../engines/identityPhysicsEngine.js";

let identityEngine = null;

export function identityPhysics() {
  identityEngine = createIdentityPhysicsEngine();
  console.log("[Identity Physics] Module loaded.");
}

export function getIdentityEngine() {
  return identityEngine;
}

// interaction layer

export function idDefine(name, traits) {
  if (!identityEngine) return null;
  return identityEngine.defineIdentity(name, traits);
}

export function idList() {
  if (!identityEngine) return [];
  return identityEngine.listIdentities();
}

export function idGetActive() {
  if (!identityEngine) return null;
  return identityEngine.getActiveIdentity();
}

export function idActivate(name) {
  if (!identityEngine) return null;
  return identityEngine.activateIdentity(name);
}
