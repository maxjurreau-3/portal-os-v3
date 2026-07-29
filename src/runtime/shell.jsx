import React, { useState, useEffect } from "react";
import { UnifiedSurface } from "./unified.js";
import { OperatorConsole } from "./operator-console.jsx";
import { DiagnosticsPanel } from "./diagnostics.jsx";
import { Notifications } from "./notifications.jsx";
import { CommandPalette } from "./command-palette.jsx";
import { ThemeEngine, DefaultTheme } from "./theme-engine.js";

export function PortalShell() {
  // Initialize unified runtime surface
  const surface = UnifiedSurface();

  // List all modules
  const moduleNames = surface.listModules();

  // Track active module
  const [activeModule, setActiveModule] = useState(moduleNames[0]);

  // Track theme
  const [theme, setTheme] = useState(ThemeEngine.getTheme());

  // Subscribe to theme changes
  useEffect(() => {
    const unsubscribe = ThemeEngine.onChange(setTheme);
    return () => unsubscribe();
  }, []);

  // Get renderer for active module
  const moduleRenderer = surface.getModule(activeModule);
  const module = moduleRenderer ? moduleRenderer() : null;

  const themedStyles = makeStyles(theme);

  return (
    <div style={themedStyles.shell}>
      {/* ⭐ Global OS Notifications */}
      <Notifications />

      {/* ⭐ Global Command Palette */}
      <CommandPalette
        onCommand={({ type, name }) => {
          if (type === "switch-module") {
            setActiveModule(name);
          }
          if (type === "set-theme-dark") {
            ThemeEngine.setTheme({ mode: "dark", background: "#111" });
          }
          if (type === "set-theme-light") {
            ThemeEngine.setTheme({
              mode: "light",
              background: "#f5f5f5",
              surface: "#ffffff",
              text: "#111",
              textMuted: "#555",
              navBackground: "#e5e5e5",
              navItem: "#ffffff",
              navItemActive: "#d4d4d4"
            });
          }
        }}
      />

      {/* Left navigation rail */}
      <div style={themedStyles.nav}>
        <h3 style={themedStyles.navTitle}>Portal‑OS‑v3</h3>

        <ul style={themedStyles.navList}>
          {moduleNames.map(name => (
            <li
              key={name}
              style={{
                ...themedStyles.navItem,
                ...(activeModule === name ? themedStyles.navItemActive : {})
              }}
              onClick={() => setActiveModule(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main module surface */}
      <div style={themedStyles.surface}>
        <h2 style={themedStyles.surfaceTitle}>{module?.title}</h2>
        <p style={themedStyles.surfaceDesc}>{module?.description}</p>
        <div style={themedStyles.surfaceContent}>{module?.content}</div>

        {/* ⭐ Operator Console rendered below module content */}
        <OperatorConsole />

        {/* ⭐ Diagnostics Panel rendered below operator console */}
        <DiagnosticsPanel />
      </div>
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
      position: "relative"
    },
    nav: {
      width: "220px",
      background: theme.navBackground,
      padding: "20px",
      borderRight: `1px solid ${theme.border}`
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
