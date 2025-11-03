<template>
  <div class="orders-list-mobile">
    <div v-if="isLoading" class="loading-state">Cargando órdenes...</div>
    <div v-else-if="error" class="error-state">Error al cargar órdenes</div>
    <div v-else-if="orders.length === 0" class="empty-state">No tienes órdenes registradas.</div>
    <div v-else class="orders-container">
      <div
        v-for="order in orders"
        :key="order.id"
        class="order-card"
        @click="goToOrderDetail(order.id)"
      >
        <div class="order-header">
          <span class="order-id">#{{ order.id }}</span>
          <span class="order-status" :class="`status-${order.status}`">
            {{ order.status }}
          </span>
        </div>
        <div class="order-info">
          <div class="info-row">
            <span class="label">Fecha:</span>
            <span class="value">{{ formatDate(order.createdAt) }}</span>
          </div>
          <div class="info-row">
            <span class="label">Total:</span>
            <span class="value order-total">{{ formatCurrency(order.total) }}</span>
          </div>
        </div>
        <div class="order-products">
          <span class="products-count">{{ order.products.length }} producto(s)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserOrder } from '@/domain/user/interface'
import { changeCurrency } from '@/shared/helpers'
import { useRouter } from 'vue-router'

defineProps<{
  orders: UserOrder[]
  isLoading: boolean
  error: any
}>()

const router = useRouter()

function formatCurrency(value: number) {
  return changeCurrency(value, 'CLP', 'es-CL')
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('es-CL')
}

function goToOrderDetail(orderId: string) {
  router.push({ name: 'user-order-detail', params: { id: orderId } })
}
</script>

<style scoped>
.orders-list-mobile {
  width: 100%;
  padding: 1rem;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 2rem 1rem;
  color: #666;
}

.error-state {
  color: #e53e3e;
}

.orders-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-card {
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.order-card:active {
  transform: scale(0.98);
}

.order-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.order-id {
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.order-status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
}

.status-completed {
  background: #d1fae5;
  color: #065f46;
}

.status-cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  color: #666;
  font-size: 0.9rem;
}

.value {
  font-weight: 500;
  color: #333;
}

.order-total {
  color: #667eea;
  font-weight: 600;
  font-size: 1.1rem;
}

.order-products {
  padding-top: 0.5rem;
  border-top: 1px solid #f0f0f0;
}

.products-count {
  color: #888;
  font-size: 0.9rem;
}
</style>
