<script setup lang="ts">
import type {UserDto} from "shared";
import {Pencil, Times} from "@primeicons/vue";
import type {MenuItem} from "primevue/menuitem";
import {useToast} from 'primevue/usetoast';

const config = useRuntimeConfig()
const api = config.public.apiBase

const sidePanel = ref(false)
const selectedUser = ref<UserDto>({} as UserDto)
const users = ref()
const toast = useToast()

const {data: fetchUsers, refresh} = await useFetch<UserDto[]>(`${api}/user`, {
  method: 'GET',
})

onMounted(async () => {
  users.value = fetchUsers.value
})

watch(fetchUsers, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    users.value = newValue
  }
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

const deleteUser = async (user: UserDto) => {
  const data = await $fetch(`${api}/user/${user.id}`, {
    method: 'DELETE',
    onResponseError({response}) {
      toast.add({
        severity: 'error',
        summary: 'Erreur lors de la suppresion',
        detail: response._data?.message,
        life: 3000
      })
    }
  })
  if (data) {
    toast.add({severity: 'success', summary: 'Suppression', detail: 'Utilisateur supprimé avec succès.', life: 3000})
  }
  refresh()
}

const onEditUser = (user: UserDto) => {
  selectedUser.value = {...user}
  sidePanel.value = true
}

const onSubmitted = async () => {
  refresh()
  toast.add({severity: 'success', summary: 'Modifications', detail: 'Modifications enregistrées', life: 3000});
  sidePanel.value = false
}

const getItems = (user: UserDto): MenuItem[] => [
  {
    label: 'Éditer',
    icon: Pencil,
    command: () => onEditUser(user),
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
  <Toast/>
  <div class="container border-2 mx-auto p-12">
    <h1 class="text-center">CLUB BADMINTON LATTES</h1>
    <p>Bienvenue à CIGO BAD Lattes
      L'entrée principale du gymnase se trouve derrière le collège Georges Brassens, côté Piscine « Les Néréides »
      à 10 minutes du Tram ligne 3, Lattes Centre.
      <br>7 terrains / 4 créneaux :
    </p>
    <ul>
      <li>Mardi 20h/23h</li>
      <li>Jeudi 20h15/23h</li>
      <li>Vendredi 20h/23h</li>
      <li>Samedi 9h/11h (12h)</li>
    </ul>
  </div>

  <div class="container border-2 mx-auto p-12">
    <CTable :items="users" :columns="columns">
      <template #item-birthDate="{ data }">
        {{ new Date(data.birthDate).toLocaleDateString('fr-FR') }}
      </template>
      <template #item-actions="{item}">
        <CDropdownMenu :menu-items="getItems(item)" menu-icon="i-lucide-ellipsis-vertical"/>
      </template>
    </CTable>
  </div>

  <USlideover
      v-model:open="sidePanel"
      title="Éditer les informations"
  >
    <template #body>
      <UserForm :user="selectedUser" @submitted="onSubmitted()"/>
    </template>
  </USlideover>


</template>

<style scoped>
li {
  list-style-type: circle;
}

</style>