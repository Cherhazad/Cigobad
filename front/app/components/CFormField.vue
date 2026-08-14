<script setup lang="ts">

import {FieldTypes} from "shared";
import type {MenuItem} from "primevue/menuitem";
import {calendarDateToDate, dateToCalendarDate} from "~~/utils/date";
import {type CalendarDate, DateFormatter} from "@internationalized/date";

defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: FieldTypes,
    required: true
  },
  items: {
    type: Array as PropType<MenuItem[]>,
    default: () => []
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const dateModel = computed({
  get() {
    return model.value ? dateToCalendarDate(model.value) : undefined
  },
  set(value: CalendarDate | undefined) {
    model.value = value ? calendarDateToDate(value) : undefined
  }
})

const df = new DateFormatter('fr-FR', {
  dateStyle: 'medium'
})

const model = defineModel()
</script>

<template>
  <UFormField :label="label" v-bind="$attrs">
    <UInput
        v-if="type === FieldTypes.string"
        v-model="model"
        v-bind="$attrs"
        type="string"
        class="w-full"
        :placeholder="placeholder"
    />

    <UInput
        v-if="type === FieldTypes.email"
        v-model="model"
        type="email"
        v-bind="$attrs"
        class="w-full"
        :placeholder="placeholder"
    />

    <UPopover v-if="type === FieldTypes.date">
      <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
        {{ dateModel ? df.format(calendarDateToDate(dateModel)) : 'Sélectionner une date' }}
      </UButton>
      <template #content>
        <UCalendar
            v-model="dateModel"
            class="w-full"
            :week-starts-on="1"
            locale="fr"
        />
      </template>
    </UPopover>

    <UInput
        v-if="type === FieldTypes.tel"
        v-model="model"
        type="tel"
        v-bind="$attrs"
        class="w-full"
        :placeholder="placeholder"
    />

    <UInput
        v-if="type === FieldTypes.password"
        v-model="model"
        type="password"
        v-bind="$attrs"
        class="w-full"
        :placeholder="placeholder"
    />

    <USelectMenu
        v-if="type === FieldTypes.select"
        v-model="model"
        v-bind="$attrs"
        class="w-full"
        :items="items"
        clear
    />

    <USelectMenu
        v-if="type === FieldTypes['select-multiple']"
        v-model="model"
        v-bind="$attrs"
        multiple
        :items="items"
        class="w-full"
        clear
    />

    <UTextarea
        v-if="type === FieldTypes.textarea"
        v-model="model"
        v-bind="$attrs"
        :placeholder="placeholder"
        class="w-full"
    />

    <UCheckbox
        v-if="type === FieldTypes.checkbox"
        v-model="model"
        v-bind="$attrs"
        class="w-full"
    />

    <UInputNumber
        v-if="type === FieldTypes.number"
        v-model="model"
        :placeholder="placeholder"
        v-bind="$attrs"
        class="w-full"
    />

  </UFormField>
</template>

<style scoped>

</style>