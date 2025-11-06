<template>
  <div class="cart-container">
    <h1>Carrito de Compras</h1>

    <div v-if="cartStore.isEmpty" class="cart-content">
      <div class="empty-cart">
        <p>Tu carrito está vacío</p>
        <RouterLink to="/products/clothes" class="continue-shopping">
          Continuar comprando
        </RouterLink>
      </div>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <CartItem
          v-for="item in cartStore.items"
          :key="item.product.id"
          :item="item"
          @update-quantity="cartStore.updateQuantity"
          @remove="cartStore.removeFromCart(item.product.id)"
        />
      </div>

      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal ({{ cartStore.totalItems }} productos):</span>
          <span class="summary-price">${{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Envío:</span>
          <span class="summary-price">Gratis</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span class="summary-price">${{ cartStore.totalPrice.toFixed(2) }}</span>
        </div>

        <BasePaymentButton @click="proceedToCheckout"> Proceder al pago </BasePaymentButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/domain/cart/store/useCartStore'
import CartItem from '@/domain/cart/components/CartItem.vue'
import BasePaymentButton from '@/shared/components/ui/actions/buttons/BasePaymentButton.vue'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

function proceedToCheckout() {
  router.push('/payment/buy-now')
}
</script>

<style scoped>
.cart-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}
.cart-content {
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}
.empty-cart {
  text-align: center;
  color: #64748b;
}
.continue-shopping {
  display: inline-block;
  margin-top: 1rem;
  color: #2563eb;
  text-decoration: underline;
}
.cart-items {
  margin-bottom: 2rem;
}
.cart-summary {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.summary-row.total {
  font-weight: bold;
  font-size: 1.2rem;
}
.summary-price {
  color: #2563eb;
}
</style>
