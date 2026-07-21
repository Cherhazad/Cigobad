<script setup lang="ts">

import {FieldTypes} from "shared";
import type {MenuItem} from "primevue/menuitem";

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
const model = defineModel()
const emit = defineEmits(["update:modelValue"])

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
        @update:model-value="emit('update:modelValue', $event)"
    />

    <UInput
        v-if="type === FieldTypes.email"
        v-model="model"
        type="email"
        v-bind="$attrs"
        class="w-full"
        :placeholder="placeholder"
        @update:model-value="emit('update:modelValue', $event)"
    />

    <DatePicker
        v-if="type === FieldTypes.date"
        v-model="model"
        :placeholder="placeholder"
        class="w-full"
        date-format="dd-mm-yy"
        append-to="body"
        @update:model-value="emit('update:modelValue', $event)"
    />

    <UInput
        v-if="type === FieldTypes.tel"
        v-model="model"
        type="tel"
        v-bind="$attrs"
        class="w-full"
        :placeholder="placeholder"
        @update:model-value="emit('update:modelValue', $event)"
    />

    <USelectMenu
        v-if="type === FieldTypes.select"
        v-model="model"
        v-bind="$attrs"
        class="w-full"
        :items="items"
        @update:model-value="emit('update:modelValue', $event)"
    />

    <USelectMenu
        v-if="type === FieldTypes['select-multiple']"
        v-model="model"
        v-bind="$attrs"
        multiple
        :items="items"
        class="w-full"
        @update:model-value="emit('update:modelValue', $event)"
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
        @update:model-value="emit('update:modelValue', $event)"
    />

    <UInputNumber
        v-if="type === FieldTypes.number"
        v-model="model"
        :placeholder="placeholder"
        v-bind="$attrs"
        class="w-full"
        @update:model-value="emit('update:modelValue', $event)"
    />

  </UFormField>
</template>

<style scoped>

</style>