import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps asset paths relative so the build works when served
// from a Bitbucket Pages (*.bitbucket.io) root or subpath.
export default defineConfig({
  plugins: [react()],
  base: './',
})
