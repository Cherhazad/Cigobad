<script setup lang="ts">
import type {NavigationMenuItem} from "@nuxt/ui/components/NavigationMenu.vue";

defineProps({
  menu: {
    type: Boolean,
    default: false
  },
  menuItems: {
    type: Array as PropType<NavigationMenuItem[]>,
    default: () => []
  }
})
</script>

<template>
  <UHeader :ui="{ container: 'mx-0 max-w-full', center: 'w-96 justify-center' }">
    <template #title>
      <slot name="logo">
        Mon application
      </slot>
    </template>

    <UNavigationMenu v-if="menu" :items="menuItems" class="w-full"/>

    <template #right>
      <slot name="right-items"/>
    </template>

  </UHeader>
</template>

<style scoped>

</style>