export function createIdentityPhysicsEngine() {
  const state = { identities: [], activeIdentity: null };

  return {
    defineIdentity(name, traits = {}) {
      const identity = { name, traits, createdAt: Date.now() };
      state.identities.push(identity);
      state.activeIdentity = identity;
      console.log("[IdentityPhysicsEngine] Identity defined:", name);
      return identity;
    },
    listIdentities() {
      return state.identities;
    },
    getActiveIdentity() {
      return state.activeIdentity;
    }
  };
}
