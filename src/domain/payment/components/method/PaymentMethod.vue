<template>
  <div class="card-item">
    <div class="card-info">
      <div class="card-brand">{{ card.brand }}</div>
      <div class="card-number">**** **** **** {{ card.number.slice(-4) }}</div>
      <div class="card-holder">Titular: {{ card.holder }}</div>
      <div class="card-expiry">Vencimiento: {{ card.expiry }}</div>
    </div>
    <BaseAccountButton @click="$emit('delete')"
      ><TrashIcon class="icon" /> Eliminar</BaseAccountButton
    >
  </div>
</template>

<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/solid'
import type { CreditCard } from '@/domain/payment/interface'
import { BaseAccountButton } from '@/shared/components/ui/actions/buttons'

defineProps<{ card: CreditCard }>()
</script>

<style scoped>
.card-item {
  background: #f8fafc;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}
.card-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.card-brand {
  font-weight: 600;
  color: #22c55e;
  font-size: 1.1rem;
}
.card-number {
  font-size: 1.2rem;
  letter-spacing: 0.1em;
  color: #222;
}
.card-holder,
.card-expiry {
  font-size: 1rem;
  color: #64748b;
}
.delete-btn {
  background: #e11d48;
  color: #fff;
  border: none;
  font-size: 1rem;
  padding: 0.5rem 1.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: background 0.2s;
}
.delete-btn:hover {
  background: #be123c;
}
.icon {
  width: 1.1rem;
  height: 1.1rem;
}
</style>
