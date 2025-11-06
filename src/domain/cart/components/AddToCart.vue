<template>
  <div class="add-to-cart">
    <BasePaymentButton @click="onAddToCart">Agregar al carrito</BasePaymentButton>
  </div>
</template>

<script setup lang="ts">
import type { ProductInterface } from '@/domain/products/products/interface/ProductsInterface'
import { useRouter } from 'vue-router'
import { BasePaymentButton } from '@/shared/components/ui/actions/buttons'
import { useCartStore } from '../store'

const props = defineProps<{ product: ProductInterface }>()
const router = useRouter()
const cartStore = useCartStore()

function onAddToCart() {
  cartStore.addToCart(props.product)
  router.push('/cart')
}
</script>

<style scoped>
.add-to-cart {
  width: 100%;
  display: flex;
  justify-content: center;
}

.add-to-cart__button {
  background: #10b981;
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
  .add-to-cart__button {
    width: 100%;
    min-width: 0;
    max-width: none;
  }
}
.add-to-cart__button:hover {
  background: #059669;
}
</style>
