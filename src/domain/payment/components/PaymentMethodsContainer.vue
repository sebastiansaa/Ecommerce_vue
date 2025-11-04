<template>
  <div class="payment-methods-container">
    <h2 class="section-title">Tarjetas</h2>
    <p class="section-description">Medios de pago guardados</p>
    <div class="methods-content">
      <PaymentMethod />
    </div>
  </div>
</template>

<script setup lang="ts">
import PaymentMethod from './method/PaymentMethod.vue'
</script>

<style scoped>
.payment-methods-container {
  width: 100%;
  max-width: 800px;
}
.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}
.section-description {
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 2rem;
}
.methods-content {
  width: 100%;
}
</style>
