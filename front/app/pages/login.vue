<script setup lang="ts">
import {useAuthStore} from "~/stores/useAuthStore.ts";

const auth = useAuthStore()

const credentials = reactive({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
})

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
              <CForm button-label="Se connecter" @submit="auth.login(credentials.email, credentials.password)">
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
              <CForm button-label="S'inscrire" @submit="auth.register(credentials)">
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