<script setup lang="ts">
import {Pencil, Times} from "@primeicons/vue";
import {Level, type SessionDto, type UserDto} from "shared";
import type {MenuItem} from "primevue/menuitem";
import {useToast} from "primevue/usetoast";
import {formatLevel} from "~~/utils/formatLevel";

const config = useRuntimeConfig()
const api = config.public.apiBase
const toast = useToast()

const deleteModal = ref(false)
const formModal = ref(false)
const sessionSubsModal = ref(false)
const sessionAttendeesModal = ref(false)
const sessions = ref<SessionDto[] | undefined>([])
const selectedSession = ref<SessionDto | undefined>()
const users = ref<{ label: string, value: UserDto }[]>([])
const attendeeRef = ref<UserDto>()

const {data: fetchSessions, refresh} = await useFetch<SessionDto[]>(`${api}/session`, {
  method: 'GET',
})

const {data: fetchUsers} = await useFetch<UserDto[]>(`${api}/user`, {
  method: 'GET',
})

onMounted(async () => {
  sessions.value = fetchSessions.value
  if (fetchUsers.value && fetchUsers.value.length > 0) {
    users.value = fetchUsers.value.map((user: UserDto) => {
      return {
        label: user.lastName.toUpperCase() + ' ' + user.firstName,
        value: user
      }
    })
  }
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

const onParticipateSession = async (session: SessionDto, attendee: { label: string; value: UserDto }) => {
  const data = await $fetch(`${api}/session/${session.id}`, {
    method: 'PATCH',
    body: {
      id: session.id,
      attendees: [attendee.value]
    },
    onResponseError({response}) {
      toast.add({
        severity: 'error',
        summary: "Erreur lors de l'inscription",
        detail: response._data?.message,
        life: 3000
      })
    }
  })
  if (data) {
    toast.add({
      severity: 'success',
      summary: 'Inscription',
      detail: 'Votre inscription a bien été enregistrée.',
      life: 3000
    })
    sessionSubsModal.value = false
    attendeeRef.value = undefined
    await refresh()
  }
}

const onDeleteSession = async (session: SessionDto) => {
  const data = await $fetch(`${api}/session/${session?.id}`, {
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
    toast.add({severity: 'success', summary: 'Suppression', detail: 'Session supprimée avec succès.', life: 3000})
    selectedSession.value = undefined
  }
  deleteModal.value = false
  await refresh()
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
  deleteModal.value = true
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

const onParticipate = (session: SessionDto) => {
  selectedSession.value = session
  sessionSubsModal.value = true
}

const getAvailableUsers = (session: SessionDto) => {
  if (!session?.attendees?.length) return users.value

  const attendeeIds = session.attendees.map((a) => a.id)
  return users.value.filter((user) => !attendeeIds.includes(user.value.id))
}

const getLevelColor = (level: Level) => {
  switch (level) {
    case Level.Debutant:
      return 'info'
    case Level.Intermediaire:
      return 'warn'
    case Level.Confirme:
      return 'danger'
    default:
      return 'secondary'
  }
}

const columns = [
  {
    field: 'firstName',
    header: 'Prénom',
  },
  {
    field: 'lastName',
    header: 'Nom'
  }
]

const onSeeAttendees = (session: SessionDto) => {
  selectedSession.value = session
  sessionAttendeesModal.value = true
}
</script>

<template>
  <div class="flex flex-col items-center mt-2">
    <h1 class="text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-6 tracking-tight">
      SESSIONS DE BADMINTON
    </h1>
    <Card v-for="item in sessions" :key="item.id" class="w-3/5 overflow-hidden mt-4">

      <template #header>
        <div class="flex justify-end gap-2 m-4">
          <Button v-if="sessions?.indexOf(item) === 0" severity="secondary" @click="onOpenCreateModal">
            Créer
          </Button>
          <CDropdownMenu :menu-items="getItems(item)" menu-icon="i-lucide-ellipsis-vertical"/>
        </div>
      </template>

      <template #title>
        <div class="flex gap-4 items-end">
          <span class="font-bold text-5xl">{{ item?.name }} </span>
        </div>

      </template>

      <template #subtitle>
        <div class="flex items-center gap-2">
          <Tag :severity="getLevelColor(item.level)" :value="`Niveau ${formatLevel(item.level).toLowerCase()}`"/>
        </div>
      </template>

      <template #content>
        <div class="space-y-2 flex flex-col">
          <div v-if="item.date" class="flex items-center gap-2">
            <UIcon name="i-lucide-calendar"/>
            <span class="font-bold text-xl">{{
                new Date(item.date).toLocaleDateString('fr-FR')
              }}</span>
          </div>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-clock"/>
            <span class="font-bold text-xl"> {{
                item?.hours
              }}</span>
          </div>
          <div class="flex items-center gap-2 sm:flex-wrap">
            <span><b>Nombre d'inscrits: </b> {{ item.attendees.length }}/36</span>
            <Button
                v-tooltip="'Voir les participants'"
                icon="pi pi-eye"
                severity="secondary"
                @click="onSeeAttendees(item)"/>
            <Tag
                :severity="`${item.attendees.length >= 36 ? 'danger' : 'success'}`"
                :value="`${item.attendees.length >= 36 ? 'Complet' : 'Disponible'}`"
            />
          </div>
          <div class="flex items-center gap-2">
            <span><b>Gymnase ouvert par: </b> {{ item?.openedBy }}</span>
            <Button class="ml-auto" @click="onParticipate(item)">
              Participer
            </Button>
          </div>

        </div>
      </template>
    </Card>

    <Card
        v-if="sessions?.length === 0"
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
  >
    <template #content>
      <SessionForm :session="selectedSession" @submitted="onSubmit"/>
    </template>
  </CModal>

  <CModal
      v-model:open="deleteModal"
      title="Supprimer la session"
      description="Êtes-vous sûr.e de vouloir continuer ?"
  >
    <template #footer>
      <Button @click="deleteModal=false">
        Annuler
      </Button>
      <Button severity="danger" @click="onDeleteSession(selectedSession)">
        Supprimer
      </Button>
    </template>
  </CModal>

  <CModal
      v-model:open="sessionSubsModal"
      :title="`S'inscrire ${selectedSession?.name} ${selectedSession?.date ? new Date(selectedSession.date).toLocaleDateString('fr-FR') : ''} à ${selectedSession?.hours} ?`"
      description="Vous êtes sur le point de vous inscrire 🏸"
  >
    <template #content>
      <CFormField
          v-model="attendeeRef"
          label="Adhérents"
          type="select"
          :items="getAvailableUsers(selectedSession)"
      />
    </template>
    <template #footer>
      <Button @click="onParticipateSession(selectedSession, attendeeRef)">
        Confirmer
      </Button>
    </template>
  </CModal>

  <CModal
      v-model:open="sessionAttendeesModal"
      title="Liste des membres inscrits"
  >
    <template #content>
      <CTable
          :items="selectedSession.attendees"
          :columns="columns"
      />
    </template>
  </CModal>

</template>

<style scoped>
@reference "tailwindcss";

.empty-card {
  @apply w-full max-w-md mx-auto shadow-md rounded-xl mt-4
}

</style>