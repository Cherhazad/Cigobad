<script setup lang="ts">

const config = useRuntimeConfig()
const api = config.public.apiBase
const {fetch: refreshSession} = useUserSession()


const credentials = reactive({
  email: '',
  password: '',
})
const login = async () => {
  try {
    await $fetch(`${api}/login`, {
      method: 'POST',
      body: credentials
    })
    await refreshSession()
    await navigateTo('/')
  } catch {
    alert('Bad credentials')
  }
}

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <Card class="w-1/4 overflow-hidden items-center">

      <template #content>
        <CForm button-label="S'inscrire" @submit="login">
          <div class="flex flex-col items-center gap-4">
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
            <a class="text-xs flex justify-end" href="/login">Mot de passe oublié</a>
          </div>
        </CForm>
      </template>
    </Card>
  </div>
</template>

<style scoped>

</style>