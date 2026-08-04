<script setup lang="ts">
import {useAuthStore} from "~/stores/useAuthStore.ts";
import type {UserDto} from 'shared'

const auth = useAuthStore()
const {user} = storeToRefs(auth)
const config = useRuntimeConfig()
const api = config.public.apiBase


const {data: userRef} = await useFetch<UserDto>(`${api}/user/${user?.value?.sub}`, {
  method: "GET",
})

</script>

<template>
  <div class="flex flex-col items-center py-12 px-4">
    <UCard class="w-4/5">
      <template #title>
        <div class="flex gap-4 items-end">
          <span class="font-bold text-4xl">Profil</span>
        </div>
      </template>

      <template #description>
        Voir tous les détails du profil ici.
      </template>

      <template #default>
        <div class="flex flex-col lg:flex-row gap-6">
          <UCard class="w-full lg:w-1/3">
            <template #default>
              <div class="mt-4 flex gap-2">
                <div class="w-1/3 flex justify-center">
                  <UAvatar
                      class="h-24 w-24"
                      :text="`${user?.firstName.charAt(0).toUpperCase()}${user?.lastName.charAt(0).toUpperCase()}`"
                  />
                </div>

                <div class="flex-1 flex flex-col items-center gap-2">
                  <div class="text-lg font-semibold">
                    {{ user?.firstName.toUpperCase() }}
                    {{ user?.lastName.toUpperCase() }}
                  </div>
                  <Tag>Jeudi</Tag>
                  <span class="mr-auto">N° de licence FFPBad: {{ userRef?.licenceNumber }}</span>
                </div>
              </div>
            </template>
          </UCard>

          <UCard class="w-full lg:w-2/3">
            <template #default>
              <UserProfileForm :user="userRef"/>
            </template>
          </UCard>
        </div>
      </template>
    </UCard>
  </div>
</template>

<style scoped>

</style>