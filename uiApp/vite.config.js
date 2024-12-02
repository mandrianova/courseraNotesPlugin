import {defineConfig} from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.js',
      fileName: "content",
      name: "content"
    }
  }
})