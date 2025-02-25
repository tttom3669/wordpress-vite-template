import { defineConfig } from 'vite'
import { liveReload } from 'vite-plugin-live-reload';
import { resolve } from 'path';
import { GeneratePhpEnv } from './js/generate-php-env';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command, mode }) => {
  const cssMinify = mode !== 'development';
  return {
    plugins: [
      liveReload([
        resolve(__dirname, './**/*.php'),
      ]),
      GeneratePhpEnv(),
      tailwindcss(),
    ],
    root: '',
    base: process.env.NODE_ENV === 'development' ? '/' : '/dist/',
    build: {
      outDir: resolve(__dirname, './dist'),
      emptyOutDir: true,
      manifest: true,
      target: 'es2018',
      rollupOptions: {
        input: {
          main: resolve(__dirname, './src/main.js'),
        },
        output: {
          entryFileNames: 'js/[name]-bundle.js',
          chunkFileNames: 'js/[name]-bundle.js',
          assetFileNames: '[ext]/[name]-bundle.[ext]',
        },
      },
      cssMinify: cssMinify,
      write: true,
    },
    server: {
      cors: true,
      strictPort: true, // 若端口被佔用則會直接退出
      port: 3000, // 和 function.php 中設定 的 server 對應
      https: false,
      host: 'localhost',
      hmr: {
        host: 'localhost',
      },
    },
  }
}
)
