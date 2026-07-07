<script setup lang="ts">
import type {UserDto} from "shared";

const config = useRuntimeConfig()
const api = config.public.apiBase

const isFormSent = ref<boolean>(false)

const toast = useToast()

const onSubmit = async (userData: UserDto) => {
  const data = await $fetch(`${api}/user`, {
    method: 'POST',
    body: userData,
    onResponseError({response}) {
      toast.add({title: 'Error', description: response._data?.message})
    }
  })
  if (data) {
    toast.add({title: 'Success', description: 'The form has been submitted.', color: 'success'})
    isFormSent.value = true
  }
}

</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <div
        class="w-2/3 mx-auto flex max-w-sm items-center rounded-xl bg-white p-12 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">

      <div v-if="!isFormSent" class="space-y-8 w-full">
        <UserForm @submit="onSubmit"/>
      </div>

      <div v-if="isFormSent" class="space-y-8 w-full text-center text-lg">
        <p>Formulaire d'inscription envoyé.
          <br>Merci 🏸
        </p>
      </div>
    </div>
  </div>

</template>


<style scoped>

</style>
