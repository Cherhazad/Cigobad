<script setup lang="ts">

import type {UserDto} from "shared";
import type {TableColumn} from "@nuxt/ui/components/Table.vue";

const config = useRuntimeConfig()
const api = config.public.apiBase

const users = ref<UserDto[]>()

onMounted(async () => {
  const {data: fetchUsers} = await useFetch(`${api}/user`, {
    method: 'GET',
  })
  users.value = fetchUsers.value
})

const columns: TableColumn<UserDto>[] = [
  {
    accessorKey: 'licenceNumber',
    header: 'N° Licence ffpbad',
  },
  {
    accessorKey: 'firstName',
    header: 'Prénom',
  },
  {
    accessorKey: 'lastName',
    header: 'Nom',
  },
  {
    accessorKey: 'birthDate',
    header: 'Date de naissance',
    cell: ({row}) => {
      return new Date(row.getValue('birthDate')).toLocaleDateString()
    }
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Téléphone portable',
  },
  {
    accessorKey: 'city',
    header: 'Ville',
  },
  {
    accessorKey: 'category',
    header: 'Catégorie',
  },
  {
    accessorKey: 'session',
    header: 'Sessions',
  },
  {
    accessorKey: 'formula',
    header: 'Formule',
  },
  {
    accessorKey: 'discount',
    header: 'Réduction',
  },
  {
    accessorKey: 'level',
    header: 'Niveau',
  },
  {
    accessorKey: 'comment',
    header: 'Commentaire',
  },
]
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
    <UContainer>
      <UTable :data="users" :columns="columns" class="flex-1"/>
    </UContainer>
  </div>

</template>

<style scoped>
li {
  list-style-type: circle;
}

</style>