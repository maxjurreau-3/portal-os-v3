export function createSimEngine() {
  const state = { spaces: [], activeSpace: null };

  // Cloudflare KV persistence hook
  async function persistSpace(space) {
    try {
      // Only runs in environments where fetch exists (browser + Cloudflare)
      if (typeof fetch !== "undefined") {
        await fetch("/sim", {
          method: "POST",
          body: JSON.stringify(space)
        });
      }
    } catch (err) {
      console.warn("[SIMEngine] KV persistence failed:", err);
    }
  }

  function createSpace(name, config = {}) {
    const space = { name, config, createdAt: Date.now() };
    state.spaces.push(space);
    state.activeSpace = space;

    // Persist to Cloudflare KV
    persistSpace(space);

    console.log("[SIMEngine] Space created:", name);
    return space;
  }

  function listSpaces() {
    return state.spaces;
  }

  function getActiveSpace() {
    return state.activeSpace;
  }

  function switchSpace(name) {
    const space = state.spaces.find(s => s.name === name);
    if (!space) {
      console.warn("[SIMEngine] No such space:", name);
      return null;
    }
    state.activeSpace = space;
    console.log("[SIMEngine] Switched to space:", name);
    return space;
  }

  function runInSpace(name, fn) {
    const space = state.spaces.find(s => s.name === name);
    if (!space) {
      console.warn("[SIMEngine] Cannot run in unknown space:", name);
      return null;
    }
    const result = fn(space);
    console.log("[SIMEngine] Operator executed in space:", name, "→", result);
    return result;
  }

  // Default space created at boot
  createSpace("default", { mode: "core" });

  return {
    createSpace,
    listSpaces,
    getActiveSpace,
    switchSpace,
    runInSpace
  };
}
