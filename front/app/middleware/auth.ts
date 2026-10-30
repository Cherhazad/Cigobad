import {useAuthStore} from "~/stores/useAuthStore.ts";

export default defineNuxtRouteMiddleware((to) => {
    const publicRoutes = ['/login', '/reset-password', '/forgot-password', '/club', '/'];
    const auth = useAuthStore()
    const {isAuthenticated} = storeToRefs(auth)
    const config = useRuntimeConfig()
    const isDemo = config.public.demoMode

    if (isDemo) return

    if (isAuthenticated.value) return

    if (!isAuthenticated.value && !publicRoutes.includes(to.path)) {
        return navigateTo('/login')
    }
})