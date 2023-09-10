import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import  envCompatible  from 'vite-plugin-env-compatible';
import  UserOptions  from 'vite-plugin-env-compatible';

// https://vitejs.dev/config/
const env = loadEnv(
  'all', 
  process.cwd(),
  '' 
)
 
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': env
  }
})
