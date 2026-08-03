import {defineStore} from 'pinia'
import type {UserDto} from 'shared'
import {useToast} from "primevue/usetoast";
import {jwtDecode} from "jwt-decode";

export const useAuthStore = defineStore('auth', () => {
    const config = useRuntimeConfig()
    const api = config.public.apiBase
    const toast = useToast()

    const token = useCookie<string | null>('token', {
        default: () => null
    })

    const user = computed<UserDto | null>(() => {
        if (!token.value) return null
        try {
            return jwtDecode<UserDto>(token.value)
        } catch {
            return null
        }
    })

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

    const logout = async () => {
        token.value = null
        navigateTo('/login')
    }

    return {
        token,
        user,
        isAuthenticated,
        login,
        logout,
        register,
    }
})