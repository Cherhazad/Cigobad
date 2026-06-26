<script setup lang="ts">
defineProps<{ row: any }>()
</script>

<template>
  <UDropdownMenu :items="row.original" :content="{ align: 'end' }">
    <UButton
        icon="i-lucide-ellipsis-vertical"
        color="neutral"
        variant="ghost"
        aria-label="Actions dropdown"
    />
    <template #content>
      <slot/>
    </template>
  </UDropdownMenu>
</template>

<style scoped>

</style>