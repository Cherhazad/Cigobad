// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/image',
    '@bubblesortt/nuxt-es-toolkit',
    '@nuxtjs/device',
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt'
  ]
})
