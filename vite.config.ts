import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path';

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src'),
      'libs': resolve('src/libs'),
      'models': resolve('src/models'),
      'pages': resolve('src/pages'),
      'utils': resolve('src/utils'),
      'services': resolve('src/services'),
      'stores': resolve('src/stores'),
      'components': resolve('src/components'),
      'layout': resolve('src/layout'),
      'hooks': resolve('src/hooks')
    },
  },
  plugins: [
    reactRefresh()
  ],
  server: {
    host: '0.0.0.0',
    open: true,
    cors: true,
    port: 3000,
    proxy: {
      '/admin-backend': {
          target: 'http://10.16.153.37:32008',
          changeOrigin: true
      }
    }
  }
})
