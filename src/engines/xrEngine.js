export function createXREngine() {
  const state = { scenes: [], activeScene: null };

  function createScene(name, config = {}) {
    const scene = { name, config, createdAt: Date.now() };
    state.scenes.push(scene);
    state.activeScene = scene;
    console.log("[XREngine] Scene created:", name);
    return scene;
  }

  function listScenes() {
    return state.scenes;
  }

  function getActiveScene() {
    return state.activeScene;
  }

  function activateScene(name) {
    const scene = state.scenes.find(s => s.name === name);
    if (!scene) {
      console.warn("[XREngine] No such scene:", name);
      return null;
    }
    state.activeScene = scene;
    console.log("[XREngine] Activated scene:", name);
    return scene;
  }

  // default XR scene
  createScene("default-xr", { mode: "xr-core" });

  return {
    createScene,
    listScenes,
    getActiveScene,
    activateScene
  };
}
