import React, { useEffect, useState } from "react";
import { EventBus } from "./event-bus.js";

export function Notifications() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const push = (msg) => {
      setQueue(prev => [...prev, { id: Date.now(), msg }]);

      // Auto-remove after 4 seconds
      setTimeout(() => {
        setQueue(prev => prev.filter(n => n.id !== msg.id));
      }, 4000);
    };

    // SIM
    EventBus.on("sim:spaceCreated", (space) =>
      push({ id: Date.now(), text: `SIM space created: ${space.name}` })
    );

    EventBus.on("sim:spaceRemoved", (space) =>
      push({ id: Date.now(), text: `SIM space removed: ${space.name}` })
    );

    // Operators
    EventBus.on("operator:run", (op) =>
      push({ id: Date.now(), text: `Operator executed: ${op.name}` })
    );

    // XR
    EventBus.on("xr:frame", () =>
      push({ id: Date.now(), text: `XR frame rendered` })
    );

    // Identity Physics
    EventBus.on("identity:update", (field) =>
      push({ id: Date.now(), text: `Identity field updated: ${field.name}` })
    );

    // Games
    EventBus.on("games:sessionStart", (session) =>
      push({ id: Date.now(), text: `Game session started: ${session.name}` })
    );

    EventBus.on("games:sessionEnd", (session) =>
      push({ id: Date.now(), text: `Game session ended: ${session.name}` })
    );
  }, []);

  return (
    <div style={styles.container}>
      {queue.map(n => (
        <div key={n.id} style={styles.toast}>
          {n.msg.text}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  toast: {
    background: "#222",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: "6px",
    border: "1px solid #444",
    boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
    fontSize: "14px",
    opacity: 0.95
  }
};
