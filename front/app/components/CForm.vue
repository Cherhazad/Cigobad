<script setup lang="ts">

const form = useTemplateRef('form')

const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
  hasFooter: {
    type: Boolean,
    default: true
  },
  buttonLabel: {
    type: String,
    default: 'Submit',
  }
})

const emits = defineEmits(['submit'])
</script>

<template>
  <UForm v-bind="$attrs" ref="form" :state="items" @submit="$emit('submit')">

    <slot name="fields"/>

    <div v-if="hasFooter">
      <UButton @click="form?.submit()">
        {{ buttonLabel }}
      </UButton>
    </div>
  </UForm>
</template>

<style scoped>

</style>