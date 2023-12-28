import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { nodePolyfills } from "vite-plugin-node-polyfills";
//import removeConsole from "vite-plugin-remove-console";

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "OVER_PING_",
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
    // removeConsole(),
  ],
  resolve: {
    alias: {
      pages: "/src/presentation/pages",
      components: "/src/presentation/components",
      assets: "/src/presentation/assets",
      types: "/src/types",
      context: "/src/presentation/context",
      helpers: "/src/infrastructure/helpers",
      gql: "/src/data/gql",
      state: "/src/state",
      constant: "/src/data/constant",
      domain: "/src/domain",
      presentation: "/src/presentation",
    },
  },
});
