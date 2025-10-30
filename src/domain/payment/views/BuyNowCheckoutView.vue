<template>
  <section v-if="!isLoading && product" class="buy-now-checkout-view">
    <BuyNowProductSummary :product="product" />
    <BuyNowForm v-model="form" />
    <BuyNowTotal :product="product" :form="form" />
    <BuyNowConfirmButton @confirm="onConfirm" />
  </section>
  <div v-else-if="isLoading">Cargando producto...</div>
  <div v-else>Producto no encontrado.</div>
</template>

<script setup lang="ts">
import BuyNowProductSummary from '../components/BuyNowProductSummary.vue'
import BuyNowForm from '../components/BuyNowForm.vue'
import BuyNowTotal from '../components/BuyNowTotal.vue'
import BuyNowConfirmButton from '../components/BuyNowConfirmButton.vue'
import { initMercadoPagoPayment } from '../services/mercadoPagoService'
import type { ProductInterface } from '@/domain/products/products/interface/ProductsInterface'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductById } from '@/domain/products/products/Composable/useProductById'
import { usePaymentStore } from '../store/usePaymentStore'

const route = useRoute()
const productId = computed(() => Number(route.query.productId))
const { data: product, isLoading, error } = useProductById(productId)
const form = ref({})
const paymentStore = usePaymentStore()

async function onConfirm() {
  if (!product.value) return
  const payload = {
    title: product.value.title,
    price: product.value.price,
    quantity: 1,
    currency_id: 'CLP',
  }
  try {
    // Guardar la compra en el store
    paymentStore.addPurchase({
      product: product.value,
      date: new Date().toISOString(),
      amount: product.value.price,
      paymentMethod: 'mercadopago',
    })
    const { init_point } = await initMercadoPagoPayment(payload)
    window.location.href = init_point // Simula la redirección a MercadoPago
  } catch (e) {
    alert('Error iniciando pago con MercadoPago')
  }
}
</script>

<style scoped>
.buy-now-checkout-view {
  max-width: 480px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
