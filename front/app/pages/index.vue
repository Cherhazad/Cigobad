<script setup lang="ts">
import Club from "~/pages/club.vue";

definePageMeta({
  middleware: ['auth'],
})

</script>

<template>
  <Club/>
</template>

<style scoped>

</style>