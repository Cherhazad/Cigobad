<script setup lang="ts">
import {useAuthStore} from "~/stores/useAuthStore.ts";
import {Discount, Formula, type UserDto} from 'shared'

definePageMeta({
  middleware: ['auth'],
})

const auth = useAuthStore()
const {user} = storeToRefs(auth)
const config = useRuntimeConfig()
const api = config.public.apiBase
const isDemo = config.public.demoMode

if (!user.value?.sub && !isDemo) await navigateTo('/login')

const userRef = ref()

onMounted(async () => {
  if (isDemo) return
  userRef.value = await useFetch<UserDto>(`${api}/user/${user?.value?.sub}`, {
    method: "GET",
  })
})

const demoUser = {
  firstName: "Jane",
  lastName: "Doe",
  birthDate: new Date(),
  licenceNumber: "12987616889",
  email: "jane.doe@gmail.com",
  phoneNumber: "12987616889",
  discount: Discount.Étudiant,
  formula: Formula["CA + cours"]
} as UserDto

const calledUser = computed(() => {
  if (isDemo) {
    return demoUser
  } else {
    return userRef.value
  }
})

</script>

<template>
  <div class="flex flex-col items-center sm:py-12 sm:px-4">
    <UCard class="sm:w-4/5 w-full">
      <template #title>
        <div class="flex gap-4 items-end">
          <span class="font-bold text-4xl">Profil</span>
        </div>
      </template>

      <template #description>
        Voir tous les détails du profil ici.
      </template>

      <div class="flex flex-col lg:flex-row gap-6">
        <UCard class="w-full lg:w-1/3">
          <template #default>
            <div class="mt-4 flex gap-2">
              <div class="w-1/3 flex justify-center">
                <UAvatar
                    class="h-12 w-12 md:h-24 md:w-24"
                    :text="`${calledUser?.firstName.charAt(0).toUpperCase()}${calledUser?.lastName.charAt(0).toUpperCase()}`"
                />
              </div>

              <div class="flex-1 flex flex-col items-center gap-2">
                <div class="text-lg font-semibold">
                  {{ calledUser?.firstName.toUpperCase() }}
                  {{ calledUser?.lastName.toUpperCase() }}
                </div>
                <Tag>Jeudi</Tag>
              </div>
            </div>
            <div class="mr-auto mt-2">N° FFBaD: {{ calledUser?.licenceNumber }}</div>
          </template>
        </UCard>

        <UCard class="w-full lg:w-2/3">
          <template #default>
            <UserProfileForm
                v-if="calledUser"
                :user="calledUser"
            />
          </template>
        </UCard>
      </div>
    </UCard>
  </div>
</template>

<style scoped>

</style>