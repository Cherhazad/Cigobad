<script setup lang="ts">
import type {FormSubmitEvent} from '@nuxt/ui'
import {Category, Discount, Formula, Level, Session, type UserDto} from "shared";

const config = useRuntimeConfig()
const api = config.public.apiBase

const categories = Object.values(Category)
const sessions = Object.values(Session)
const formulas = Object.values(Formula)
const discounts = Object.values(Discount)
const levels = Object.values(Level)

const user = ref<UserDto>({} as UserDto)
const isFormSent = ref<boolean>(false)

type Schema = typeof user.value

const form = useTemplateRef('form')

const toast = useToast()

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const data = await $fetch(`${api}/user`, {
    method: 'POST',
    body: event.data,
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
        <UForm ref="form" :state="user" class="space-y-4" @submit="onSubmit">
          <UFormField label="Prénom" name="firstname" required>
            <UInput v-model="user.firstName" type="string" class="w-full"/>
          </UFormField>

          <UFormField label="Nom" name="lastname" required>
            <UInput v-model="user.lastName" type="string" class="w-full"/>
          </UFormField>

          <UFormField label="Email" name="email" required>
            <UInput v-model="user.email" type="email" placeholder="Enter your email" class="w-full"/>
          </UFormField>

          <UFormField label="Date de naissance" name="birthdate" required>
            <UInput v-model="user.birthDate" type="date" class="w-full"/>
          </UFormField>

          <UFormField label="Téléphone portable" name="phonenumber" required>
            <UInput v-model="user.phoneNumber" type="tel" class="w-full"/>
          </UFormField>

          <UFormField label="Dans quelle commune habitez-vous ?" name="city">
            <UInput v-model="user.city" type="string" class="w-full"/>
          </UFormField>

          <UFormField label="C'est pour votre enfant (à partir de 16 ans) ou pour vous ?" name="category">
            <USelectMenu v-model="user.category" :items="categories" class="w-full"/>
          </UFormField>

          <UFormField label=" Créneaux" name="session">
            <USelectMenu v-model="user.session" multiple :items="sessions" class="w-full"/>
          </UFormField>

          <UFormField label="Niveau" name="level">
            <USelectMenu v-model="user.level" :items="levels" class="w-full"/>
          </UFormField>

          <UFormField label="Formule" name="formula">
            <USelectMenu v-model="user.formula" :items="formulas" class="w-full"/>
          </UFormField>

          <UFormField label="Réduction" name="discount">
            <USelectMenu v-model="user.discount" :items="discounts" class="w-full"/>
          </UFormField>

          <UFormField label="Mais encore ?" name="comment">
            <UTextarea v-model="user.comment" placeholder="Écrire quelque chose..." class="w-full"/>
          </UFormField>

        </UForm>

        <UButton @click="form?.submit()">
          Envoyer
        </UButton>
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
