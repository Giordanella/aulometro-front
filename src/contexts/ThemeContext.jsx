import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./useTheme";

// Keys and defaults
const STORAGE_KEY = "theme"; // 'light' | 'dark'
const prefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved === "light" || saved === "dark") {return saved;}
    return prefersDark() ? "dark" : "light";
  });

  const isDark = theme === "dark";

  // Persist and apply class to <html> for easy CSS scoping
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      console.error("Failed to save theme preference", e);
    }
    const el = document.documentElement; // <html>
    el.classList.toggle("theme-dark", isDark);
    el.classList.toggle("theme-light", !isDark);
  }, [theme, isDark]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const value = useMemo(() => ({ theme, isDark, toggleTheme, setTheme }), [theme, isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
// This file intentionally only exports the component to satisfy fast-refresh rule
