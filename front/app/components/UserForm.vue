<script setup lang="ts">
import type {UserDto} from "shared";
import {Category, Discount, FieldTypes, Formula, Level, Session} from "shared";

const emits = defineEmits<{
  submit: [user: UserDto]
}>()

const categories = Object.values(Category)
const sessions = Object.values(Session)
const formulas = Object.values(Formula)
const discounts = Object.values(Discount)
const levels = Object.values(Level)

const props = defineProps<{
  user?: UserDto
}>()

const selectedUser = ref<UserDto>(props.user ? {...props.user} : {} as UserDto)

watch(() => props.user, (newUser) => {
  if (newUser) selectedUser.value = {...newUser}
}, {deep: true})

</script>

<template>
  <CForm
      :button-label="props.user ? 'Enregistrer' : 'Envoyer'"
      :item="selectedUser"
      @submit="emits('submit', selectedUser)">
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
</template>

<style scoped>

</style>