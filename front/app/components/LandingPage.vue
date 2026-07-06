<script setup lang="ts">
import {FieldTypes, type UserDto} from "shared";
import {Pencil, Times} from "@primeicons/vue";
import type {MenuItem} from "primevue/menuitem";
import Drawer from 'primevue/drawer';

const config = useRuntimeConfig()
const api = config.public.apiBase

const users = ref<UserDto[]>()
const sidePanel = ref(false)
const selectedUser = ref<UserDto>({} as UserDto)

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
  selectedUser.value = {...user} // copie pour ne pas muter l'original
  sidePanel.value = true
}

const getItems = (user: UserDto): MenuItem[] => [
  {
    label: 'Éditer',
    icon: Pencil,
    command: () => editUser(user),
  },
  {separator: true},
  {
    label: 'Supprimer',
    icon: Times,
    class: 'text-red-500! dark:text-red-400!',
    command: () => deleteUser(user)
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

  <CTable :items="users" :columns="columns">
    <template #item-birthDate="{ data }">
      {{ new Date(data.birthDate).toLocaleDateString('fr-FR') }}
    </template>
    <template #item-actions="{item}">
      <CDropdownMenu :menu-items="getItems(item)" menu-icon="i-lucide-ellipsis-vertical"/>
    </template>
  </CTable>

  <Drawer
      v-model:visible="sidePanel" header="Edit user" position="right"
      class="w-full! sm:w-96! md:w-md! lg:w-120!">
    <CForm :items="selectedUser">
      <template #fields>
        <CFormField
            v-model="selectedUser.firstName"
            label="Prénom"
            :type="FieldTypes.string"
        />

        <CFormField
            v-model="selectedUser.email"
            label="Email"
            :type="FieldTypes.email"
        />
      </template>
    </CForm>
  </Drawer>


</template>

<style scoped>
li {
  list-style-type: circle;
}

</style>