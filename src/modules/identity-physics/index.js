import { EventBus } from "../../runtime/event-bus.js";

let sessions = [];
let activeSession = null;

export function gamesEngineInit() {
  console.log("[Games] Engine initialized");
}

export function startSession(name) {
  const session = { name, started: Date.now() };
  sessions.push(session);
  activeSession = session;

  EventBus.emit("games:sessionStart", session);

  return session;
}

export function endSession(name) {
  sessions = sessions.filter(s => s.name !== name);

  EventBus.emit("games:sessionEnd", { name });
}

export function listSessions() {
  return sessions;
}

export function getActiveSession() {
  return activeSession;
}

export function getGamesEngine() {
  return {
    startSession,
    endSession,
    listSessions,
    getActiveSession
  };
}
