import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Esta sección le dice a Vite que cualquier llamada que empiece con /api/
    // debe ser redirigida a tu servidor Express en el puerto 5000.
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // (Reescribimos la ruta para que Express la reciba correctamente)
        // rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
});