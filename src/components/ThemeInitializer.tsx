"use client";

import { useEffect } from "react";

export function ThemeInitializer() {
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  return null;
}
