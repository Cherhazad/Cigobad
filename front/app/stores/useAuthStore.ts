import {defineStore} from 'pinia'
import type {UserDto} from 'shared'
import {useToast} from "primevue/usetoast";

export const useAuthStore = defineStore('auth', () => {
    const config = useRuntimeConfig()
    const api = config.public.apiBase
    const toast = useToast()

    const token = useCookie<string | null>('token', {
        default: () => null
    })

    const user = ref<UserDto | null>(null)

    const isAuthenticated = computed(() => !!token.value)

    const login = async (email: string, password: string) => {
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
            }
        })

        token.value = response.access_token

        await fetchProfile()

        if (response) {
            toast.add({
                severity: 'success',
                summary: "Connexion",
                detail: 'Connexion réalisée avec succès.',
                life: 3000
            })
            await navigateTo('/sessions')
        }
    }

    const register = async (credentials: { email: string, password: string, firstName: string, lastName: string }) => {
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
            }
        })

        await login(credentials.email, credentials.password)

        if (register) {
            toast.add({
                severity: 'success',
                summary: "Inscription",
                detail: 'Inscription réalisée avec succès.',
                life: 3000
            })
            await navigateTo('/sessions')
        }
    }

    const fetchProfile = async () => {
        if (!token.value) {
            user.value = null
            return
        }

        user.value = await $fetch<UserDto>(`${api}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token.value}`
            }
        })
    }

    const logout = async () => {
        token.value = null
        user.value = null

        navigateTo('/login')
    }

    return {
        token,
        user,
        isAuthenticated,
        login,
        logout,
        fetchProfile,
        register
    }
})