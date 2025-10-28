<template>
  <div class="product-detail-view">
    <!-- Loading state -->
    <div v-if="isLoading" class="loading">
      <p>Cargando producto...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error">
      <p v-if="is404Error">Producto no encontrado (ID: {{ productId }})</p>
      <p v-else>Error al cargar el producto</p>
      <button @click="handleRetry">Reintentar</button>
      <button @click="goToProducts" class="secondary">Ver todos los productos</button>
    </div>

    <!-- Success state -->
    <ProductMain v-else-if="data" :product="data" :key="data.id" />

    <!-- Not found state -->
    <div v-else class="not-found">
      <p>Producto no encontrado</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductMain from '../components/product/ProductMain.vue'
import { useProductById } from '../Composable'
import { useErrorHandler } from '../../../../shared/composables'

const route = useRoute()
const router = useRouter()
const { handleError } = useErrorHandler()

const productId = computed(() => Number(route.params.id))
const { data, isLoading, error, refetch } = useProductById(productId)

// Detectar si es un error 404
const is404Error = computed(() => {
  return error.value && (error.value as any)?.response?.status === 404
})

// Métodos para manejar errores
const handleRetry = () => {
  if (refetch) {
    refetch()
  }
}

const goToProducts = () => {
  router.push('/')
}

watch(error, (newError) => {
  if (newError) {
    handleError(newError, 'ProductDetail')
    console.error(`Error cargando producto ID ${productId.value}:`, newError)
  }
})
</script>

<style scoped>
.product-detail-view {
  padding: 1rem;
}

.loading,
.error,
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  gap: 1rem;
}

.error {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 2rem;
  color: #dc2626;
}

.error button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.error button:first-of-type {
  background-color: #dc2626;
  color: white;
}

.error button:first-of-type:hover {
  background-color: #b91c1c;
}

.error button.secondary {
  background-color: #f3f4f6;
  color: #374151;
  margin-left: 0.5rem;
}

.error button.secondary:hover {
  background-color: #e5e7eb;
}

.loading {
  color: #6b7280;
}

.not-found {
  color: #6b7280;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 2rem;
}
</style>
