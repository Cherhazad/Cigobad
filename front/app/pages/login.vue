<script setup lang="ts">
import {useToast} from "primevue/usetoast";

const config = useRuntimeConfig()
const api = config.public.apiBase
const {fetch: refreshSession} = useUserSession()
const toast = useToast()

const credentials = reactive({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
})
const login = async () => {
  const login = await $fetch(`${api}/auth/login`, {
    method: 'POST',
    body: {email: credentials.email, password: credentials.password},
    onResponseError({response}) {
      toast.add({
        severity: 'error',
        summary: 'Erreur lors de la connexion',
        detail: response._data?.message,
        life: 3000
      })
    }
  })
  if (login) {
    await refreshSession()
    await navigateTo('/sessions')
    toast.add({
      severity: 'success',
      summary: "Connexion",
      detail: 'Connexion réalisée avec succès.',
      life: 3000
    })
  }
}

const register = async () => {
  const register = await $fetch(`${api}/auth/register`, {
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
  if (register) {
    await refreshSession()
    await navigateTo('/sessions')
    toast.add({
      severity: 'success',
      summary: "Inscription",
      detail: 'Inscription réalisée avec succès.',
      life: 3000
    })
  }
}

</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <Tabs class="w-full max-w-lg" value="tab1">
      <TabList class="w-full">
        <Tab value="tab1" class="w-1/2">Se connecter</Tab>
        <Tab value="tab2" class="w-1/2">S'inscrire</Tab>
      </TabList>

      <TabPanels>
        <TabPanel value="tab1">
          <Card class="w-full">
            <template #content>
              <CForm button-label="Se connecter" @submit="login">
                <div class="flex flex-col gap-6 p-4">
                  <CFormField
                      v-model="credentials.email"
                      label="Email"
                      placeholder="Email"
                      type="email"
                  />
                  <CFormField
                      v-model="credentials.password"
                      label="Mot de passe"
                      placeholder="Password"
                      type="string"
                  />
                  <a class="text-xs flex justify-end" href="/login">Mot de passe oublié ?</a>
                </div>
              </CForm>
            </template>
          </Card>
        </TabPanel>

        <TabPanel value="tab2">
          <Card class="w-full">
            <template #content>
              <CForm button-label="S'inscrire" @submit="register">
                <div class="flex flex-col gap-6 p-4">
                  <CFormField
                      v-model="credentials.email"
                      label="Email"
                      placeholder="Email"
                      type="email"
                  />
                  <CFormField
                      v-model="credentials.password"
                      label="Mot de passe"
                      placeholder="Password"
                      type="string"
                  />

                  <CFormField
                      v-model="credentials.firstName"
                      label="Prénom"
                      placeholder="Prénom"
                      type="string"
                  />

                  <CFormField
                      v-model="credentials.lastName"
                      label="Nom"
                      placeholder="Nom"
                      type="string"
                  />
                </div>
              </CForm>
            </template>
          </Card>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<style scoped>

</style>