<script setup lang="ts">
import {Pencil, Times} from "@primeicons/vue";
import type {Level} from "shared";

const config = useRuntimeConfig()
const api = config.public.apiBase

const sidePanel = ref(false)

/*const {data: fetchSessions, refresh} = await useFetch<UserDto[]>(`${api}/user`, {
  method: 'GET',
})*/

/*onMounted(async () => {
  users.value = fetchUsers.value
})*/

const onEditSession = () => {
  /*selectedUser.value = {...session}*/
  sidePanel.value = true
}

const onSubmitted = async () => {
  /*refresh()*/
  /*toast.add({severity: 'success', summary: 'Modifications', detail: 'Modifications enregistrées', life: 3000});*/
  sidePanel.value = false
}

const items = [
  {
    label: 'Éditer',
    icon: Pencil,
    command: () => onEditSession(),
  },
  {separator: true},
  {
    label: 'Supprimer',
    icon: Times,
    class: 'text-red-500! dark:text-red-400!',
    command: () => console.log('I delete the event'),
  },
]

const levels = (level: Level) => {
  switch (level) {
    case 'Confirme':
      return 'Niveau confirmé';
    case 'Debutant':
      return 'Niveau débutant';
    case 'Intermediaire':
      return 'Niveau intermédiaire';
  }
}
</script>

<template>
  <div class="flex justify-center">
    <Card class="w-3/5 overflow-hidden mt-4">

      <template #header>
        <div class="flex justify-end gap-2 m-4">
          <Button>
            M'inscrire
          </Button>
          <CDropdownMenu :menu-items="items" menu-icon="i-lucide-ellipsis-vertical"/>
        </div>
      </template>

      <template #title>
        <span class="font-bold text-5xl">Mardi</span>
      </template>

      <template #subtitle>
        <div class="flex items-center gap-2">
          <Tag severity="info" value="Niveau confirmé"/>
          <Tag severity="success" value="Disponible"/>
        </div>
      </template>

      <template #content>
        <div class="space-y-4">
          <span class="font-bold text-xl">20:15 - 23:00</span>
          <div class="flex items-center gap-2">
            <span><b>Nombre d'inscrits: </b> 23/36</span>
          </div>
          <div class="flex items-center gap-2">
            <span><b>Gymnase ouvert par: </b> Romain</span>
          </div>
        </div>
      </template>
    </Card>
  </div>

  <USlideover
      v-model:open="sidePanel"
      title="Éditer les informations"
  >
    <template #body>
      <SessionForm @submitted="onSubmitted()"/>
    </template>
  </USlideover>

</template>

<style scoped>

</style>