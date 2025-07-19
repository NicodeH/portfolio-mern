import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Importing Tailwind CSS plugin
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()], // Adding Tailwind CSS plugin to the Vite configuration
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Setting up an alias for the src directory
    }
  }
})
