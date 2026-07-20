<script setup lang="ts">
import {FieldTypes, Level, SessionDto} from "shared";

const levels = Object.values(Level)

const props = defineProps({
  session: {
    type: SessionDto,
    default: () => ({}),
  }
})

const isFormSent = ref<boolean>(false)
const selectedSession = ref<SessionDto>(props.session ? {...props.session} : {} as SessionDto)

watch(() => props.session, (newSession: SessionDto) => {
  if (newSession) selectedSession.value = {...newSession}
}, {deep: true})

const handleSubmit = async () => {
  /*await onSubmit()*/
  emits('submitted')
}

const emits = defineEmits(['submitted'])


</script>

<template>

  <CForm
      v-if="!isFormSent"
      :button-label="props.session ? 'Enregistrer' : 'Créer'"
      :item="selectedSession"
      @submit="handleSubmit"
  >
    <CFormField
        v-model="selectedSession.name"
        label="Titre"
        :type="FieldTypes.string"
    />

    <CFormField
        v-model="selectedSession.level"
        label="Niveau"
        :type="FieldTypes['select-multiple']"
        :items="levels"
    />

    <CFormField
        v-model="selectedSession.hours"
        label="Horaires"
        :type="FieldTypes.string"
    />

    <CFormField
        v-model="selectedSession.openedById"
        label="Gymnase ouvert par"
        :type="FieldTypes.string"
    />

  </CForm>

</template>

<style scoped>

</style>