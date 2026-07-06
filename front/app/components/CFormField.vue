<script setup lang="ts">

import {FieldTypes} from "shared";

defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: FieldTypes,
    required: true
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
        @update:model-value="emit('update:modelValue', $event)"
    />

    <UInput
        v-if="type === FieldTypes.email"
        v-model="model"
        type="email"
        v-bind="$attrs"
        @update:model-value="emit('update:modelValue', $event)"
    />

    <UInput
        v-if="type === FieldTypes.date"
        v-model="model"
        type="date"
        v-bind="$attrs"
        @update:model-value="emit('update:modelValue', $event)"
    />

    <UInput
        v-if="type === FieldTypes.tel"
        v-model="model"
        type="tel"
        v-bind="$attrs"
        @update:model-value="emit('update:modelValue', $event)"
    />

    <USelectMenu
        v-if="type === FieldTypes.select"
        v-model="model"
        v-bind="$attrs"
        @update:model-value="emit('update:modelValue', $event)"
    />

    <USelectMenu
        v-if="type === FieldTypes['select-multiple']"
        v-model="model"
        v-bind="$attrs"
        multiple
        @update:model-value="emit('update:modelValue', $event)"
    />

    <UTextarea
        v-if="type === FieldTypes.textarea"
        v-model="model"
        v-bind="$attrs"
    />

    <UCheckbox
        v-if="type === FieldTypes.checkbox"
        v-model="model"
        v-bind="$attrs"
    />

    <UInputNumber
        v-if="type === FieldTypes.number"
        v-model="model"
        v-bind="$attrs"
    />

  </UFormField>
</template>

<style scoped>

</style>