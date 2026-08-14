<script setup lang="ts">
import {useAuthStore} from "~/stores/useAuthStore.ts";

const auth = useAuthStore()
const isFormSubmitted = ref(false);

const credentials = reactive({
  email: '',
})

const items = [
  {
    label: "Saisir l'adresse mail",
    slot: 'mail'
  },
]

const onSubmit = async () => {
  await auth.forgotPassword(credentials.email)
  isFormSubmitted.value = true
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <UTabs v-if="!isFormSubmitted" color="neutral" class="w-full max-w-lg" :items="items">
      <template #mail>
        <UCard class="w-full max-w-lg">
          <div class="flex flex-col gap-6 p-4">
            <UFormField label="Adresse mail">
              <div class="flex gap-2 w-full">
                <UInput
                    v-model="credentials.email"
                    class="w-full"
                    type="email"
                    placeholder="Saisir l'adresse mail"
                />
              </div>
            </UFormField>

            <div class="flex justify-end">
              <UButton
                  :disabled="!credentials.email"
                  color="neutral"
                  @click="onSubmit"
              >
                Envoyer
              </UButton>
            </div>
          </div>

        </UCard>
      </template>
    </UTabs>
    <UCard v-else class="w-full max-w-lg">
      <div class="space-y-8 w-full text-center text-lg">
        <span>Si un compte est associé à cette adresse, vous recevrez un email dans quelques minutes. Pensez à vérifier vos spams. 🏸</span>
      </div>
    </UCard>
  </div>
</template>

<style scoped>

</style>