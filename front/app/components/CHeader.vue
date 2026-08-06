<script setup lang="ts">
import CColorModeButton from "~/components/CColorModeButton.vue";
import {useAuthStore} from "~/stores/useAuthStore.ts";
import type {DropdownMenuItem} from "#ui/components/DropdownMenu.vue";
import type {UserPayloadDto} from "shared";
import BadmintonIcon from '@iconify-vue/icon-park-outline/badminton';

const auth = useAuthStore()
const {user, isAuthenticated} = storeToRefs(auth)

const getName = (user: UserPayloadDto) => {
  return user.firstName + " " + user.lastName
}

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: user.value ? getName(user.value) : '',
      avatar: {
        text: `${user?.value?.firstName.charAt(0).toUpperCase()}${user?.value?.lastName.charAt(0).toUpperCase()}`,
      },
      type: 'label'
    }
  ],
  [
    {
      label: 'Modifier le profil',
      icon: 'i-lucide-user',
      to: '/profile-settings'
    },
    {
      label: 'Mes sessions',
      icon: 'i-lucide-calendar',
      to: '/mes-sessions'
    }
  ],
  [
    {
      label: 'Cigobad',
      icon: BadmintonIcon,
      to: '/club'
    },
    {
      label: "Nous rejoindre",
      icon: 'fa-edit',
      to: '/subscription'
    },
    {
      label: "Sessions du club",
      icon: 'fa-calendar',
      to: '/sessions'
    }
  ],
  user.value?.role === 'ADMIN' ? adminMenuItems.value : [],
  [
    {
      label: "Déconnexion",
      onSelect: auth.logout,
      color: 'error',
      icon: 'i-lucide-log-out'
    }
  ],
])

const adminMenuItems = computed(() => [
  {
    label: "Adhérents du club",
    icon: 'i-lucide-users',
    to: '/attendees'
  }
])

</script>

<template>
  <UHeader :content="{side: 'left'}" :ui="{ container: 'mx-0 max-w-full', center: 'lg:hidden!'}" :toggle="false">
    <template #title>
      <img
          src="/cigobad_logo.jpg"
          alt="Logo"
          class="h-8"
      >
      Badminton Lattes
    </template>

    <template #right>
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
          v-if="isAuthenticated"
          :menu-items="items"
          menu-icon="i-lucide-menu"
          :border="false"
      />
    </template>
  </UHeader>
</template>

<style scoped>

</style>