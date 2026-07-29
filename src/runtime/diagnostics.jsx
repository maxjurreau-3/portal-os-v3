import React, { useEffect, useState } from "react";
import { PortalState } from "./state.js";
import { getSimEngine } from "../modules/sim/index.js";
import { getOperatorsEngine } from "../modules/operators/index.js";
import { getXREngine } from "../modules/xr/index.js";
import { getIdentityPhysicsEngine } from "../modules/identity-physics/index.js";
import { getGamesEngine } from "../modules/games/index.js";

export function DiagnosticsPanel() {
  const [metrics, setMetrics] = useState({
    heartbeat: 0,
    simSpaces: 0,
    operatorsRun: 0,
    xrFrames: 0,
    identityFields: 0,
    gameSessions: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const sim = getSimEngine();
      const ops = getOperatorsEngine();
      const xr = getXREngine();
      const id = getIdentityPhysicsEngine();
      const games = getGamesEngine();

      setMetrics({
        heartbeat: Date.now(),
        simSpaces: sim ? sim.listSpaces().length : 0,
        operatorsRun: ops ? ops.getLogs().length : 0,
        xrFrames: xr ? xr.getFrameCount() : 0,
        identityFields: id ? id.getFieldCount() : 0,
        gameSessions: games ? games.listSessions().length : 0
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>System Diagnostics</h3>

      <div style={styles.grid}>
        <Metric label="Heartbeat" value={metrics.heartbeat} />
        <Metric label="SIM Spaces" value={metrics.simSpaces} />
        <Metric label="Operators Run" value={metrics.operatorsRun} />
        <Metric label="XR Frames" value={metrics.xrFrames} />
        <Metric label="Identity Fields" value={metrics.identityFields} />
        <Metric label="Game Sessions" value={metrics.gameSessions} />
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div style={styles.metric}>
      <div style={styles.metricLabel}>{label}</div>
      <div style={styles.metricValue}>{value}</div>
    </div>
  );
}

const styles = {
  panel: {
    background: "#000",
    color: "#fff",
    padding: "20px",
    borderTop: "2px solid #333",
    marginTop: "20px",
    borderRadius: "6px"
  },
  title: {
    margin: "0 0 15px 0",
    fontSize: "20px",
    fontWeight: "bold"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px"
  },
  metric: {
    background: "#111",
    padding: "15px",
    borderRadius: "6px",
    border: "1px solid #333"
  },
  metricLabel: {
    fontSize: "14px",
    color: "#bbb"
  },
  metricValue: {
    fontSize: "18px",
    marginTop: "5px",
    color: "#fff"
  }
};
