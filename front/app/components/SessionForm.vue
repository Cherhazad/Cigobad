<script setup lang="ts">
import type {SessionDto} from "shared";
import {FieldTypes, Level} from "shared";

const levels = Object.values(Level)

const props = defineProps({
  session: {
    type: Object as PropType<SessionDto>,
    default: null,
  }
})

const selectedSession = ref<SessionDto>(props.session ? {...props.session} : {} as SessionDto)

watch(
    () => props.session,
    (newSession) => {
      selectedSession.value = newSession
          ? {...newSession}
          : {} as SessionDto
    },
    {immediate: true}
)

const handleSubmit = async () => {
  emits('submitted', selectedSession.value)
}

const emits = defineEmits(['submitted'])
</script>

<template>
  <CForm
      :button-label="selectedSession.id ? 'Enregistrer' : 'Créer'"
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
        placeholder="Romain"
        :type="FieldTypes.string"
    />

  </CForm>

</template>

<style scoped>

</style>