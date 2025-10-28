<template>
  <div class="cart-container">
    <h1>Carrito de Compras</h1>
    <div class="cart-content">
      <div class="empty-cart">
        <p>Tu carrito está vacío</p>
        <RouterLink to="/products/clothes" class="continue-shopping">
          Continuar comprando
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
// Vista temporal del carrito
</script>

<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.cart-content {
  margin-top: 2rem;
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.empty-cart p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.continue-shopping {
  display: inline-block;
  background: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.2s;
}

.continue-shopping:hover {
  background: #0056b3;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}
</style>
