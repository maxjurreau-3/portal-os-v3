export function createSimEngine() {
  const state = { spaces: [], activeSpace: null };

  return {
    createSpace(name, config = {}) {
      const space = { name, config, createdAt: Date.now() };
      state.spaces.push(space);
      state.activeSpace = space;
      console.log("[SIMEngine] Space created:", name);
      return space;
    },
    listSpaces() {
      return state.spaces;
    },
    getActiveSpace() {
      return state.activeSpace;
    }
  };
}
