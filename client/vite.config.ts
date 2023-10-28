import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": {},
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
    },
  },
  esbuild: {
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-macros", "babel-plugin-styled-components"],
      },
    }),
    svgr(),
    nodePolyfills({
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      pages: "/src/pages",
      components: "/src/components",
      assets: "/src/assets",
      types: "/src/types",
      context: "/src/context",
      queries: "/src/queries",
    },
  },
});
