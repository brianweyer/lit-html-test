import { defineConfig } from "vite";

export default defineConfig({
  css: {
    preprocessorOptions: {
      stylus: {
        globals: {
          '$highlight-color': 'red'
        }
      }
    }
  }
})