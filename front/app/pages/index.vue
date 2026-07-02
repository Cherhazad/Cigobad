<script setup lang="ts">

import type {UserDto} from "shared";
import {Pencil, Times} from "@primeicons/vue";
import type {MenuItem} from "primevue/menuitem";

const config = useRuntimeConfig()
const api = config.public.apiBase

const users = ref<UserDto[]>()

onMounted(async () => {
  const {data: fetchUsers} = await useFetch(`${api}/user`, {
    method: 'GET',
  })
  users.value = fetchUsers.value
})

const columns = [
  {
    field: 'licenceNumber',
    header: 'N° Licence ffpbad',
  },
  {
    field: 'firstName',
    header: 'Prénom',
  },
  {
    field: 'lastName',
    header: 'Nom',
  },
  {
    field: 'birthDate',
    header: 'Date de naissance'
  },
  {
    field: 'email',
    header: 'Email',
  },
  {
    field: 'phoneNumber',
    header: 'Téléphone portable',
  },
  {
    field: 'city',
    header: 'Ville',
  },
  {
    field: 'category',
    header: 'Catégorie',
  },
  {
    field: 'session',
    header: 'Sessions',
  },
  {
    field: 'formula',
    header: 'Formule',
  },
  {
    field: 'discount',
    header: 'Réduction',
  },
  {
    field: 'level',
    header: 'Niveau',
  },
  {
    field: 'comment',
    header: 'Commentaire',
  }
]

const deleteUser = (user: UserDto) => {
  console.log('delete', user.firstName)
}

const editUser = (user: UserDto) => {
  console.log('edit', user.firstName)
}

const items = ref<MenuItem[]>([
  {
    label: 'Éditer',
    icon: Pencil
  },
  {separator: true},
  {
    label: 'Supprimer',
    icon: Times,
    class: 'text-red-500! dark:text-red-400!'
  },
]);
</script>

<template>

  <!--  <div class="container border-2 mx-auto p-12">
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
    </div>-->

  <CTable :items="users" :columns="columns">
    <template #item-birthDate="{ data }">
      {{ new Date(data.birthDate).toLocaleDateString('fr-FR') }}
    </template>
    <template #item-actions="{item}">
      <CDropdownMenu :menu-items="items" menu-icon="i-lucide-ellipsis-vertical"/>
    </template>
  </CTable>

</template>

<style scoped>
li {
  list-style-type: circle;
}

</style>