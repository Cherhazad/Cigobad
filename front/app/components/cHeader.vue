<script setup lang="ts">
import type {NavigationMenuItem} from "@nuxt/ui/components/NavigationMenu.vue";

defineProps({
  menu: {
    type: Boolean,
    default: false
  },
  menuItems: {
    type: Array<NavigationMenuItem>,
    default: () => []
  }
})
</script>

<template>
  <UHeader :ui="{ container: 'mx-0 max-w-full' }">
    <template #title>
      <slot name="logo">
        Mon application
      </slot>
    </template>

    <template #right>
      <slot name="right-items"/>

      <template v-if="menu">
        <UNavigationMenu
            :items="menuItems"
            highlight
            highlight-color="warning"
            orientation="horizontal"
            class="justify-end w-full"
        />
      </template>
    </template>
  </UHeader>
</template>

<style scoped>

</style>