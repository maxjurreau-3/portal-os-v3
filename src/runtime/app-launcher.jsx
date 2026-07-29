import React from "react";

export function AppLauncher({ modules, onOpenModule, onClose }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.grid}>
        {modules.map((m) => (
          <div
            key={m}
            style={styles.icon}
            onClick={() => {
              onOpenModule(m);
              onClose();
            }}
          >
            <div style={styles.iconLetter}>{m[0].toUpperCase()}</div>
            <div style={styles.iconLabel}>{m}</div>
          </div>
        ))}
      </div>

      <button style={styles.closeButton} onClick={onClose}>
        Close
      </button>
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
    background: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(8px)",
    zIndex: 9998,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "80px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 120px)",
    gap: "40px",
    justifyContent: "center"
  },
  icon: {
    width: "120px",
    height: "120px",
    background: "#1a1a1a",
    borderRadius: "20px",
    border: "1px solid #333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#eee",
    transition: "transform 0.15s"
  },
  iconLetter: {
    fontSize: "40px",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  iconLabel: {
    fontSize: "14px",
    color: "#bbb"
  },
  closeButton: {
    marginTop: "40px",
    padding: "12px 20px",
    background: "#444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px"
  }
};
