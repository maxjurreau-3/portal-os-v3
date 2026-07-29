import { EventBus } from "../../runtime/event-bus.js";

let fields = [];

export function identityPhysics() {
  console.log("[IdentityPhysics] Engine initialized");
}

export function updateField(name, value) {
  const field = { name, value };
  fields.push(field);

  EventBus.emit("identity:update", field);

  return field;
}

export function getFieldState() {
  return fields;
}

export function getFieldCount() {
  return fields.length;
}

export function getIdentityPhysicsEngine() {
  return {
    updateField,
    getFieldState,
    getFieldCount
  };
}
