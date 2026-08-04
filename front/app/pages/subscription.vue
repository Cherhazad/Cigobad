<script setup lang="ts">
import {useToast} from "primevue/usetoast";
import type {UserDto} from "shared";

definePageMeta({
  middleware: ['auth'],
})

const config = useRuntimeConfig()
const api = config.public.apiBase
const isFormSent = ref<boolean>(false)
const toast = useToast()

const onCreateUser = async (user: UserDto) => {
  const data = await $fetch(`${api}/user`, {
    method: 'POST',
    body: user,
    onResponseError({response}) {
      toast.add({severity: 'error', summary: 'data fetch error', detail: response._data?.message, life: 3000})
    }
  })
  if (data) {
    toast.add({
      severity: 'success',
      summary: 'Inscription utilisateur',
      detail: 'Le formulaire a bien été envoyé.',
      life: 3000
    })
    isFormSent.value = true
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 py-8">
    <h1 class="text-2xl md:text-3xl font-extrabold text-center mb-6">
      NOUS REJOINDRE
    </h1>
    <div
        class="w-full max-w-2xl mx-4 rounded-xl bg-white dark:bg-gray-800 p-6 md:p-10 shadow-lg">
      <UserForm :is-form-sent=isFormSent @submitted="(user) => onCreateUser(user)"/>
    </div>
  </div>

</template>


<style scoped>

</style>
