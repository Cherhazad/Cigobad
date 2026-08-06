<script setup lang="ts">
import {Level, type SessionDto, type UserDto} from "shared";
import {useToast} from "primevue/usetoast";
import {formatLevel} from "~~/utils/formatLevel";
import type {DropdownMenuItem} from "#ui/components/DropdownMenu.vue";
import {useAuthStore} from "~/stores/useAuthStore.ts";

const config = useRuntimeConfig()
const api = config.public.apiBase
const toast = useToast()
const auth = useAuthStore()
const {user} = storeToRefs(auth)

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

const {data: authenticatedUser} = await useFetch<UserDto>(`${api}/user/${user.value?.sub}`, {
  method: 'GET',
})

onMounted(async () => {
  sessions.value = fetchSessions.value
  if (fetchUsers.value && fetchUsers.value.length > 0) {
    users.value = fetchUsers.value.map((user: UserDto) => {
      return {
        label: user?.lastName?.toUpperCase() + ' ' + user?.firstName,
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

const onParticipateSession = async (session: SessionDto, user: UserDto) => {
  const data = await $fetch(`${api}/session/${session.id}`, {
    method: 'PATCH',
    body: {
      id: session.id,
      attendees: [user]
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

const onUnsubscribe = async (session: SessionDto, user: UserDto) => {
  const data = await $fetch(`${api}/session/${session.id}/attendee/${user.id}`, {
    method: 'PATCH',
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
      summary: 'Désinscription',
      detail: 'Votre inscription a bien été retirée.',
      life: 3000
    })
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

const getItems = (session: SessionDto): DropdownMenuItem[] => [
  {
    label: 'Éditer',
    icon: 'i-lucide-edit',
    onSelect: () => onOpenEditModal(session),
  },
  {separator: true},
  {
    label: 'Supprimer',
    icon: 'i-lucide-delete',
    class: 'text-red-500! dark:text-red-400!',
    onSelect: () => confirmModal(session),
  },
]

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

const isParticipating = (attendees: UserDto[], user?: UserDto | null) => {
  if (!user) return false
  return attendees.some((a) => a.id === user.id)
}
</script>

<template>
  <div class="flex justify-center sm:mt-2 sm:py-12 sm:px-4">
    <UCard class="sm:w-4/5 w-full h-screen sm:h-4/5 items-center">
      <template #title>
        <span class="font-bold sm:text-4xl text-xl">SESSIONS DE BADMINTON</span>
      </template>

      <template #description>
        Voir toutes les sessions disponibles ici.
      </template>

      <div class="flex justify-end mb-2">
        <UButton
            v-tooltip="'Créer une nouvelle session'"
            icon="i-lucide-plus"
            color="neutral"
            variant="outline"
            @click="onOpenCreateModal">
          Nouvelle session
        </UButton>
      </div>

      <UCarousel
          v-slot="{item}"
          :items="sessions"
          dots
          arrows
          class="sm:mx-20 py-2 px-2 sm:px-6"
          :ui="{
                item: 'flex justify-center py-2 sm:p-10',
                dots: 'pb-4 sm:pb-6',
              }"
      >
        <UCard v-bind="item" :key="item.id" class="w-full max-w-xl mx-3 sm:mx-auto shadow-md rounded-2xl">
          <template #header>
            <div class="flex gap-2 sm:mt-4 mr-0 lg:mr-4">
              <div class="flex flex-col gap-2">
                <span class="text-xl md:text-4xl font-bold mr-auto">{{ item?.name }}</span>
                <Tag
                    :severity="getLevelColor(item.level)"
                    :value="`Niveau ${formatLevel(item.level).toLowerCase()}`"/>
              </div>
              <div class="ml-auto">
                <CDropdownMenu :menu-items="getItems(item)" menu-icon="i-lucide-ellipsis-vertical"/>
              </div>
            </div>
          </template>

          <template #default>
            <div class="space-y-1 sm:space-y-3 flex flex-col">
              <div class="mb-2">
                <Tag
                    :severity="`${item.attendees.length >= 36 ? 'danger' : 'success'}`"
                    :value="`${item.attendees.length >= 36 ? 'COMPLET' : 'DISPONIBLE'}`"
                />
              </div>
              <div v-if="item.date" class="flex items-center gap-2">
                <UIcon name="i-lucide-calendar"/>
                <span class="font-bold text-base sm:text-xl">{{
                    new Date(item.date).toLocaleDateString('fr-FR')
                  }}</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-clock"/>
                <span class="font-bold text-base sm:text-xl"> {{
                    item?.hours
                  }}</span>
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                <div class="flex items-center gap-2">
                  <span><b>Participants: </b> {{ item.attendees.length }}/36</span>
                  <UButton
                      v-if="item.attendees.length"
                      v-tooltip="'Voir les participants'"
                      icon="i-lucide-eye"
                      color="neutral"
                      variant="outline"
                      @click="onSeeAttendees(item)"/>
                </div>
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                <span><b>Ouverture par: </b> {{ item?.openedBy }}</span>
                <UButton
                    :color="isParticipating(item.attendees, authenticatedUser) ? 'error' : 'neutral'"
                    class="sm:ml-auto w-full sm:w-auto justify-center"
                    @click="isParticipating(item.attendees, authenticatedUser) ? onUnsubscribe(item, authenticatedUser) : onParticipateSession(item, authenticatedUser)"
                >
                  {{ isParticipating(item.attendees, authenticatedUser) ? 'Me désinscrire' : 'Participer' }}
                </UButton>
              </div>

            </div>
          </template>
        </UCard>
      </UCarousel>

      <UCard
          v-if="sessions?.length === 0"
          class="w-full max-w-xl mx-4">
        <template #header>
          <div class="flex flex-col items-center gap-3 pt-8 px-6">
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800">
              <i class="pi pi-folder-open text-3xl text-gray-400"/>
            </div>
            <span class="text-xl font-bold ">
        Il semblerait que vous n'ayez pas de session d'organisée. Créez-en une pour commencer.
      </span>
          </div>
        </template>

        <template #footer>
          <div class="flex justify-center gap-3 pb-6 px-6">
            <UButton icon="i-lucide-plus" label="Create new" color="neutral" @click="onOpenCreateModal"/>
            <UButton icon="i-lucide-reload" label="Refresh" color="neutral" @click="refresh()"/>
          </div>
        </template>
      </UCard>
    </UCard>
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
      <UButton color="neutral" variant="outline" @click="deleteModal=false">
        Annuler
      </UButton>
      <UButton color="error" @click="onDeleteSession(selectedSession)">
        Supprimer
      </UButton>
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

</style>