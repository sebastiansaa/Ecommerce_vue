<template>
  <button
    :class="['wishlist-button', { 'in-wishlist': isInWishList(product.id) }]"
    @click="toggleWishList"
    :aria-label="
      isInWishList(product.id) ? 'Quitar de lista de deseos' : 'Agregar a lista de deseos'
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :fill="isInWishList(product.id) ? 'currentColor' : 'none'"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="heart-icon"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import type { ProductInterface } from '@/domain/products/products/interface/ProductsInterface'
import { useWishList } from '../composable/useWishList'

const props = defineProps<{ product: ProductInterface }>()

const { addToWishList, removeFromWishList, isInWishList } = useWishList()

function toggleWishList() {
  if (isInWishList(props.product.id)) {
    removeFromWishList(props.product.id)
  } else {
    addToWishList(props.product)
  }
}
</script>

<style scoped>
.wishlist-button {
  background: none;
  border: 2px solid #e2e8f0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #64748b;
  padding: 0;
}

.wishlist-button:hover {
  border-color: #ef4444;
  color: #ef4444;
  transform: scale(1.1);
}

.wishlist-button.in-wishlist {
  background: #ef4444;
  border-color: #ef4444;
  color: #fff;
}

.wishlist-button.in-wishlist:hover {
  background: #dc2626;
  border-color: #dc2626;
}

.heart-icon {
  width: 20px;
  height: 20px;
}
</style>
