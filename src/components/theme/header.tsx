"use client";

import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-end">
        <nav className="flex items-center space-x-2 space-x-reverse">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
