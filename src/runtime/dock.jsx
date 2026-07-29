import React from "react";

export function Dock({ windows, modules, activeModule, onModuleSelect, onWindowFocus }) {
  return (
    <div style={styles.dock}>
      {/* Module icons */}
      <div style={styles.section}>
        {modules.map((m) => (
          <div
            key={m}
            style={{
              ...styles.icon,
              ...(activeModule === m ? styles.iconActive : {})
            }}
            onClick={() => onModuleSelect(m)}
          >
            {m[0].toUpperCase()}
          </div>
        ))}
      </div>

      {/* Running windows */}
      <div style={styles.section}>
        {windows.map((w) => (
          <div
            key={w.id}
            style={styles.windowIcon}
            onClick={() => onWindowFocus(w.id)}
          >
            {w.title[0].toUpperCase()}
            <div style={styles.runningDot} />
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  dock: {
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "60px",
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    zIndex: 9999
  },
  section: {
    display: "flex",
    gap: "20px"
  },
  icon: {
    width: "40px",
    height: "40px",
    background: "#222",
    borderRadius: "10px",
    color: "#eee",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "18px",
    border: "1px solid #444"
  },
  iconActive: {
    background: "#444",
    border: "1px solid #666"
  },
  windowIcon: {
    width: "40px",
    height: "40px",
    background: "#333",
    borderRadius: "10px",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    position: "relative",
    border: "1px solid #555"
  },
  runningDot: {
    position: "absolute",
    bottom: "4px",
    width: "6px",
    height: "6px",
    background: "#4f46e5",
    borderRadius: "50%"
  }
};
