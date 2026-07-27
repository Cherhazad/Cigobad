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
  <div class="flex flex-col min-h-screen items-center justify-center">
    <h1 class="text-3xl mt-2 font-extrabold text-center text-gray-800 dark:text-white mb-6 tracking-tight">
      NOUS REJOINDRE
    </h1>
    <div
        class="w-2/3 mx-auto flex max-w-sm items-center rounded-xl bg-white p-12 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
      <UserForm :is-form-sent=isFormSent @submitted="(user) => onCreateUser(user)"/>
    </div>
  </div>

</template>


<style scoped>

</style>
