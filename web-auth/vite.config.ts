import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api/v1":{
        target:"https://gitdata.jzhub.io",
        changeOrigin:true,
      }
    }
  }
})
