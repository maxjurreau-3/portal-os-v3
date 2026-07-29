export function createGamesEngine() {
  const state = {
    sessions: [],
    activeSession: null
  };

  function startSession(name, config = {}) {
    const session = {
      name,
      config,
      createdAt: Date.now()
    };
    state.sessions.push(session);
    state.activeSession = session;
    console.log("[GamesEngine] Session started:", name);
    return session;
  }

  function listSessions() {
    return state.sessions;
  }

  function getActiveSession() {
    return state.activeSession;
  }

  function activateSession(name) {
    const session = state.sessions.find(s => s.name === name);
    if (!session) {
      console.warn("[GamesEngine] No such session:", name);
      return null;
    }
    state.activeSession = session;
    console.log("[GamesEngine] Activated session:", name);
    return session;
  }

  // default session
  startSession("default-game", { mode: "game-core" });

  return {
    startSession,
    listSessions,
    getActiveSession,
    activateSession
  };
}
