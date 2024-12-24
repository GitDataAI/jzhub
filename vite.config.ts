import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import tsconfigPaths from "vite-tsconfig-paths";
import * as crypto from 'crypto';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      tsconfigPaths()
  ],
  build:{
    rollupOptions:{
      external: ['compression'],
      output:{
        manualChunks(id) {
          return Split(id);
        },
      }
    },
    minify: "esbuild",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
    server: {
      proxy: {
        // "/api": {
        //   target: "http://127.0.0.1",
        //   changeOrigin: true,
        // },
        "/api": {
          target: "https://v1.jiaozifs.com",
          changeOrigin: true,
        },
      },
    },
})

const ABC = {
  "A":['d','f','g'],
  "B":['h','j','k','l','n'],
  "C":['o','p','q','r','u'],
  "D":['v','w','x','y','z','1','2'],
  "E":['3','4','5','6','7','8','9'],
  "F":['0','!','@','m','i','%','^'],
  "G":['&','t','(',')','-','_','+'],
  "H":['=','~','`','s','>','?','/'],
  "I":['|','b','}','[','e','\\','"'],
}
const Split = (id: string, depth = 0) => {
  const ids = id.split("/");
  const first = ids[ids.length - 1][0].toLowerCase();

  if (depth > 5) {
    return "gg";
  }
  switch (true) {
    case first === 'a':
      return Split(generateSHA1(id), depth + 1);
    case first === 'b':
      return Split(generateSHA1(id), depth + 1);
    case first === 'c':
      return Split(generateSHA1(id), depth + 1);
    case ABC['A'].includes(first):
      return "a";
    case ABC['B'].includes(first):
      return "b";
    case ABC['C'].includes(first):
      return "c";
    case ABC['D'].includes(first):
      return "d";
    case ABC['E'].includes(first):
      return "e";
    case ABC['F'].includes(first):
      return "f";
    case ABC['G'].includes(first):
      return "g";
    case ABC['H'].includes(first):
      return "h";
    case ABC['I'].includes(first):
      return "i";
    default:
      return first;
  }
};

function generateSHA1(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}
