<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'admin'],
})
</script>

<template>
  <UserManagementAdmin/>
</template>

<style scoped>

</style>