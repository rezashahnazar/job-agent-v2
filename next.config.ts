import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    locales: ["fa-IR", "en-US"],
    defaultLocale: "fa-IR",
    localeDetection: false,
  },
};

export default nextConfig;
