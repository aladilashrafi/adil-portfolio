"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Placeholder to avoid layout shift
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-[rgba(1,156,255,0.08)] text-muted hover:text-blue transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 focus:ring-offset-dark"
      aria-label="Toggle theme"
    >
      <Sun className={`w-5 h-5 transition-transform duration-300 ${isDark ? "scale-0 rotate-90" : "scale-100 rotate-0"}`} />
      <Moon className={`absolute w-5 h-5 transition-transform duration-300 ${isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90"}`} />
    </button>
  );
}
