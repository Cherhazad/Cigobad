<script setup lang="ts">
import MyHeader from "./components/MyHeader.vue";
</script>

<template>
  <UApp>
    <NuxtLayout>
      <MyHeader/>
      <NuxtPage/>
    </NuxtLayout>
  </UApp>
</template>

<style>
[data-radix-popper-content-wrapper] {
  z-index: 9999 !important;
}
</style>