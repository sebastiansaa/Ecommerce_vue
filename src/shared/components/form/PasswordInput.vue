<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <div style="position: relative; display: flex; align-items: center">
      <input
        :id="id"
        :type="isVisible ? 'text' : 'password'"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :required="required"
        :disabled="disabled"
        :placeholder="placeholder"
        style="width: 100%; padding-right: 3rem"
      />
      <PasswordToggleButton :is-visible="isVisible" :toggle-visibility="toggleVisibility" />
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { PasswordToggleButton } from '@/shared/components/form'

defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: String, required: true },
  error: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '••••••••' },
  isVisible: { type: Boolean, required: true },
  toggleVisibility: { type: Function as PropType<() => void>, required: true },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
}

.form-group input {
  padding: 0.85rem 1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.error-message {
  color: #e53e3e;
  font-size: 0.9rem;
  margin: 0;
}
</style>
