// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path'
import {fileURLToPath} from 'url'
import Aura from '@primeuix/themes/aura';

const __dirname = fileURLToPath(new URL('.', import.meta.url))
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    components: {
        global: true,
        dirs: ['~/components']
    },
    css: [
        '~/assets/css/main.css',
        'primeicons/primeicons.css'
    ],

    ssr: false,

    runtimeConfig: {
        public: {
            apiBase: 'http://localhost:3008',
            PRIMEUI_LICENSE: process.env.NUXT_PUBLIC_PRIMEUI_LICENSE
        }
    },

    colorMode: {
        classSuffix: ''
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

    primevue: {
        options: {
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.dark'
                }
            }
        }
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
        '@pinia/nuxt',
        '@primevue/nuxt-module'
    ]
})
