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

</style>