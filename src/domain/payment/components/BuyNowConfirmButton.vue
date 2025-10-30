<template>
  <BaseButton class="buy-now-confirm-btn" @click="$emit('confirm')"> Confirmar compra </BaseButton>
</template>

<script setup>
import BaseButton from '@/shared/components/ui/actions/buttons/BaseButton.vue'
</script>

<style scoped>
.buy-now-confirm-btn {
  width: 100%;
  background: #10b981;
  color: #fff;
  font-size: 1.2rem;
  padding: 1rem 0;
  border-radius: 8px;
  font-weight: bold;
  transition: background 0.2s;
}
.buy-now-confirm-btn:hover {
  background: #059669;
}
</style>
