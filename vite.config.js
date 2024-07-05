import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      // Ejemplo de alias para la carpeta de imágenes
      'img/': '/src/img/',
    },
  },
  plugins: [vue()]
});
