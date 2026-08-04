<script setup lang="ts">

const colorMode = useColorMode()

const isDark = computed(() => {
  return colorMode.value === 'dark'
})

const toggleDark = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <UTooltip
        :delay-duration="0"
        :text="`Passer au mode ${isDark ? 'clair' : 'sombre'}`"
    >
      <UButton
          :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
          color="neutral"
          variant="ghost"
          :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
          @click="toggleDark"
      />
    </UTooltip>
    <template #fallback>
      <div class="size-8"/>
    </template>
  </ClientOnly>
</template>

<style scoped>

</style>