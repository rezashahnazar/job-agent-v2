"use client";

import React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Theme = "dark" | "light" | "system";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme() as {
    theme: Theme;
    setTheme: (theme: Theme) => void;
  };

  const handleThemeChange = () => {
    const themeMap: Record<Theme, Theme> = {
      dark: "light",
      light: "system",
      system: "dark",
    };
    setTheme(themeMap[theme] || "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleThemeChange}
      aria-label="Toggle theme"
    >
      <Sun
        className={cn(
          "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all",
          theme === "dark" && "scale-0",
          theme === "system" && "scale-0"
        )}
      />
      <Moon
        className={cn(
          "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all",
          theme === "dark" && "rotate-0 scale-100",
          theme === "system" && "scale-0"
        )}
      />
      <Monitor
        className={cn(
          "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all",
          theme === "system" && "rotate-0 scale-100"
        )}
      />
    </Button>
  );
}
