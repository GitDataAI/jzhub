import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      tsconfigPaths()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
    server: {
      proxy: {
        "/api": {
          target: "https://v1.jiaozifs.com",
          changeOrigin: true,
        },
      },
    },
})
