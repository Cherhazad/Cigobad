<script setup lang="ts">

defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  headerClass: {
    type: String,
    default: ''
  },
  contentClass: {
    type: String,
    default: ''
  },
  bodyClass: {
    type: String,
    default: ''
  },
  footerClass: {
    type: String,
    default: 'justify-end'
  }
})
const modal = defineModel<boolean>('open')
</script>

<template>
  <UModal
      v-model:open="modal"
      :title="title"
      :description="description"
      :ui="{
        footer: footerClass,
        header: headerClass,
        content: contentClass,
        body: bodyClass
       }"
  >
    <template v-if="$slots.content" #body>
      <slot name="content"/>
    </template>

    <template v-if="$slots.footer" #footer>
      <slot name="footer"/>
    </template>
  </UModal>
</template>

<style scoped>

</style>