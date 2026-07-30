export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const token = useCookie<string | null>('token')

    globalThis.$fetch = $fetch.create({
        baseURL: config.public.apiBase,
        
        onRequest({options}) {
            if (token.value) {
                options.headers = new Headers(options.headers)
                options.headers.set(
                    'Authorization',
                    `Bearer ${token.value}`
                )
            }
        }
    })
})