<script setup lang="ts">
import type {UserDto} from "shared";
import {Category, Discount, FieldTypes, Formula, Level, Session} from "shared";
import {useToast} from 'primevue/usetoast';

const config = useRuntimeConfig()
const api = config.public.apiBase
const categories = Object.values(Category)
const sessions = Object.values(Session)
const formulas = Object.values(Formula)
const discounts = Object.values(Discount)
const levels = Object.values(Level)

const props = defineProps<{
  user?: UserDto
}>()

const selectedUser = ref<UserDto>(props.user ? {...props.user} : {} as UserDto)
const isFormSent = ref<boolean>(false)
const toast = useToast()

watch(() => props.user, (newUser) => {
  if (newUser) selectedUser.value = {...newUser}
}, {deep: true})

const onCreateUser = async () => {
  const data = await $fetch(`${api}/user`, {
    method: 'POST',
    body: selectedUser.value,
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

const onEditUser = async () => {
  const data = await $fetch(`${api}/user/${selectedUser.value.id}`, {
    method: 'PATCH',
    body: selectedUser.value,
    onResponseError({response}) {
      toast.add({severity: 'error', summary: "'Erreur lors de l'édition", detail: response._data?.message, life: 3000})
    }
  })
  if (data) {
    toast.add({severity: 'Success', summary: 'Modifications', detail: 'Modifications enregistrées.', life: 3000})
    isFormSent.value = true
  }
}

const onSubmit = async () => {
  if (props.user) {
    await onEditUser()
  } else {
    await onCreateUser()
  }
}

const handleSubmit = async () => {
  await onSubmit()
  emits('submitted')
}
const emits = defineEmits(['submitted'])
</script>

<template>
  <Toast/>
  <CForm
      v-if="!isFormSent"
      :button-label="props.user ? 'Enregistrer' : 'Envoyer'"
      :item="selectedUser"
      @submit="handleSubmit"
  >
    <CFormField
        v-model="selectedUser.firstName"
        label="Prénom"
        :type="FieldTypes.string"
    />

    <CFormField
        v-model="selectedUser.lastName"
        label="Nom"
        :type="FieldTypes.string"
    />

    <CFormField
        v-model="selectedUser.email"
        label="Email"
        :type="FieldTypes.email"
    />

    <CFormField
        v-model="selectedUser.birthDate"
        label="Date de naissance"
        :type="FieldTypes.date"
    />

    <CFormField
        v-model="selectedUser.phoneNumber"
        label="Téléphone portable"
        :type="FieldTypes.tel"
    />

    <CFormField
        v-model="selectedUser.city"
        label="Dans quelle commune habitez-vous ?"
        :type="FieldTypes.string"
    />

    <CFormField
        v-model="selectedUser.category"
        label="C'est pour votre enfant (à partir de 16 ans) ou pour vous ?"
        :type="FieldTypes.select"
        :items="categories"
    />

    <CFormField
        v-model="selectedUser.session"
        label="Créneaux"
        :type="FieldTypes['select-multiple']"
        :items="sessions"
    />

    <CFormField
        v-model="selectedUser.level"
        label="Niveau"
        :type="FieldTypes.select"
        :items="levels"
    />

    <CFormField
        v-model="selectedUser.formula"
        label="Formule"
        :type="FieldTypes.select"
        :items="formulas"
    />

    <CFormField
        v-model="selectedUser.discount"
        label="Réduction"
        :type="FieldTypes.select"
        :items="discounts"
    />

    <CFormField
        v-model="selectedUser.comment"
        label="Mais encore ?"
        :type="FieldTypes.textarea"
    />
  </CForm>

  <div v-if="isFormSent" class="space-y-8 w-full text-center text-lg">
    <p>Formulaire d'inscription envoyé.
      <br>Merci 🏸
    </p>
  </div>
</template>

<style scoped>

</style>