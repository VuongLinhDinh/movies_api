import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  server: {
    port: process.env.POST || 3000
  },
  plugins: [
    VitePluginNode({
      adapter: "express",
      appPath: "./src/server.js",
      exportName: "viteNodeApp",
      initAppOnBoot: false,
      tsCompiler: "esbuild",
      swcOptions: {}
    })
  ],
  optimizeDeps: {}
});
