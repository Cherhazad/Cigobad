<script setup lang="ts">

import type {DropdownMenuItem} from "#ui/components/DropdownMenu.vue";

defineProps({
  menuItems: {
    type: Array as PropType<DropdownMenuItem[] | DropdownMenuItem[][]>,
    required: true,
  },
  menuIcon: {
    type: String,
    default: ''
  },
  menuLabel: {
    type: String,
    default: ''
  },
  border: {
    type: Boolean,
    default: false
  }
})

</script>

<template>
  <div class="flex justify-center">
    <UDropdownMenu
        :items="menuItems"
        :ui="{
          content: 'w-48'
        }"
    >
      <UButton :icon="menuIcon" color="neutral" :variant="border ? 'outline' : 'ghost'">
        {{ menuLabel }}
      </UButton>
    </UDropdownMenu>
  </div>
</template>

<style scoped>

</style>