import React, { useEffect, useState } from "react";
import { EventBus } from "./event-bus.js";

export function DiagnosticsPanel() {
  const [metrics, setMetrics] = useState({
    heartbeat: Date.now(),
    simSpaces: 0,
    operatorsRun: 0,
    xrFrames: 0,
    identityFields: 0,
    gameSessions: 0
  });

  useEffect(() => {
    // Update heartbeat every 500ms
    const heartbeatInterval = setInterval(() => {
      setMetrics(prev => ({ ...prev, heartbeat: Date.now() }));
    }, 500);

    // SIM events
    EventBus.on("sim:spaceCreated", () => {
      setMetrics(prev => ({
        ...prev,
        simSpaces: prev.simSpaces + 1
      }));
    });

    EventBus.on("sim:spaceRemoved", () => {
      setMetrics(prev => ({
        ...prev,
        simSpaces: Math.max(prev.simSpaces - 1, 0)
      }));
    });

    // Operator events
    EventBus.on("operator:run", () => {
      setMetrics(prev => ({
        ...prev,
        operatorsRun: prev.operatorsRun + 1
      }));
    });

    // XR events
    EventBus.on("xr:frame", () => {
      setMetrics(prev => ({
        ...prev,
        xrFrames: prev.xrFrames + 1
      }));
    });

    // Identity Physics events
    EventBus.on("identity:update", () => {
      setMetrics(prev => ({
        ...prev,
        identityFields: prev.identityFields + 1
      }));
    });

    // Games events
    EventBus.on("games:sessionStart", () => {
      setMetrics(prev => ({
        ...prev,
        gameSessions: prev.gameSessions + 1
      }));
    });

    EventBus.on("games:sessionEnd", () => {
      setMetrics(prev => ({
        ...prev,
        gameSessions: Math.max(prev.gameSessions - 1, 0)
      }));
    });

    return () => clearInterval(heartbeatInterval);
  }, []);

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>System Diagnostics (Event‑Driven)</h3>

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
