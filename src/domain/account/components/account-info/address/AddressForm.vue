<template>
  <form class="address-form" @submit.prevent="handleSubmit">
    <label for="address">Dirección</label>
    <input
      id="address"
      v-model="address"
      type="text"
      placeholder="Escribe tu dirección..."
      required
      class="address-input"
    />
    <div class="form-actions">
      <BaseAccountButton type="submit">Guardar</BaseAccountButton>
      <BaseAccountButton type="button" @click="$emit('cancel')">Cancelar</BaseAccountButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseAccountButton } from '@/shared/components/ui/actions/buttons'
import { useAddressStore } from '@/domain/account/store/useAddressStore'

const emit = defineEmits(['saved', 'cancel'])
const address = ref('')
const addressStore = useAddressStore()

function handleSubmit() {
  addressStore.setAddress(address.value)
  emit('saved')
}
</script>

<style scoped>
.address-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 1.5rem;
  max-width: 400px;
}
.address-input {
  padding: 0.7rem 1rem;
  border-radius: 0.4rem;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
}
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
</style>
