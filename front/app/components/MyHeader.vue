<script setup lang="ts">
import type {NavigationMenuItem} from "@nuxt/ui/components/NavigationMenu.vue";

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Le club',
  icon: 'i-lucide-house',
  to: '',
  children: [
    {
      label: 'Cigobad',
      description: 'Présentation du club',
      icon: 'fa-users',
      to: '/club'
    },
    {
      label: "Nous rejoindre",
      description: "S'inscrire au club",
      icon: 'fa-users',
      to: '/subscription'
    },
    {
      label: 'Grille tarifaire',
      description: "Saison 2026-2027",
      icon: 'fa-users',
    },
    {
      label: 'Conseils & Tutoriels',
      description: "Conseils & Tutoriels au club",
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
  <CHeader menu :menu-items="items">
    <template #logo>
      <img
          src="/cigobad_logo.jpg"
          alt="Logo"
          class="h-8"
      >
      Badminton Lattes
    </template>

    <template #right-items>
      <CColorModeButton/>
    </template>

  </CHeader>
</template>

<style scoped>

</style>