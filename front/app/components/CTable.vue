<script setup lang="ts" generic="T extends Record<string, any>">
import {h, resolveComponent} from 'vue'
import {upperFirst} from 'scule'
import type {TableColumn} from '@nuxt/ui'

const UButton = resolveComponent('UButton')
const UCheckbox = resolveComponent('UCheckbox')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const props = defineProps<{
  data: T[]
  columns: TableColumn<T>[]
  selectable?: boolean
  filterable?: string
  showActions?: boolean
}>()

const slots = defineSlots<{
  'item-actions'(props: { row: T }): any
  [key: string]: (props: any) => any
}>()

const emit = defineEmits<{
  'update:selected': [rows: T[]]
}>()

const table = useTemplateRef('table')

const baseColumns = computed<TableColumn<T>[]>(() => {
  const cols: TableColumn<T>[] = []

  if (props.selectable) {
    cols.push({
      id: 'select',
      header: ({table}) => h(UCheckbox, {
        'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => {
          table.toggleAllPageRowsSelected(!!value)
          emit('update:selected', table.getSelectedRowModel().rows.map(r => r.original))
        },
        'aria-label': 'Select all'
      }),
      cell: ({row}) => h(UCheckbox, {
        'modelValue': row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => {
          row.toggleSelected(!!value)
          emit('update:selected', table.value?.tableApi?.getSelectedRowModel().rows.map(r => r.original) ?? [])
        },
        'aria-label': 'Select row'
      }),
      enableSorting: false,
      enableHiding: false
    })
  }

  cols.push(...props.columns)

  /*  if (props.showActions && slots['item-actions']) {
      cols.push({
        id: 'actions',
        enableHiding: false,
        meta: {class: {td: 'text-right'}},
        cell: ({row}) => h(UDropdownMenu, {
          content: {align: 'end'},
          'aria-label': 'Actions dropdown'
        }, {
          default: () => h(UButton, {
            icon: 'i-lucide-ellipsis-vertical',
            color: 'neutral',
            variant: 'ghost',
            'aria-label': 'Actions dropdown'
          }),
          // on passe le slot item-actions comme contenu du dropdown
          content: () => slots['item-actions']?.({row: row.original})
        })
      })
    }*/

  if (props.showActions && slots['item-actions']) {
    cols.push({
      id: 'actions',
      enableHiding: false,
      meta: {class: {td: 'text-right'}},
      cell: ({row}) => {
        return h(
            resolveComponent('UDropdownMenu'),
            {
              content: {align: 'end'},
              'aria-label': 'Actions dropdown'
            },
            {
              default: () => slots['item-actions']?.({row: row.original}),
              trigger: () => h(UButton, {
                icon: 'i-lucide-ellipsis-vertical',
                color: 'neutral',
                variant: 'ghost',
                'aria-label': 'Actions dropdown'
              })
            }
        )
      }
    })
  }

  return cols
})
</script>

<template>
  <div class="flex-1 divide-y divide-accented w-full">
    <div class="flex items-center gap-2 px-4 py-3.5 overflow-x-auto">
      <UInput
          v-if="filterable"
          :model-value="(table?.tableApi?.getColumn(filterable)?.getFilterValue() as string)"
          class="max-w-sm min-w-[12ch]"
          :placeholder="`Filter ${filterable}...`"
          @update:model-value="table?.tableApi?.getColumn(filterable)?.setFilterValue($event)"
      />

      <UDropdownMenu
          :items="table?.tableApi?.getAllColumns().filter(column => column.getCanHide()).map(column => ({
          label: upperFirst(column.id),
          type: 'checkbox' as const,
          checked: column.getIsVisible(),
          onUpdateChecked(checked: boolean) {
            table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
          },
          onSelect(e: Event) {
            e.preventDefault()
          }
        }))"
          :content="{ align: 'end' }"
      >
        <UButton
            label="Columns"
            color="neutral"
            variant="outline"
            trailing-icon="i-lucide-chevron-down"
            class="ml-auto"
            aria-label="Columns select dropdown"
        />
      </UDropdownMenu>

      <slot name="toolbar"/>
    </div>

    <UTable
        ref="table"
        :data="data"
        :columns="baseColumns"
        sticky
        class="h-96"
    >
      <template v-for="(_, name) in slots" #[name]="slotProps">
        <slot v-if="name !== 'item-actions' && name !== 'toolbar'" :name="name" v-bind="slotProps"/>
      </template>
    </UTable>

    <div v-if="selectable" class="px-4 py-3.5 text-sm text-muted">
      {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
      {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
    </div>
  </div>
</template>

<style scoped>

</style>