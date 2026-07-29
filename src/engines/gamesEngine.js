export function createGamesEngine() {
  const state = { sessions: [], activeSession: null };

  return {
    startSession(name) {
      const session = { name, startedAt: Date.now() };
      state.sessions.push(session);
      state.activeSession = session;
      console.log("[GamesEngine] Session started:", name);
      return session;
    },
    listSessions() {
      return state.sessions;
    },
    getActiveSession() {
      return state.activeSession;
    }
  };
}
