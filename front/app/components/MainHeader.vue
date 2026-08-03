<script setup lang="ts">
import type {NavigationMenuItem} from "@nuxt/ui/components/NavigationMenu.vue";
import CColorModeButton from "~/components/CColorModeButton.vue";
import {useAuthStore} from "~/stores/useAuthStore.ts";
import type {MenuItem} from "primevue/menuitem";

const auth = useAuthStore()
const {user, isAuthenticated} = storeToRefs(auth)

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Le club',
  icon: 'i-lucide-house',
  to: '',
  children: isAuthenticated.value ?
      [
        {
          label: 'Cigobad',
          description: 'Présentation du club',
          icon: 'fa-users',
          to: '/club'
        },
        {
          label: "Nous rejoindre",
          description: "S'inscrire au club",
          icon: 'fa-edit',
          to: '/subscription'
        },
        {
          label: "Sessions du club",
          description: "S'inscrire à une session",
          icon: 'fa-calendar',
          to: '/sessions'
        }
      ] :
      [
        {
          label: 'Cigobad',
          description: 'Présentation du club',
          icon: 'fa-users',
          to: '/club'
        },
      ]

}
])

const profileItems = computed<MenuItem[]>(() => [
  {
    label: 'Modifier le profil',
  },
  {
    label: "Déconnexion",
    command: auth.logout
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
          v-if="!isAuthenticated"
          icon="i-lucide-user"
          color="neutral"
          variant="ghost"
          aria-label="Se connecter"
          to="/login"
      />

      <CDropdownMenu
          v-else
          :menu-items="profileItems"
      >
        <template #avatar>
          <UAvatar :text="`${user?.firstName.charAt(0).toUpperCase()}${user?.lastName.charAt(0).toUpperCase()}`"/>
        </template>
      </CDropdownMenu>
    </template>

  </CHeader>
</template>

<style scoped>

</style>