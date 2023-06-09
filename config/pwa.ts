import type { ModuleOptions } from "@vite-pwa/nuxt";

export const pwa: Partial<ModuleOptions> = {
  registerType: "autoUpdate",
  manifest: {
    name: "ESP admin",
    short_name: "ESPAdmin",
    theme_color: "#18181B",
    icons: [
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
  workbox: {
    navigateFallback: "/",
    globPatterns: ["**/*.{html,png,svg,ico}"],
  },
  client: {
    installPrompt: true,
  },
  devOptions: {
    enabled: process.dev,
    suppressWarnings: true,
    navigateFallbackAllowlist: [/^\/$/],
    type: "module",
  },
};
