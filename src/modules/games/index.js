import { createGamesEngine } from "../../engines/gamesEngine.js";

let gamesEngine = null;

export function games() {
  gamesEngine = createGamesEngine();
  console.log("[Games] Engine module loaded.");
}

export function getGamesEngine() {
  return gamesEngine;
}

// interaction layer

export function gameStart(name, config) {
  if (!gamesEngine) return null;
  return gamesEngine.startSession(name, config);
}

export function gameList() {
  if (!gamesEngine) return [];
  return gamesEngine.listSessions();
}

export function gameGetActive() {
  if (!gamesEngine) return null;
  return gamesEngine.getActiveSession();
}

export function gameActivate(name) {
  if (!gamesEngine) return null;
  return gamesEngine.activateSession(name);
}
