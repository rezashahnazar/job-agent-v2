import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "hsl(var(--background))",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  height: "device-height",
  viewportFit: "cover",
};
