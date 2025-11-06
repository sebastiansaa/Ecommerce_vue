<template>
  <div class="addresses-container">
    <h2 class="section-title">Direcciones</h2>
    <p class="section-description">Administra tus direcciones de envío</p>
    <div class="addresses-content">
      <template v-if="addressStore.address">
        <div class="address-view">
          <p><strong>Dirección guardada:</strong> {{ addressStore.address }}</p>
          <BaseAccountButton @click="showForm = true">Editar dirección</BaseAccountButton>
        </div>
      </template>
      <template v-else>
        <BaseAccountButton @click="showForm = true">Agregar dirección</BaseAccountButton>
      </template>
      <AddressForm v-if="showForm" @saved="handleSaved" @cancel="showForm = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseAccountButton } from '@/shared/components/ui/actions/buttons'
import AddressForm from './AddressForm.vue'
import { useAddressStore } from '@/domain/account/store/useAddressStore'

const showForm = ref(false)
const addressStore = useAddressStore()

function handleSaved() {
  showForm.value = false
}
</script>

<style scoped>
.addresses-container {
  width: 100%;
  max-width: 800px;
}
.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}
.section-description {
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 2rem;
}
.addresses-content {
  background: #f8fafc;
  border-radius: 0.5rem;
  padding: 2rem;
}
</style>
