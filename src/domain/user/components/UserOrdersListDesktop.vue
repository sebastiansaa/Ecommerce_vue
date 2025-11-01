<template>
  <div class="orders-list-desktop">
    <div v-if="isLoading" class="loading-state">Cargando órdenes...</div>
    <div v-else-if="error" class="error-state">Error al cargar órdenes</div>
    <div v-else-if="orders.length === 0" class="empty-state">No tienes órdenes registradas.</div>
    <div v-else class="orders-table-container">
      <table class="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Productos</th>
            <th>Estado</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order.id"
            class="order-row"
            @click="goToOrderDetail(order.id)"
          >
            <td class="order-id">#{{ order.id }}</td>
            <td class="order-date">{{ formatDate(order.createdAt) }}</td>
            <td class="order-products">{{ order.products.length }} producto(s)</td>
            <td class="order-status">
              <span class="status-badge" :class="`status-${order.status}`">
                {{ order.status }}
              </span>
            </td>
            <td class="order-total">{{ formatCurrency(order.total) }}</td>
          </tr>
        </tbody>
      </table>
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
.orders-list-desktop {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
  font-size: 1.1rem;
}

.error-state {
  color: #e53e3e;
}

.orders-table-container {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table thead {
  background: #f8f9fa;
}

.orders-table th {
  padding: 1rem 1.5rem;
  text-align: left;
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e5e7eb;
}

.orders-table tbody tr {
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.orders-table tbody tr:hover {
  background: #f9fafb;
}

.orders-table tbody tr:last-child {
  border-bottom: none;
}

.orders-table td {
  padding: 1.25rem 1.5rem;
  color: #555;
}

.order-id {
  font-weight: 600;
  color: #333;
}

.order-date {
  color: #666;
}

.order-products {
  color: #888;
  font-size: 0.95rem;
}

.order-status {
  text-align: center;
}

.status-badge {
  display: inline-block;
  padding: 0.35rem 1rem;
  border-radius: 1.5rem;
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

.order-total {
  color: #667eea;
  font-weight: 600;
  font-size: 1.1rem;
  text-align: right;
}
</style>
