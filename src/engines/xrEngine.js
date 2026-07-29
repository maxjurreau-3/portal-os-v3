export function createXREngine() {
  const state = { scenes: [], activeScene: null };

  return {
    createScene(name, config = {}) {
      const scene = { name, config, createdAt: Date.now() };
      state.scenes.push(scene);
      state.activeScene = scene;
      console.log("[XREngine] Scene created:", name);
      return scene;
    },
    listScenes() {
      return state.scenes;
    },
    getActiveScene() {
      return state.activeScene;
    }
  };
}
