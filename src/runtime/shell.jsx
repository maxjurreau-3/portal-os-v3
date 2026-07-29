import React, { useState, useEffect } from "react";
import { UnifiedSurface } from "./unified.js";
import { OperatorConsole } from "./operator-console.jsx";
import { DiagnosticsPanel } from "./diagnostics.jsx";
import { Notifications } from "./notifications.jsx";
import { CommandPalette } from "./command-palette.jsx";
import { ThemeEngine } from "./theme-engine.js";
import { WindowManager } from "./window-manager.jsx";

export function PortalShell() {
  const surface = UnifiedSurface();
  const moduleNames = surface.listModules();
  const [activeModule, setActiveModule] = useState(moduleNames[0]);

  const [theme, setTheme] = useState(ThemeEngine.getTheme());
  useEffect(() => {
    const unsub = ThemeEngine.onChange(setTheme);
    return () => unsub();
  }, []);

  const moduleRenderer = surface.getModule(activeModule);
  const module = moduleRenderer ? moduleRenderer() : null;

  const styles = makeStyles(theme);

  return (
    <div style={styles.shell}>
      <Notifications />

      <WindowManager>
        {({ openWindow }) => (
          <>
            <CommandPalette
              onCommand={({ type, name }) => {
                if (type === "switch-module") {
                  setActiveModule(name);
                }
                if (type === "open-window") {
                  openWindow("New Window", <div>Hello from Portal‑OS‑v3</div>);
                }
              }}
            />

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

              <button
                style={styles.windowButton}
                onClick={() =>
                  openWindow("Diagnostics", <DiagnosticsPanel />)
                }
              >
                Open Diagnostics Window
              </button>

              <button
                style={styles.windowButton}
                onClick={() =>
                  openWindow("Operator Console", <OperatorConsole />)
                }
              >
                Open Operator Console Window
              </button>
            </div>

            <div style={styles.surface}>
              <h2 style={styles.surfaceTitle}>{module?.title}</h2>
              <p style={styles.surfaceDesc}>{module?.description}</p>
              <div style={styles.surfaceContent}>{module?.content}</div>

              <OperatorConsole />
              <DiagnosticsPanel />
            </div>
          </>
        )}
      </WindowManager>
    </div>
  );
}

function makeStyles(theme) {
  return {
    shell: {
      display: "flex",
      height: "100vh",
      width: "100vw",
      background: theme.background,
      color: theme.text,
      fontFamily: "Arial, sans-serif",
      position: "relative",
      overflow: "hidden"
    },
    nav: {
      width: "220px",
      background: theme.navBackground,
      padding: "20px",
      borderRight: `1px solid ${theme.border}`,
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    },
    navTitle: {
      margin: "0 0 20px 0",
      fontSize: "20px",
      color: theme.text
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
      background: theme.navItem,
      borderRadius: "6px",
      color: theme.textMuted
    },
    navItemActive: {
      background: theme.navItemActive,
      color: theme.text,
      fontWeight: "bold"
    },
    windowButton: {
      padding: "10px",
      background: theme.accent,
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      marginTop: "10px"
    },
    surface: {
      flex: 1,
      padding: "30px",
      overflowY: "auto"
    },
    surfaceTitle: {
      margin: "0 0 10px 0",
      fontSize: "26px",
      color: theme.text
    },
    surfaceDesc: {
      margin: "0 0 20px 0",
      fontSize: "16px",
      color: theme.textMuted
    },
    surfaceContent: {
      background: theme.surface,
      padding: "20px",
      borderRadius: "8px",
      border: `1px solid ${theme.border}`,
      marginBottom: "20px"
    }
  };
}
