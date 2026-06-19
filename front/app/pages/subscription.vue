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

type Schema = typeof user.value

const form = useTemplateRef('form')

const toast = useToast()

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  console.log(event.data)
  const data = await $fetch(`${api}/user`, {
    method: 'POST',
    body: event.data,
    onResponseError({response}) {
      toast.add({title: 'Error', description: response._data?.message})
    }
  })
  if (data) {
    toast.add({title: 'Success', description: 'The form has been submitted.', color: 'success'})
  }
}


</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <div
        class="w-2/3 mx-auto flex max-w-sm items-center rounded-xl bg-white p-12 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
      <div class="space-y-8 w-full">
        <UForm ref="form" :state="user" class="space-y-4" @submit="onSubmit">
          <UFormField label="Firstname" name="firstname">
            <UInput v-model="user.firstName" type="string" class="w-full" required/>
          </UFormField>

          <UFormField label="Lastname" name="lastname">
            <UInput v-model="user.lastName" type="string" class="w-full" required/>
          </UFormField>

          <UFormField label="Email" name="email">
            <UInput v-model="user.email" type="email" placeholder="Enter your email" class="w-full" required/>
          </UFormField>

          <UFormField label="Birth date" name="birthdate">
            <UInput v-model="user.birthDate" type="date" class="w-full" required/>
          </UFormField>

          <UFormField label="City" name="city">
            <UInput v-model="user.city" type="string" class="w-full"/>
          </UFormField>

          <UFormField label="Phone number" name="phonenumber">
            <UInput v-model="user.phoneNumber" type="tel" class="w-full" required/>
          </UFormField>

          <UFormField label="Category" name="category">
            <USelectMenu v-model="user.category" :items="categories" class="w-full"/>
          </UFormField>

          <UFormField label="Session" name="session">
            <USelectMenu v-model="user.session" multiple :items="sessions" class="w-full"/>
          </UFormField>

          <UFormField label="Level" name="level">
            <USelectMenu v-model="user.level" :items="levels" class="w-full"/>
          </UFormField>

          <UFormField label="Formula" name="formula">
            <USelectMenu v-model="user.formula" :items="formulas" class="w-full"/>
          </UFormField>

          <UFormField label="Discount" name="discount">
            <USelectMenu v-model="user.discount" :items="discounts" class="w-full"/>
          </UFormField>

        </UForm>

        <UButton @click="form?.submit()">
          Submit
        </UButton>
      </div>
    </div>
  </div>

</template>


<style scoped>

</style>
