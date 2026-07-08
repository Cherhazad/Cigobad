<script setup lang="ts">
import type {MenuItem} from "primevue/menuitem";

const menu = ref();

defineProps({
  menuItems: {
    type: Array as PropType<MenuItem[]>,
    required: true,
  },
  menuIcon: {
    type: String,
    default: ''
  },
  menuLabel: {
    type: String,
    default: ''
  }
})

const toggle = (event: MouseEvent): void => {
  menu.value.toggle(event);
};
</script>

<template>
  <div class="flex justify-center">
    <Menu ref="menu" :model="menuItems" popup class="w-40"/>
    <Button
        type="button" class="min-w-fit" :icon="menuIcon" variant="outlined" severity="secondary"
        @click="toggle">
      {{ menuLabel }}
      <icon :name="menuIcon"/>
    </Button>
  </div>
</template>

<style scoped>

</style>