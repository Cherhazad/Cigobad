<script setup lang="ts">

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array as PropType<{ field: string, header: string }[]>,
    required: true,
  }
})

const editingRows = ref()

watch(props.items, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    editingRows.value = newVal
  }
})

</script>

<template>
  <DataTable
      :value="items" table-style="min-width: 50rem" data-key="id">
    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
      <template #body="{data}">
        <slot :name="`item-${col.field}`" :data="data">
          {{ data[col.field] }}
        </slot>
      </template>
    </Column>
    <Column header="Actions">
      <template #body="{ data }">
        <div class="flex justify-center">
          <slot name="item-actions" :item="data"/>
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>

</style>