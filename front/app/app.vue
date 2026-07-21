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
/*pour permettre au datepicker de primevue d'être clickable dans le slideover ou la modale de nuxt ui.*/
.p-datepicker-panel {
  pointer-events: all !important;
  z-index: 99999 !important;
}

.p-datepicker-day {
  pointer-events: all !important;
}
</style>