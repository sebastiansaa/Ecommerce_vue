<template>
  <div class="review-main-mobile">
    <!-- Layout vertical: Summary arriba, Reviews abajo -->
    <div class="review-main-mobile__container">
      <!-- Resumen arriba -->
      <section class="review-main-mobile__summary">
        <ReviewsSummary :product-id="productId" />
      </section>

      <!-- Reviews abajo -->
      <section class="review-main-mobile__reviews">
        <ReviewsList :product-id="productId" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import ReviewsSummary from './ReviewsSummary.vue'
import ReviewsList from './ReviewsList.vue'

interface Props {
  productId: string
}

defineProps<Props>()
</script>

<style scoped>
.review-main-mobile {
  width: 100%;
  padding: 1rem;
}

.review-main-mobile__container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.review-main-mobile__summary {
  background-color: #f9fafb;
  border-radius: 0.75rem;
  padding: 1rem;
  border: 1px solid #f3f4f6;
}

.review-main-mobile__reviews {
  /* Las reviews tienen su propio padding */
}
</style>
