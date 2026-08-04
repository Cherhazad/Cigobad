<script setup lang="ts">
import MainHeader from "./components/MainHeader.vue";
</script>

<template>
  <UApp>
    <Toast/>
    <NuxtLayout>
      <MainHeader/>
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