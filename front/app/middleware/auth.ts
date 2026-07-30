import {useAuthStore} from "~/stores/useAuthStore.ts";

export default defineNuxtRouteMiddleware((to) => {
    const publicRoutes = ['/login']
    const auth = useAuthStore()
    const {isAuthenticated} = storeToRefs(auth)

    if (isAuthenticated.value) return

    if (!isAuthenticated.value && !publicRoutes.includes(to.path)) {
        return navigateTo('/login')
    }
})