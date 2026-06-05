//.global dans l'intitulé du fichier permet à nuxt d'exécuter tout le temps ce middleware sans avoir
// à l'appeler spécifiquement, par exemple dans le cadre d'une vérification d'authentification etc

export default defineNuxtRouteMiddleware((to) => {
    if (to.path === '/my-component') {
        return navigateTo('/about')
    }
})
