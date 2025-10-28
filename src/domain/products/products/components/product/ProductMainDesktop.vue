<template>
  <div class="product-main-desktop">
    <div class="gallery-section">
      <ProductGallery :images="product.images" :description="product.description" />
    </div>
    <div class="details-section">
      <ProductDescription :product="product" />
    </div>
    <div class="related-section">
      <ProductRelated :product="product" />
    </div>
    <div class="reviews-section">
      <ReviewMain :product-id="product.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProductDescription, ProductGallery, ProductRelated } from '.'
import { ReviewMain } from '@/domain/products/reviews/components'
import type { ProductInterface } from '../../interface'

const props = defineProps<{ product: ProductInterface }>()
</script>

<style scoped>
.product-main-desktop {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'gallery details'
    'related related'
    'reviews reviews';
  gap: 2rem;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-section {
  grid-area: gallery;
}

.details-section {
  grid-area: details;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.related-section {
  grid-area: related;
  margin-top: 1rem;
}

.reviews-section {
  grid-area: reviews;
  margin-top: 1rem;
}

/* Desktop grande: más espacio para la galería */
@media (min-width: 1200px) {
  .product-main-desktop {
    grid-template-columns: 60% 40%;
    gap: 3rem;
    padding: 2rem;
  }

  .related-section,
  .reviews-section {
    margin-top: 1.5rem;
  }
}
</style>
