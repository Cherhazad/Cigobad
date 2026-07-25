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
  <UHeader :ui="{ container: 'mx-0 max-w-full'}">
    <template #title>
      <slot name="logo"/>
    </template>

    <template #default>
      <UNavigationMenu
          v-if="menu"
          :items="menuItems"
          :ui="{
            viewport: 'min-w-[600px]',
            content: 'w-[600px]',
            childList: 'grid-cols-2 gap-4'
          }"
      />
    </template>

    <template #right>
      <slot name="right-items"/>
    </template>

    <template #body>
      <UNavigationMenu v-if="menu" :items="menuItems" orientation="vertical" class="-mx-2.5"/>
    </template>

  </UHeader>
</template>

<style scoped>

</style>