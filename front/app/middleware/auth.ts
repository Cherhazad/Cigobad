export default defineNuxtRouteMiddleware((to) => {
    const publicRoutes = ['/login']
    const {loggedIn} = useUserSession()

    if (loggedIn.value) return

    if (!loggedIn.value && !publicRoutes.includes(to.path)) {
        console.log(loggedIn.value)
        console.log(to.path)
        return navigateTo('/login')
    }
})