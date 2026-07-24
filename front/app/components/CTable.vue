<script setup lang="ts">

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array as PropType<{ field: string, header: string }[]>,
    required: true,
  },
  rowClass: {
    type: String,
    default: 'dark:border dark: border-gray-300',
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
      resizable-columns
      :value="items"
      data-key="id"
      class="club-table"
  >
    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
      <template #body="{data}">
        <slot :name="`item-${col.field}`" :data="data">
          {{ data[col.field] }}
        </slot>
      </template>
    </Column>
    <Column v-if="$slots['item-actions']" header="Actions">
      <template #body="{ data }">
        <div class="flex justify-center">
          <slot name="item-actions" :item="data"/>
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped>

html.dark .club-table {
  --p-datatable-body-cell-border-color: rgb(75 85 99);
}
</style>