import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // ✅ Redirect all unknown routes to index.html (fixes 404 on refresh)
    historyApiFallback: true,
  }
})
