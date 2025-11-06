<template>
  <div class="payment-methods-container">
    <h2 class="section-title">Tarjetas</h2>
    <p class="section-description">Medios de pago guardados</p>
    <div v-if="cards.length === 0" class="no-cards">
      <span>No has agregado ninguna tarjeta de crédito</span>
    </div>
    <div v-else class="methods-list">
      <PaymentMethod
        v-for="card in cards"
        :key="card.id"
        :card="card"
        @delete="deleteCard(card.id)"
      />
    </div>
    <BaseAccountButton @click="showForm = true">
      <PlusIcon class="icon" /> Agregar tarjeta
    </BaseAccountButton>
    <PaymentMethodForm v-if="showForm" @add="addCard" @close="showForm = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PaymentMethod from './PaymentMethod.vue'
import PaymentMethodForm from './PaymentMethodForm.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { usePaymentStore } from '@/domain/payment/store/usePaymentStore'
import { BaseAccountButton } from '@/shared/components/ui/actions/buttons'
import type { CreditCard } from '@/domain/payment/interface'

const paymentStore = usePaymentStore()
const cards = paymentStore.cards
const showForm = ref(false)

function addCard(card: CreditCard) {
  paymentStore.addCard(card)
  showForm.value = false
}
function deleteCard(id: string) {
  paymentStore.deleteCard(id)
}
</script>

<style scoped>
.payment-methods-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
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
.no-cards {
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  text-align: center;
}
.methods-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.icon {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
