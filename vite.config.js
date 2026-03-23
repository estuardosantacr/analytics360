import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        servicios: resolve(__dirname, 'servicios.html'),
        automatizaciones: resolve(__dirname, 'automatizaciones.html'),
        nosotros: resolve(__dirname, 'nosotros.html'),
        portafolio: resolve(__dirname, 'portafolio.html'),
        contacto: resolve(__dirname, 'contacto.html')
      }
    }
  }
});
