import React, { useState } from "react";
import { UnifiedSurface } from "./unified.js";
import { OperatorConsole } from "./operator-console.jsx";
import { DiagnosticsPanel } from "./diagnostics.jsx";

export function PortalShell() {
  // Initialize unified runtime surface
  const surface = UnifiedSurface();

  // List all modules
  const moduleNames = surface.listModules();

  // Track active module
  const [activeModule, setActiveModule] = useState(moduleNames[0]);

  // Get renderer for active module
  const moduleRenderer = surface.getModule(activeModule);
  const module = moduleRenderer ? moduleRenderer() : null;

  return (
    <div style={styles.shell}>
      {/* Left navigation rail */}
      <div style={styles.nav}>
        <h3 style={styles.navTitle}>Portal‑OS‑v3</h3>

        <ul style={styles.navList}>
          {moduleNames.map(name => (
            <li
              key={name}
              style={{
                ...styles.navItem,
                ...(activeModule === name ? styles.navItemActive : {})
              }}
              onClick={() => setActiveModule(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main module surface */}
      <div style={styles.surface}>
        <h2 style={styles.surfaceTitle}>{module?.title}</h2>
        <p style={styles.surfaceDesc}>{module?.description}</p>
        <div style={styles.surfaceContent}>{module?.content}</div>

        {/* ⭐ Operator Console rendered below module content */}
        <OperatorConsole />

        {/* ⭐ Diagnostics Panel rendered below operator console */}
        <DiagnosticsPanel />
      </div>
    </div>
  );
}

const styles = {
  shell: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    background: "#111",
    color: "#eee",
    fontFamily: "Arial, sans-serif"
  },
  nav: {
    width: "220px",
    background: "#1a1a1a",
    padding: "20px",
    borderRight: "1px solid #333"
  },
  navTitle: {
    margin: "0 0 20px 0",
    fontSize: "20px",
    color: "#fff"
  },
  navList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  navItem: {
    padding: "10px 12px",
    marginBottom: "8px",
    cursor: "pointer",
    background: "#222",
    borderRadius: "6px",
    color: "#ccc"
  },
  navItemActive: {
    background: "#444",
    color: "#fff",
    fontWeight: "bold"
  },
  surface: {
    flex: 1,
    padding: "30px",
    overflowY: "auto"
  },
  surfaceTitle: {
    margin: "0 0 10px 0",
    fontSize: "26px",
    color: "#fff"
  },
  surfaceDesc: {
    margin: "0 0 20px 0",
    fontSize: "16px",
    color: "#bbb"
  },
  surfaceContent: {
    background: "#1a1a1a",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #333",
    marginBottom: "20px"
  }
};
