<template>
  <MenuDesktop
    v-if="!isMobile"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  />
  <MenuMobile
    v-else
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useBreakpoints } from '@/shared/composables'
import MenuDesktop from './MenuDesktop.vue'
import MenuMobile from './MenuMobile.vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])

const { isMobile } = useBreakpoints()
</script>
