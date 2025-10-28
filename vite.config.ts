import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // A linha abaixo é a correção. Ela informa ao Vite que este é
  // um Aplicativo de Página Única (SPA), o que resolve o problema
  // de atualização de página em qualquer dispositivo.
  appType: 'spa',

  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
