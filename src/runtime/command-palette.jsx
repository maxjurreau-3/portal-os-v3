import React, { useState, useEffect } from "react";
import { EventBus } from "./event-bus.js";
import { UnifiedSurface } from "./unified.js";
import { getOperatorsEngine } from "../modules/operators/index.js";
import { getSimEngine } from "../modules/sim/index.js";
import { getXREngine } from "../modules/xr/index.js";
import { getIdentityPhysicsEngine } from "../modules/identity-physics/index.js";
import { getGamesEngine } from "../modules/games/index.js";

export function CommandPalette({ onCommand }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const surface = UnifiedSurface();
  const ops = getOperatorsEngine();
  const sim = getSimEngine();
  const xr = getXREngine();
  const id = getIdentityPhysicsEngine();
  const games = getGamesEngine();

  // Global keyboard shortcut: CMD+K or CTRL+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Build command list
  const commands = [
    // Module switching
    ...surface.listModules().map((name) => ({
      label: `Switch to module: ${name}`,
      action: () => onCommand({ type: "switch-module", name })
    })),

    // Operators
    ...ops.listOperators().map((op) => ({
      label: `Run operator: ${op.name}`,
      action: () => ops.runOperator(op.name)
    })),

    // SIM
    {
      label: "Create SIM space",
      action: () => sim.createSimSpace(`space-${Date.now()}`)
    },

    // XR
    {
      label: "Trigger XR frame",
      action: () => xr.xrFrame({ time: Date.now() })
    },

    // Identity Physics
    {
      label: "Update identity field",
      action: () => id.updateField("field-" + Date.now(), Math.random())
    },

    // Games
    {
      label: "Start game session",
      action: () => games.startSession("session-" + Date.now())
    },
    {
      label: "End active game session",
      action: () => {
        const active = games.getActiveSession();
        if (active) games.endSession(active.name);
      }
    }
  ];

  // Filter commands
  useEffect(() => {
    if (!query) {
      setResults(commands);
      return;
    }
    const q = query.toLowerCase();
    setResults(commands.filter((c) => c.label.toLowerCase().includes(q)));
  }, [query]);

  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <input
          autoFocus
          style={styles.input}
          placeholder="Type a command…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div style={styles.results}>
          {results.map((cmd, i) => (
            <div
              key={i}
              style={styles.result}
              onClick={() => {
                cmd.action();
                setOpen(false);
                setQuery("");
              }}
            >
              {cmd.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(4px)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
    width: "500px",
    background: "#1a1a1a",
    borderRadius: "8px",
    border: "1px solid #333",
    padding: "20px"
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #444",
    background: "#111",
    color: "#fff",
    marginBottom: "15px"
  },
  results: {
    maxHeight: "300px",
    overflowY: "auto"
  },
  result: {
    padding: "10px",
    background: "#222",
    borderRadius: "6px",
    marginBottom: "8px",
    cursor: "pointer",
    color: "#eee"
  }
};
