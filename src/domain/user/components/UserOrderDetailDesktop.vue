<template>
  <div class="order-detail-desktop">
    <div v-if="isLoading" class="loading-state">Cargando detalle...</div>
    <div v-else-if="error" class="error-state">Error al cargar detalle</div>
    <div v-else-if="order" class="order-container">
      <!-- Header -->
      <div class="order-header">
        <div class="header-left">
          <h2 class="order-title">Orden #{{ order.id }}</h2>
          <span class="order-date">{{ formatDate(order.createdAt) }}</span>
        </div>
        <div class="header-right">
          <span class="order-status" :class="`status-${order.status}`">
            {{ order.status }}
          </span>
        </div>
      </div>

      <!-- Main Content: 2 columns -->
      <div class="order-content">
        <!-- Left Column: Order Info -->
        <div class="info-section">
          <h3 class="section-title">Información de la Orden</h3>
          <div class="info-card">
            <div class="info-row">
              <span class="label">Número de Orden:</span>
              <span class="value">#{{ order.id }}</span>
            </div>
            <div class="info-row">
              <span class="label">Fecha de Creación:</span>
              <span class="value">{{ formatDate(order.createdAt) }}</span>
            </div>
            <div class="info-row">
              <span class="label">Estado:</span>
              <span class="value">{{ order.status }}</span>
            </div>
            <div class="info-row">
              <span class="label">Cantidad de Productos:</span>
              <span class="value">{{ order.products.length }}</span>
            </div>
            <div class="info-row total-row">
              <span class="label">Total:</span>
              <span class="value total-value">{{ formatCurrency(order.total) }}</span>
            </div>
          </div>
        </div>

        <!-- Right Column: Products List -->
        <div class="products-section">
          <h3 class="section-title">Productos</h3>
          <div class="products-list">
            <div v-for="item in order.products" :key="item.id" class="product-item">
              <div class="product-main">
                <img
                  v-if="item.images?.[0]"
                  :src="item.images[0]"
                  :alt="item.title"
                  class="product-image"
                />
                <div class="product-details">
                  <h4 class="product-title">{{ item.title }}</h4>
                  <p v-if="item.description" class="product-description">
                    {{ truncateText(item.description, 120) }}
                  </p>
                </div>
              </div>
              <div class="product-price">{{ formatCurrency(item.price) }}</div>
            </div>
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
.order-detail-desktop {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
  font-size: 1.1rem;
}

.error-state {
  color: #e53e3e;
}

.order-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-header {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.order-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.order-date {
  color: #666;
  font-size: 0.95rem;
}

.order-status {
  padding: 0.5rem 1.25rem;
  border-radius: 1.5rem;
  font-size: 0.95rem;
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

.order-content {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 1.5rem;
}

.info-section,
.products-section {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 1.25rem 0;
}

.info-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.total-row {
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 2px solid #f0f0f0;
}

.label {
  color: #666;
  font-size: 0.9rem;
}

.value {
  font-weight: 500;
  color: #333;
  font-size: 1rem;
}

.total-value {
  color: #667eea;
  font-weight: 600;
  font-size: 1.5rem;
}

.products-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  border: 1px solid #f0f0f0;
  border-radius: 0.75rem;
  transition: box-shadow 0.2s ease;
}

.product-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.product-main {
  display: flex;
  gap: 1rem;
  flex: 1;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
  flex-shrink: 0;
}

.product-details {
  flex: 1;
}

.product-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.product-description {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.product-price {
  color: #667eea;
  font-weight: 600;
  font-size: 1.15rem;
  white-space: nowrap;
}
</style>
