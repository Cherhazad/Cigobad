import {defineStore} from 'pinia'
import type {UserPayloadDto} from 'shared';
import {useToast} from "primevue/usetoast";
import {jwtDecode} from "jwt-decode";

export const useAuthStore = defineStore('auth', () => {
    const config = useRuntimeConfig()
    const api = config.public.apiBase
    const toast = useToast()
    const loading = ref<boolean>(false);
    const isSubscription = ref<boolean>(false);

    const token = useCookie<string | null>('token', {
        default: () => null
    })

    const user = computed<UserPayloadDto | null>(() => {
        if (!token.value) return null
        try {
            return jwtDecode<UserPayloadDto>(token.value)
        } catch {
            return null
        }
    })

    const isAuthenticated = computed(() => !!token.value)

    const login = async (email: string, password: string) => {
        loading.value = true
        const response = await $fetch<{ access_token: string }>(`${api}/auth/login`, {
            method: 'POST',
            body: {
                email,
                password
            },
            onResponseError({response}) {
                toast.add({
                    severity: 'error',
                    summary: 'Erreur lors de la connexion',
                    detail: response._data?.message,
                    life: 3000
                })
                loading.value = false
            }
        })

        token.value = response.access_token

        if (response && !isSubscription.value) {
            toast.add({
                severity: 'success',
                summary: "Connexion",
                detail: 'Connexion réalisée avec succès.',
                life: 3000
            })
            await navigateTo('/sessions')
            loading.value = false
        }
    }

    const register = async (credentials: { email: string, password: string, firstName: string, lastName: string }) => {
        isSubscription.value = true
        loading.value = true
        const register = await $fetch<{ access_token: string }>(`${api}/auth/register`, {
            method: 'POST',
            body: credentials,
            onResponseError({response}) {
                toast.add({
                    severity: 'error',
                    summary: "Erreur lors de l'inscription",
                    detail: response._data?.message,
                    life: 3000
                })
                loading.value = false
            }
        })

        await login(credentials.email, credentials.password)
        isSubscription.value = false

        if (register) {
            toast.add({
                severity: 'success',
                summary: "Inscription",
                detail: 'Inscription réalisée avec succès.',
                life: 3000
            })
            await navigateTo('/sessions')
            loading.value = false
        }
    }

    const logout = async () => {
        token.value = null
        navigateTo('/login')
    }

    const forgotPassword = async (email: string) => {
        const forgotPassword = await $fetch<{ message: string }>(`${api}/auth/forgot-password`, {
            method: 'POST',
            body: {
                email,
            },
            onResponseError({response}) {
                toast.add({
                    severity: 'error',
                    summary: "Erreur lors de l'envoi du lien par mail",
                    detail: response._data?.message,
                    life: 3000
                })
            }
        })
        if (forgotPassword) {
            toast.add({
                severity: 'success',
                summary: "Envoi du lien par mail",
                detail: "Le lien de modification du mot de passe a bien été envoyé.",
                life: 3000
            })
        }
    }

    const resetPassword = async (credentials: { token: string, newPassword: string }) => {
        const resetPassword = await $fetch<{ access_token: string }>(`${api}/auth/reset-password`, {
            method: 'POST',
            body: credentials,
            onResponseError({response}) {
                toast.add({
                    severity: 'error',
                    summary: "Erreur lors de la modification du mot de passe",
                    detail: response._data?.message,
                    life: 3000
                })
            }
        })

        if (resetPassword) {
            toast.add({
                severity: 'success',
                summary: "Modification de mot de passe",
                detail: 'Mot de passe modifié avec succès.',
                life: 3000
            })
            await navigateTo('/sessions')
        }
    }

    return {
        token,
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        register,
        forgotPassword,
        resetPassword,
    }
})