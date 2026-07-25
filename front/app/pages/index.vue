<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
})

const {user, clear: clearSession} = useUserSession()

const logout = async () => {
  await clearSession()
  await navigateTo('/login')
}
</script>

<template>
  <div>
    <h1>Welcome {{ user }}</h1>
    <button @click="logout">
      Logout
    </button>
  </div>
</template>

<style scoped>

</style>