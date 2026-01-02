"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="relative"
    >
      {resolvedTheme === "light" ? (
        <Moon className="h-4 w-4" /> // amber icon in light mode
      ) : (
        <Sun className="h-4 w-4" /> // light icon in dark mode
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
