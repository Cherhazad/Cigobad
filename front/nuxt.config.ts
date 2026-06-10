// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    components: {
        global: true,
        dirs: ['~/components']
    },
    css: ['~/assets/css/main.css'],

    postcss: {
        plugins: {
            '@tailwindcss/postcss': {},
        },
    },

    vite: {
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
            ],
            exclude: ["oh-vue-icons/icons"]
        },
        ssr: {
            noExternal: ["oh-vue-icons"]
        }
    },

    build: {
        transpile: ["oh-vue-icons"]
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
