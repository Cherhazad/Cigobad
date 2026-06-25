// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'
import {fileURLToPath} from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    components: {
        global: true,
        dirs: ['~/components']
    },
    css: ['~/assets/css/main.css'],

    ssr: false,

    runtimeConfig: {
        public: {
            apiBase: 'http://localhost:3008'
        }
    },

    postcss: {
        plugins: {
            '@tailwindcss/postcss': {},
        },
    },

    vite: {
        resolve: {
            alias: {
                'shared': path.resolve(__dirname, '../shared/dist/index.mjs')
            }
        },
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
                '@vueuse/core'
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
