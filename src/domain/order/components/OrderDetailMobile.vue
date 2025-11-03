<template>
  <div class="order-detail-mobile">
    <div v-if="isLoading" class="loading-state">Cargando detalle...</div>
    <div v-else-if="error" class="error-state">Error al cargar detalle</div>
    <div v-else-if="order" class="order-container">
      <!-- Header -->
      <div class="order-header">
        <h2 class="order-title">Orden #{{ order.id }}</h2>
        <span class="order-status" :class="`status-${order.status}`">
          {{ order.status }}
        </span>
      </div>

      <!-- Info Card -->
      <div class="info-card">
        <div class="info-row">
          <span class="label">Fecha:</span>
          <span class="value">{{ formatDate(order.createdAt) }}</span>
        </div>
        <div class="info-row total-row">
          <span class="label">Total:</span>
          <span class="value total-value">{{ formatCurrency(order.total) }}</span>
        </div>
      </div>

      <!-- Products Section -->
      <div class="products-section">
        <h3 class="section-title">Productos ({{ order.products.length }})</h3>
        <div class="products-list">
          <div v-for="item in order.products" :key="item.id" class="product-card">
            <div class="product-info">
              <img
                v-if="item.images?.[0]"
                :src="item.images[0]"
                :alt="item.title"
                class="product-image"
              />
              <div class="product-details">
                <h4 class="product-title">{{ item.title }}</h4>
                <p v-if="item.description" class="product-description">
                  {{ truncateText(item.description, 80) }}
                </p>
              </div>
            </div>
            <div class="product-price">{{ formatCurrency(item.price) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserOrder } from '@/domain/user/interface'
import { changeCurrency } from '@/shared/helpers'

defineProps<{
  order: UserOrder | undefined
  isLoading: boolean
  error: any
}>()

function formatCurrency(value: number) {
  return changeCurrency(value, 'CLP', 'es-CL')
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('es-CL')
}

function truncateText(text: string, maxLength: number) {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}
</script>

<style scoped>
.order-detail-mobile {
  width: 100%;
  padding: 1rem;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 2rem 1rem;
  color: #666;
}

.error-state {
  color: #e53e3e;
}

.order-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-header {
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.order-status {
  padding: 0.35rem 0.85rem;
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

.info-card {
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-row {
  padding-top: 0.75rem;
  border-top: 1px solid #f0f0f0;
}

.label {
  color: #666;
  font-size: 0.95rem;
}

.value {
  font-weight: 500;
  color: #333;
}

.total-value {
  color: #667eea;
  font-weight: 600;
  font-size: 1.25rem;
}

.products-section {
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 1rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1rem 0;
}

.products-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid #f0f0f0;
  border-radius: 0.5rem;
}

.product-info {
  display: flex;
  gap: 0.75rem;
}

.product-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.5rem;
  flex-shrink: 0;
}

.product-details {
  flex: 1;
}

.product-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.25rem 0;
}

.product-description {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
  line-height: 1.4;
}

.product-price {
  color: #667eea;
  font-weight: 600;
  font-size: 1rem;
  text-align: right;
}
</style>
