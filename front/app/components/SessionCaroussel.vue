<script setup lang="ts">
import {Pencil, Times} from "@primeicons/vue";
import type {Level, SessionDto} from "shared";
import type {MenuItem} from "primevue/menuitem";
import {useToast} from "primevue/usetoast";

const config = useRuntimeConfig()
const api = config.public.apiBase
const toast = useToast()

const modal = ref(false)
const formModal = ref(false)
const sessions = ref<SessionDto[] | undefined>([])
const selectedSession = ref<SessionDto>()

const {data: fetchSessions, refresh} = await useFetch<SessionDto[]>(`${api}/session`, {
  method: 'GET',
})

onMounted(async () => {
  sessions.value = fetchSessions.value
})

watch(fetchSessions, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    sessions.value = newValue
  }
})

const onOpenEditModal = (session: SessionDto) => {
  selectedSession.value = session
  formModal.value = true
}

const onOpenCreateModal = () => {
  selectedSession.value = undefined
  formModal.value = true
}

const onCreateSession = async (session: SessionDto) => {
  const data = await $fetch(`${api}/session`, {
    method: 'POST',
    body: session,
    onResponseError({response}) {
      toast.add({severity: 'error', summary: 'Erreur lors de la création', detail: response._data?.message, life: 3000})
    }
  })
  if (data) {
    toast.add({
      severity: 'success',
      summary: "Création d'une session",
      detail: 'Session créée avec succès.',
      life: 3000
    })
  }
}

const onEditSession = async (session: SessionDto) => {
  const data = await $fetch(`${api}/session/${session.id}`, {
    method: 'PATCH',
    body: session,
    onResponseError({response}) {
      toast.add({severity: 'error', summary: "'Erreur lors de l'édition", detail: response._data?.message, life: 3000})
    }
  })
  if (data) {
    toast.add({severity: 'success', summary: 'Modifications', detail: 'Modifications enregistrées.', life: 3000})
  }
}

const onDeleteSession = async (session: SessionDto) => {
  const data = await $fetch(`${api}/session/${session.id}`, {
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
    toast.add({severity: 'success', summary: 'Suppression', detail: 'Session supprimée avec succès.', life: 3000})
    selectedSession.value = undefined
  }
  modal.value = false
  refresh()
}

const onSubmit = async (session: SessionDto) => {
  if (session.id) {
    await onEditSession(session)
    await refresh()
    formModal.value = false
  } else {
    await onCreateSession(session)
    await refresh()
    formModal.value = false
  }
}

const confirmModal = (session: SessionDto) => {
  selectedSession.value = session
  modal.value = true
}

const getItems = (session: SessionDto): MenuItem[] => [
  {
    label: 'Éditer',
    icon: Pencil,
    command: () => onOpenEditModal(session),
  },
  {separator: true},
  {
    label: 'Supprimer',
    icon: Times,
    class: 'text-red-500! dark:text-red-400!',
    command: () => confirmModal(session),
  },
]

const levelLabels = (level: Level) => {
  switch (level) {
    case 'Confirme':
      return 'confirmé';
    case 'Debutant':
      return 'débutant';
    case 'Intermediaire':
      return 'intermédiaire';
  }
}
</script>

<template>
  <div class="flex flex-col items-center">
    <Card v-for="item in sessions" :key="item.id" class="w-3/5 overflow-hidden mt-4">

      <template #header>
        <div class="flex justify-end gap-2 m-4">
          <Button v-if="sessions.indexOf(item) === 0" severity="secondary" @click="formModal = true">
            Créer
          </Button>
          <CDropdownMenu :menu-items="getItems(item)" menu-icon="i-lucide-ellipsis-vertical"/>
        </div>
      </template>

      <template #title>
        <span class="font-bold text-5xl">{{ item?.name }}</span>
      </template>

      <template #subtitle>
        <div class="flex items-center gap-2">
          <Tag severity="info" :value="`Niveau ${levelLabels(item?.level)}`"/>
          <Tag severity="success" value="Disponible"/>
        </div>
      </template>

      <template #content>
        <div class="space-y-4">
          <span class="font-bold text-xl">{{ item?.hours }}</span>
          <div class="flex items-center gap-2">
            <span><b>Nombre d'inscrits: </b> 23/36</span>
          </div>
          <div class="flex items-center gap-2">
            <span><b>Gymnase ouvert par: </b> {{ item?.openedBy }}</span>
            <Button class="ml-auto">
              Participer
            </Button>
          </div>

        </div>
      </template>
    </Card>

    <Card
        v-if="sessions.length === 0"
        class="empty-card">
      <template #header>
        <div class="flex flex-col items-center gap-3 pt-8 px-6">
          <div class="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800">
            <i class="pi pi-folder-open text-3xl text-gray-400"/>
          </div>
          <span class="text-xl font-bold text-gray-800 dark:text-gray-100">
        No projects found
      </span>
        </div>
      </template>

      <template #subtitle>
        <p class="text-center text-sm text-gray-500 dark:text-gray-400 px-6">
          It looks like you haven't added any projects yet. Create one to get started.
        </p>
      </template>

      <template #footer>
        <div class="flex justify-center gap-3 pb-6 px-6">
          <Button icon="pi pi-plus" label="Create new" @click="onOpenCreateModal"/>
          <Button icon="pi pi-refresh" label="Refresh" severity="secondary" @click="refresh()"/>
        </div>
      </template>
    </Card>
  </div>

  <CModal
      v-model:open="formModal"
      :title="selectedSession ? 'Éditer une session' : 'Créer une session'"
      :dismissible="false"
  >
    <template #content>
      <SessionForm :session="selectedSession" @submitted="onSubmit"/>
    </template>
  </CModal>

  <CModal
      v-model:open="modal"
      title="Supprimer la session"
      description="Êtes-vous sûr.e de vouloir continuer ?"
  >
    <template #footer>
      <Button @click="modal=false">
        Annuler
      </Button>
      <Button severity="danger" @click="onDeleteSession(selectedSession)">
        Supprimer
      </Button>
    </template>
  </CModal>

</template>

<style scoped>
@reference "tailwindcss";

.empty-card {
  @apply w-full max-w-md mx-auto shadow-md rounded-xl mt-4
}

</style>