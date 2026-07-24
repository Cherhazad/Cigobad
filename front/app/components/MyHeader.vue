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
      <UButton
          icon="i-lucide-user"
          color="neutral"
          variant="ghost"
          aria-label="Se connecter"
          to="/login"
      />
    </template>

  </CHeader>
</template>

<style scoped>

</style>