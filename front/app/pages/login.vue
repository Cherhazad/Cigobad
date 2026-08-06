<script setup lang="ts">
import {useAuthStore} from "~/stores/useAuthStore.ts";

const auth = useAuthStore()
const {loading} = storeToRefs(auth)

const credentials = reactive({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
})

const items = [
  {
    label: 'Se connecter',
    icon: 'i-lucide-sign-in',
    slot: 'login'
  },
  {
    label: "S'inscrire",
    icon: 'i-lucide-sign-up',
    slot: 'register'
  }
]

</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <UTabs color="neutral" class="w-full max-w-lg" :items="items">
      <template #login>
        <UCard class="w-full">
          <template #default>
            <CForm
                :loading="loading" button-label="Se connecter"
                @submit="auth.login(credentials.email, credentials.password)">
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
                    placeholder="Mot de passe"
                    type="string"
                />
                <a class="text-xs flex justify-end" href="/login">Mot de passe oublié ?</a>
              </div>
            </CForm>
          </template>
        </UCard>
      </template>

      <template #register>
        <UCard class="w-full">
          <template #default>
            <CForm :loading="loading" button-label="S'inscrire" @submit="auth.register(credentials)">
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
                    placeholder="Mot de passe"
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
        </UCard>
      </template>
    </UTabs>
  </div>
</template>

<style scoped>

</style>