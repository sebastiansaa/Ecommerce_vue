<template>
  <div class="orders-view">
    <OrdersList />
  </div>
</template>

<script setup lang="ts">
import OrdersList from '../components/OrdersList.vue'
</script>

<style scoped>
.orders-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
}
</style>
