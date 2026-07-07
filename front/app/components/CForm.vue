<script setup lang="ts">

const form = useTemplateRef('form')

defineProps({
  item: {
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

defineEmits(['submit'])

</script>

<template>
  <UForm v-bind="$attrs" ref="form" :state="item" class="space-y-4" @submit="$emit('submit')">

    <slot/>

    <div v-if="hasFooter">
      <UButton @click="form?.submit()">
        {{ buttonLabel }}
      </UButton>
    </div>
  </UForm>
</template>

<style scoped>

</style>