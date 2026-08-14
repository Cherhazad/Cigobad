<script setup lang="ts">
import {useAuthStore} from "~/stores/useAuthStore.ts";
import type {UserDto} from "shared";
import {Role} from "shared";
import {useToast} from "primevue/usetoast";
import type {DropdownMenuItem} from "#ui/components/DropdownMenu.vue";

const auth = useAuthStore()
const {isAuthenticated, user} = storeToRefs(auth)
const config = useRuntimeConfig()
const api = config.public.apiBase
const toast = useToast()
const modal = ref(false)
const editModal = ref(false)
const selectedUser = ref<UserDto>({} as UserDto)

const {data: fetchUsers, refresh} = await useFetch<UserDto[]>(`${api}/user`, {
  method: 'GET',
})

const columns = [
  {
    field: 'licenceNumber',
    header: 'N° Licence FFBaD',
  },
  {
    field: 'role',
    header: 'ADMIN'
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

const getItems = (user: UserDto): DropdownMenuItem[] => [
  {
    label: 'Éditer',
    icon: 'i-lucide-edit',
    onSelect: () => onOpenEditModal(user),
  },
  {separator: true},
  {
    label: 'Supprimer',
    icon: 'i-lucide-delete',
    class: 'text-red-500! dark:text-red-400!',
    onSelect: () => confirmModal(user)
  },
]

const onOpenEditModal = (user: UserDto) => {
  selectedUser.value = {...user}
  editModal.value = true
}

const confirmModal = (user: UserDto) => {
  selectedUser.value = user
  modal.value = true
}

const onSubmit = async (user: UserDto) => {
  if (user.id) {
    await onEditUser(user)
    await refresh()
    editModal.value = false
  }
}

const deleteUser = async (user: UserDto) => {
  const data = await $fetch(`${api}/user/${user.id}`, {
    method: 'DELETE',
    onResponseError({response}) {
      toast.add({
        severity: 'error',
        summary: 'Erreur lors de la suppression',
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

const onEditUserRole = async (user: UserDto, value: boolean) => {
  console.log(value);
  const data = await $fetch(`${api}/user/${user.id}`, {
    method: 'PATCH',
    body: {
      id: user.id,
      role: value ? Role.ADMIN : Role.USER,
    },
    onResponseError({response}) {
      toast.add({
        severity: 'error',
        summary: "'Erreur lors de l'édition du rôle",
        detail: response._data?.message,
        life: 3000
      })
    }
  })
  if (data) {
    toast.add({severity: 'success', summary: 'Modification du rôle', detail: 'Modifications enregistrées.', life: 3000})
  }
}
</script>

<template>
  <div
      v-if="isAuthenticated && user?.role === 'ADMIN'"
      class="mx-auto rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-10 mt-10">
    <div>
      <h3 class="text-2xl font-extrabold text-gray-800 dark:text-white mb-6 tracking-tight">
        Adhérents du club
      </h3>
    </div>
    <CTable v-if="fetchUsers" :items="fetchUsers" :columns="columns">
      <template #item-birthDate="{ data }">
        {{ new Date(data.birthDate).toLocaleDateString('fr-FR') }}
      </template>
      <template #item-role="{data}">
        <CFormField
            :default-value="data.role === Role.ADMIN" type="checkbox"
            @update:model-value="(value: boolean) => onEditUserRole(data, value)"
        />
      </template>
      <template #item-actions="{ item }">
        <CDropdownMenu :menu-items="getItems(item)" menu-icon="i-lucide-ellipsis-vertical"/>
      </template>
    </CTable>
  </div>

  <CModal
      v-model:open="editModal"
      title="Éditer les informations"
  >
    <template #content>
      <UserForm :user="selectedUser" @submitted="(submittedUser) => onSubmit(submittedUser)"/>
    </template>
  </CModal>

  <CModal
      v-model:open="modal"
      :title="`Supprimer ${ selectedUser.firstName } ${selectedUser.lastName}`"
      description="Êtes-vous sûr.e de vouloir continuer ?"
  >
    <template #footer>
      <UButton color="neutral" variant="outline" @click="modal=false">
        Annuler
      </UButton>
      <UButton color="error" @click="deleteUser(selectedUser)">
        Supprimer
      </UButton>
    </template>
  </CModal>
</template>

<style scoped>

</style>