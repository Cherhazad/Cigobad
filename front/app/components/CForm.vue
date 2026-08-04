<script setup lang="ts">

const form = useTemplateRef('form')

defineProps({
  item: {
    type: Object,
    default: null,
  },
  hasFooter: {
    type: Boolean,
    default: true
  },
  buttonLabel: {
    type: String,
    default: 'Submit',
  },
  buttonClass: {
    type: String,
    default: ''
  }
})

defineEmits(['submit'])

</script>

<template>
  <UForm
      v-bind="$attrs"
      ref="form"
      :state="item"
      class="space-y-4"
      @submit="$emit('submit')"
  >

    <slot/>

    <div v-if="hasFooter" class="flex justify-end pt-2">
      <UButton color="neutral" :class="buttonClass" @click="form?.submit()">
        {{ buttonLabel }}
      </UButton>
    </div>
  </UForm>
</template>

<style scoped>

</style>