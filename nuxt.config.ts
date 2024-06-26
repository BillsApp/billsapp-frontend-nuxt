// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: true,

  typescript: {
    typeCheck: true,
    tsConfig: { compilerOptions: { baseUrl: ".", }, },
  },

  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/sitemap',
    '@nuxt/ui'
  ],

  pinia: {
    storesDirs: ['./stores/**'],
  },

  // buildModules: ['@nuxt/typescript-build'],

  // Global CSS: https://nuxt.com/docs/api/nuxt-config#components
  css: [
    '@/assets/styles/index.scss',
  ],
})
