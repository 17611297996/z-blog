import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { themePreprocessorPlugin } from '@zougt/vite-plugin-theme-preprocessor';
import path from 'path';

const devServer = {
  target: 'http://localhost:7001', // 修正后的 target 值
  changeOrigin: true,
  configure: (proxy, options) => {
    proxy.on('proxyReq', (proxyReq, req, res) => {
      console.log(
        '真实的请求地址:',
        `${req.method}`,
        `${options.target}${req.url}`,
      );
    });
  },
};

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    themePreprocessorPlugin({
      less: {
        multipleScopeVars: [
          {
            scopeName: 'theme-default',
            path: path.resolve('src/styles/theme-light.less'),
          },
          {
            scopeName: 'theme-dark',
            path: path.resolve('src/styles/theme-dark.less'),
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@styles': path.resolve('src/styles'),
      '@assets': path.resolve('src/assets'),
      '@store': path.resolve('src/stores'),
      '@utils': path.resolve('src/utils'),
      '@components': path.resolve('src/components'),
      '@api': path.resolve("src/api")
    },
  },
  server: {
    cors: true,
    open: true,
    proxy: {
      '/api': {
        ...devServer,
        target: 'http://localhost:7001', // 确保 target 是正确的 URL
      },
    },
  },
});