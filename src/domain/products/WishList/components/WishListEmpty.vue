<template>
  <div class="wishlist-empty-message">
    <p>Tu lista de deseos está vacía.</p>
    <router-link to="/products" class="wishlist-explore">Explorar productos</router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.wishlist-empty-message {
  color: #666;
  font-size: 1.1rem;
  margin-top: 2rem;
  text-align: center;
}
.wishlist-explore {
  display: inline-block;
  margin-top: 1rem;
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}
.wishlist-explore:hover {
  color: #764ba2;
  text-decoration: underline;
}
</style>
