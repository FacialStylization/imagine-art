// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  modules: ['@nuxtjs/tailwindcss'],
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
    ],
  },
  // 添加静态资源配置
  vite: {
    assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg'],
  },
});
