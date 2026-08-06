<script setup lang="ts">
import type {UserDto} from "shared";

const sessions = ref<UserDto[]>([])
</script>

<template>
  <div class="flex flex-col items-center w-full mt-10">

    <UBanner icon="i-lucide-info" title="Cette page est toujours en travaux, elle sera bientôt traitée."/>

    <UCard
        v-if="sessions?.length === 0"
        class="w-full max-w-xl mx-4 mt-10">
      <template #header>
        <div class="flex flex-col items-center gap-3 pt-8 px-6">
          <div class="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800">
            <i class="pi pi-folder-open text-3xl text-gray-400"/>
          </div>
          <span class="text-xl font-bold ">
        Il semblerait que vous n'ayez pas de session de prévue.
      </span>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-center gap-3 pb-6 px-6">
          <UButton icon="i-lucide-plus" label="Voir les sessions" color="neutral" @click="navigateTo('/sessions')"/>
        </div>
      </template>
    </UCard>
  </div>
</template>

<style scoped>

</style>