<script setup lang="ts">

import type {UserDto} from "shared";

const config = useRuntimeConfig()
const api = config.public.apiBase

const users = ref<UserDto[]>()

onMounted(async () => {
  const {data: fetchUsers} = await useFetch(`${api}/user`, {
    method: 'GET',
  })
  users.value = fetchUsers.value
})
</script>

<template>
  <div class="container border-2 mx-auto p-12">
    <h1 class="text-center">CLUB BADMINTON LATTES</h1>
    <p>Bienvenue à CIGO BAD Lattes
      L'entrée principale du gymnase se trouve derrière le collège Georges Brassens, côté Piscine « Les Néréides »
      à 10 minutes du Tram ligne 3, Lattes Centre.
      <br>7 terrains / 4 créneaux :
      <ul>
        <li>Mardi 20h/23h</li>
        <li>Jeudi 20h15/23h</li>
        <li>Vendredi 20h/23h</li>
        <li>Samedi 9h/11h (12h)</li>
      </ul>
    </p>
  </div>

  <div class="mx-auto p-12">
    <UTable :data="users" class="flex-1"/>
  </div>
</template>

<style scoped>
li {
  list-style-type: circle;
}

</style>