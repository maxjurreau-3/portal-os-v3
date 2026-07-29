import { createGamesEngine } from "../../engines/gamesEngine.js";

let gamesEngine = null;

export function gamesEngineInit() {
  gamesEngine = createGamesEngine();
  console.log("[Games] Engine module loaded.");
}

export function getGamesEngine() {
  return gamesEngine;
}
