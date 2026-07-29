export function createIdentityPhysicsEngine() {
  const state = {
    identities: [],
    activeIdentity: null
  };

  function defineIdentity(name, traits = {}) {
    const identity = {
      name,
      traits,
      createdAt: Date.now()
    };
    state.identities.push(identity);
    state.activeIdentity = identity;
    console.log("[IdentityPhysics] Identity defined:", name);
    return identity;
  }

  function listIdentities() {
    return state.identities;
  }

  function getActiveIdentity() {
    return state.activeIdentity;
  }

  function activateIdentity(name) {
    const identity = state.identities.find(i => i.name === name);
    if (!identity) {
      console.warn("[IdentityPhysics] No such identity:", name);
      return null;
    }
    state.activeIdentity = identity;
    console.log("[IdentityPhysics] Activated identity:", name);
    return identity;
  }

  // default identity
  defineIdentity("default-identity", { mode: "identity-core" });

  return {
    defineIdentity,
    listIdentities,
    getActiveIdentity,
    activateIdentity
  };
}
