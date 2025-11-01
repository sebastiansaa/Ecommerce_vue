<template>
  <div class="review-main-desktop">
    <!-- Layout en grid: Summary a la izquierda, Reviews a la derecha -->
    <div class="review-main-desktop__container">
      <!-- Columna del resumen (lado izquierdo) -->
      <aside class="review-main-desktop__summary">
        <ReviewsSummary :product-id="productId" />
      </aside>

      <!-- Columna de las reviews (lado derecho) -->
      <main class="review-main-desktop__reviews">
        <ReviewsList :product-id="productId" />
      </main>
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
.review-main-desktop {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.review-main-desktop__container {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 3rem;
  align-items: start;
}

.review-main-desktop__summary {
  position: sticky;
  top: 2rem;
}

.review-main-desktop__reviews {
  min-height: 600px;
}

/* Responsive para tablets */
@media (max-width: 1024px) {
  .review-main-desktop__container {
    grid-template-columns: 280px 1fr;
    gap: 2rem;
  }

  .review-main-desktop {
    padding: 1.5rem;
  }
}
</style>
