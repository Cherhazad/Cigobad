<script setup lang="ts">
import type {NavigationMenuItem} from "@nuxt/ui/components/NavigationMenu.vue";

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Le club',
  icon: 'i-lucide-house',
  to: '',
  children: [
    {
      label: 'Les membres',
      description: 'Les membres du club',
      icon: 'fa-users',
    },
    {
      label: "S'inscrire",
      description: "S'inscrire au club",
      icon: 'fa-users',
    },
    {
      label: 'Partenaires',
      description: "Les partenaires du club",
      icon: 'fa-users',
    }
  ]
}
])
</script>

<template>
  <c-header menu :menu-items="items">
    <template #logo>
      <img
          src="/cigobad_logo.jpg"
          alt="Logo"
          class="h-8"
      >
      Badminton Lattes
    </template>

    <template #right-items>
      <ColorModeButton/>
    </template>

  </c-header>
</template>

<style scoped>

</style>