<script setup lang="ts">

import {Discount, FieldTypes, Formula, type UserDto} from "shared";
import {useToast} from "primevue/usetoast";

const config = useRuntimeConfig()
const api = config.public.apiBase
const isEditMode = ref(false)
const formulas = Object.values(Formula)
const discounts = Object.values(Discount)

const props = defineProps({
  user: {
    type: Object as PropType<UserDto | undefined>,
    required: true,
  }
})

const toast = useToast()

const updatedUser = ref<UserDto>(props.user ? {...props.user} : {} as UserDto)

watch(() => props.user, (newUser) => {
  if (newUser) updatedUser.value = {...newUser}
}, {deep: true})

const onEditUser = async () => {
  if (props?.user?.id) {
    const data = await $fetch(`${api}/user/${props?.user?.id}`, {
      method: 'PATCH',
      body: updatedUser.value,
      onResponseError({response}) {
        toast.add({
          severity: 'error',
          summary: "'Erreur lors de l'édition",
          detail: response._data?.message,
          life: 3000
        })
      }
    })
    if (data) {
      toast.add({severity: 'success', summary: 'Modifications', detail: 'Modifications enregistrées.', life: 3000})
      isEditMode.value = false
    }
  }
}

</script>

<template>
  <div class="flex">
    <div class="font-semibold text-lg">Informations personnelles</div>
    <UButton
        :color="isEditMode ? 'error' : 'neutral'"
        :icon="isEditMode ? 'i-lucide-x' : 'i-lucide-edit'"
        class="ml-auto"
        @click="isEditMode = !isEditMode"
    />
  </div>
  <div class="flex-1 flex flex-col gap-2">
    <CForm :has-footer="isEditMode" @submit="onEditUser">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CFormField
            v-model="updatedUser!.email"
            :disabled="!isEditMode"
            label="Email"
            type="string"/>
        <CFormField
            v-model="updatedUser!.phoneNumber"
            :disabled="!isEditMode"
            label="Téléphone"
            type="string"/>
        <CFormField
            v-model="updatedUser!.formula"
            :disabled="!isEditMode"
            label="Formule"
            :type="FieldTypes.select"
            :items="formulas"/>
        <CFormField
            v-model="updatedUser!.discount"
            :disabled="!isEditMode"
            label="Réduction"
            :type="FieldTypes.select"
            :items="discounts"/>
      </div>
    </CForm>
  </div>
</template>

<style scoped>

</style>