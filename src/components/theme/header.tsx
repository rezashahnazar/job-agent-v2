"use client";

import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between space-x-2 space-x-reverse md:justify-end">
          <nav className="flex items-center space-x-6 space-x-reverse"></nav>
          <div className="flex items-center space-x-2 space-x-reverse">
            <nav className="flex items-center space-x-2 space-x-reverse">
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
