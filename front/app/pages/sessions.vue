<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>

  <SessionCaroussel/>

</template>

<style scoped>
li {
  list-style-type: circle;
}

</style>