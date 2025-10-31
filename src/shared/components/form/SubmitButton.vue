<template>
  <button type="submit" class="btn-submit" :disabled="disabled">
    {{ loading ? loadingText : text }}
  </button>
</template>

<script setup lang="ts">
defineProps({
  text: { type: String, required: true },
  loadingText: { type: String, default: 'Cargando...' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
})
</script>

<style scoped>
.btn-submit {
  padding: 0.95rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  margin-top: 0.5rem;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-submit:active:not(:disabled) {
  transform: translateY(0);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
