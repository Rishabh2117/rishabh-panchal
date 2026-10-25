import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base + hash routing lets the build run from any folder (XAMPP, GitHub Pages, Netlify).
export default defineConfig({
  base: './',
  plugins: [react()],
});
