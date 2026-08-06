<script setup lang="ts">
import CHeader from "./components/CHeader.vue";
</script>

<template>
  <UApp>
    <Toast/>
    <NuxtLayout>
      <CHeader/>
      <NuxtPage/>
    </NuxtLayout>
  </UApp>
</template>

<style>
:root {
  --ui-bg: #ffffff;
}

.dark {
  --ui-bg: #09090b; /* zinc-950 */
}

</style>