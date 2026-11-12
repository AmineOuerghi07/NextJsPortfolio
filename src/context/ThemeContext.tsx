"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ThemeContextType = {
  toggleTheme: () => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false); // Default to false for SSR
  const [isMounted, setIsMounted] = useState(false); // Track client-side mount
  const [isReady, setIsReady] = useState(false); // Track post-delay readiness

  useEffect(() => {
    // Only run on client after mount
    setIsMounted(true);
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }

    // Delay rendering children by 0.5 seconds after mount
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    // Apply theme class to document on isDark change
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Show loader until mounted and delay is over
  if (!isMounted || !isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-stone-950">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-stone-300 border-t-amber-800 dark:border-stone-700 dark:border-t-amber-400"></div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};