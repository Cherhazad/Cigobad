<script setup lang="ts">
import {FieldTypes, Level, SessionDto} from "shared";

const levels = Object.values(Level)

const props = defineProps({
  session: {
    type: SessionDto,
    default: null,
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
        placeholder="Lundi..."
        :type="FieldTypes.string"
    />

    <CFormField
        v-model="selectedSession.level"
        label="Niveau"
        :type="FieldTypes.select"
        :items="levels"
    />

    <CFormField
        v-model="selectedSession.hours"
        label="Horaires"
        placeholder="18:00 - 20:00"
        :type="FieldTypes.string"
    />

    <CFormField
        v-model="selectedSession.date"
        label="Date"
        placeholder="dd/mm/yyyy"
        :type="FieldTypes.date"
    />

    <CFormField
        v-model="selectedSession.openedBy"
        label="Gymnase ouvert par"
        placeholder="Jules"
        :type="FieldTypes.string"
    />

  </CForm>

</template>

<style scoped>

</style>