<script setup lang="ts">
import {useAuthStore} from "~/stores/useAuthStore.ts";

const auth = useAuthStore()
const route = useRoute()
const token = route.query.token as string

const credentials = reactive({
  token: token,
  newPassword: '',
})

const passwordVerif = ref('')
const showPassword = ref(false)
const showPasswordVerif = ref(false)

const passwordsMatch = computed(() =>
    credentials.newPassword === passwordVerif.value && credentials.newPassword.length > 0
)

const passwordError = computed(() =>
    passwordVerif.value.length > 0 && !passwordsMatch.value
        ? 'Les mots de passe ne correspondent pas'
        : undefined
)

const items = [
  {
    label: 'Modifier le mot de passe',
    slot: 'password'
  },
]
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <UTabs color="neutral" class="w-full max-w-lg" :items="items">
      <template #password>
        <UCard class="w-full max-w-lg">
          <div class="flex flex-col gap-6 p-4">

            <UFormField label="Nouveau mot de passe">
              <div class="flex gap-2 w-full">
                <UInput
                    v-model="credentials.newPassword"
                    class="w-full"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Mot de passe"
                />
                <UButton
                    class="mt-auto"
                    color="neutral"
                    variant="ghost"
                    :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    @click="showPassword = !showPassword"
                />
              </div>
            </UFormField>

            <UFormField
                label="Vérifier le mot de passe"
                :error="passwordError"
            >
              <div class="flex gap-2 w-full">
                <UInput
                    v-model="passwordVerif"
                    class="w-full"
                    :type="showPasswordVerif ? 'string' : 'password'"
                    placeholder="Vérifier le mot de passe"
                    :color="passwordVerif.length > 0 ? (passwordsMatch ? 'success' : 'error') : 'neutral'"
                />
                <UButton
                    class="mt-auto"
                    color="neutral"
                    variant="ghost"
                    :icon="showPasswordVerif ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    @click="showPasswordVerif = !showPasswordVerif"
                />
              </div>
            </UFormField>

            <div class="flex justify-end">
              <UButton
                  :disabled="!passwordsMatch"
                  color="neutral"
                  @click="auth.resetPassword(credentials)"
              >
                Valider
              </UButton>
            </div>
          </div>
        </UCard>
      </template>
    </UTabs>
  </div>
</template>