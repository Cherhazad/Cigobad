<script setup lang="ts">
import type {UserDto} from "shared";
import {Pencil, Times} from "@primeicons/vue";
import type {MenuItem} from "primevue/menuitem";
import {useToast} from "primevue/usetoast";

const config = useRuntimeConfig()
const api = config.public.apiBase

const editModal = ref(false)
const selectedUser = ref<UserDto>({} as UserDto)
const users = ref()
const toast = useToast()
const modal = ref(false)

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

const onEditUser = async (user: UserDto) => {
  const data = await $fetch(`${api}/user/${user.id}`, {
    method: 'PATCH',
    body: user,
    onResponseError({response}) {
      toast.add({severity: 'error', summary: "'Erreur lors de l'édition", detail: response._data?.message, life: 3000})
    }
  })
  if (data) {
    toast.add({severity: 'success', summary: 'Modifications', detail: 'Modifications enregistrées.', life: 3000})
  }
}

const onSubmit = async (user: UserDto) => {
  if (user.id) {
    await onEditUser(user)
    await refresh()
    editModal.value = false
  }
}

const confirmModal = (user: UserDto) => {
  selectedUser.value = user
  modal.value = true
}

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
    await refresh()
    modal.value = false
  }
}

const onOpenEditModal = (user: UserDto) => {
  selectedUser.value = {...user}
  editModal.value = true
}

const getItems = (user: UserDto): MenuItem[] => [
  {
    label: 'Éditer',
    icon: Pencil,
    command: () => onOpenEditModal(user),
  },
  {separator: true},
  {
    label: 'Supprimer',
    icon: Times,
    class: 'text-red-500! dark:text-red-400!',
    command: () => confirmModal(user)
  },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">

    <div
        class="max-w-5xl mx-auto mb-8 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 p-10">
      <h1 class="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-6 tracking-tight">
        CLUB BADMINTON LATTES
      </h1>
      <p class="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-4 text-center">
        Bienvenue à CIGO BAD Lattes...
      </p>
      <p class="text-gray-700 dark:text-gray-200 font-semibold mb-2 text-center">
        7 terrains / 4 créneaux :
      </p>
      <ul class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 text-sm text-center">
        <li>Mardi 20h/23h</li>
        <li>Jeudi 20h15/23h</li>
        <li>Vendredi 20h/23h</li>
        <li>Samedi 9h/11h (12h)</li>
      </ul>
    </div>

    <div
        class="max-w-7xl mx-auto rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 p-10">
      <CTable :items="users" :columns="columns">
        <template #item-birthDate="{ data }">
          {{ new Date(data.birthDate).toLocaleDateString('fr-FR') }}
        </template>
        <template #item-actions="{ item }">
          <CDropdownMenu :menu-items="getItems(item)" menu-icon="i-lucide-ellipsis-vertical"/>
        </template>
      </CTable>
    </div>

  </div>

  <CModal
      v-model:open="editModal"
      title="Éditer les informations"
  >
    <template #content>
      <UserForm :user="selectedUser" @submitted="(user) => onSubmit(user)"/>
    </template>
  </CModal>

  <CModal
      v-model:open="modal"
      :title="`Supprimer ${ selectedUser.firstName } ${selectedUser.lastName}`"
      description="Êtes-vous sûr.e de vouloir continuer ?"
  >
    <template #footer>
      <Button @click="modal=false">
        Annuler
      </Button>
      <Button severity="danger" @click="deleteUser(selectedUser)">
        Supprimer
      </Button>
    </template>
  </CModal>
</template>

<style scoped>

</style>