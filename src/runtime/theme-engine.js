// Portal‑OS‑v3 Theme Engine (System‑Wide)

export const DefaultTheme = {
  mode: "dark",
  accent: "#4f46e5",
  background: "#111",
  surface: "#1a1a1a",
  border: "#333",
  text: "#eee",
  textMuted: "#bbb",
  navBackground: "#1a1a1a",
  navItem: "#222",
  navItemActive: "#444"
};

let currentTheme = { ...DefaultTheme };
let listeners = [];

export const ThemeEngine = {
  getTheme() {
    return currentTheme;
  },

  setTheme(next) {
    currentTheme = { ...currentTheme, ...next };
    for (const fn of listeners) {
      try {
        fn(currentTheme);
      } catch (err) {
        console.warn("[ThemeEngine] Listener error:", err);
      }
    }
  },

  onChange(fn) {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter(l => l !== fn);
    };
  }
};
