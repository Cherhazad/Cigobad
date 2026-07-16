<script setup lang="ts">

</script>

<template>
  <div class="flex justify-center">
    <Card class="w-3/5 overflow-hidden" :pt="{ body: { class: 'pt-16!' } }">

      <template #header>
        <div class="relative">
          <img
              class="w-full max-h-42 object-cover"
              alt="user header"
              src="https://images.unsplash.com/photo-1513649718256-1a7162666bad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >

        </div>

      </template>


      <template #title>
        <span class="font-bold text-5xl">Mardi</span>
      </template>

      <template #subtitle>
        <div class="flex items-center gap-2">
          <Tag severity="info" value="Niveau confirmé"/>
          <Tag severity="success" value="Disponible"/>
        </div>
      </template>

      <template #content>
        <div class="space-y-4">
          <span class="font-bold text-xl">20:15 - 23:00</span>
          <div class="flex items-center gap-2">
            <span><b>Nombre d'inscrits: </b> 23/36</span>
          </div>
          <div class="flex items-center gap-2">
            <span><b>Gymnase ouvert par: </b> Romain</span>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex justify-end gap-2 mt-4">
          <Button>
            M'inscrire
          </Button>
        </div>
      </template>
    </Card>
  </div>

</template>

<style scoped>

</style>