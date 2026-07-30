import { EventBus } from "../../runtime/event-bus.js";

let identities = [];
let activeIdentity = null;

export function idDefine(name, config = {}) {
  const id = { name, config };
  identities.push(id);

  EventBus.emit("id:defined", id);
  console.log("[ID] Defined identity:", name);

  if (!activeIdentity) {
    activeIdentity = id;
  }

  return id;
}

export function idList() {
  return identities.map(i => i.name);
}

export function idGetActive() {
  return activeIdentity ? activeIdentity.name : null;
}

export function idActivate(name) {
  const id = identities.find(i => i.name === name);
  if (!id) {
    console.warn("[ID] No such identity:", name);
    return null;
  }

  activeIdentity = id;

  EventBus.emit("id:activated", { name });
  console.log("[ID] Activated identity:", name);

  return id;
}

export function getIdentityPhysicsEngine() {
  return {
    idDefine,
    idList,
    idGetActive,
    idActivate
  };
}
