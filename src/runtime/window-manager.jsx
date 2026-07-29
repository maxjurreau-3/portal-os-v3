import React, { useState } from "react";

export function WindowManager({ children }) {
  const [windows, setWindows] = useState([]);

  const openWindow = (title, content) => {
    const id = Date.now();
    setWindows(prev => [
      ...prev,
      {
        id,
        title,
        content,
        x: 120,
        y: 120,
        w: 420,
        h: 300,
        z: prev.length + 1
      }
    ]);
  };

  const closeWindow = (id) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const bringToFront = (id) => {
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.z));
      return prev.map(w =>
        w.id === id ? { ...w, z: maxZ + 1 } : w
      );
    });
  };

  const startDrag = (id, e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;

    const win = windows.find(w => w.id === id);
    if (!win) return;

    const origX = win.x;
    const origY = win.y;

    const move = (ev) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;

      setWindows(prev =>
        prev.map(w =>
          w.id === id ? { ...w, x: origX + dx, y: origY + dy } : w
        )
      );
    };

    const stop = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
  };

  return (
    <>
      {children({ openWindow })}

      {windows.map(win => (
        <div
          key={win.id}
          style={{
            position: "absolute",
            top: win.y,
            left: win.x,
            width: win.w,
            height: win.h,
            background: "#1a1a1a",
            border: "1px solid #333",
            borderRadius: "6px",
            zIndex: win.z,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
          }}
          onMouseDown={() => bringToFront(win.id)}
        >
          <div
            style={{
              padding: "10px",
              background: "#222",
              borderBottom: "1px solid #333",
              cursor: "grab",
              color: "#eee",
              display: "flex",
              justifyContent: "space-between"
            }}
            onMouseDown={(e) => startDrag(win.id, e)}
          >
            <span>{win.title}</span>
            <button
              style={{
                background: "transparent",
                border: "none",
                color: "#eee",
                cursor: "pointer"
              }}
              onClick={() => closeWindow(win.id)}
            >
              ✕
            </button>
          </div>

          <div style={{ flex: 1, overflow: "auto", padding: "10px", color: "#eee" }}>
            {win.content}
          </div>
        </div>
      ))}
    </>
  );
}
