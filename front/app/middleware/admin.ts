export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore()
    const {user} = storeToRefs(authStore)

    if (user?.value?.role !== 'ADMIN') {
        return navigateTo('/')
    }
})