"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ThemeInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
