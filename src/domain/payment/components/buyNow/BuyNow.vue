<template>
  <div class="buy-now">
    <BasePaymentButton @click="onBuyNow">Comprar ahora</BasePaymentButton>
  </div>
</template>

<script setup lang="ts">
import type { ProductInterface } from '@/domain/products/products/interface/ProductsInterface'
import { useRouter } from 'vue-router'
import { BasePaymentButton } from '@/shared/components/ui/actions/buttons'

const props = defineProps<{ product: ProductInterface }>()
const router = useRouter()

function onBuyNow() {
  // Navegar a la vista de checkout minimalista
  router.push({ path: '/payment/buy-now', query: { productId: props.product.id } })
}
</script>

<style scoped>
.buy-now {
  width: 100%;
  display: flex;
  justify-content: center;
}

.buy-now__button {
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  .buy-now__button {
    width: 100%;
    min-width: 0;
    max-width: none;
  }
}
.buy-now__button:hover {
  background: #2563eb;
}
</style>
