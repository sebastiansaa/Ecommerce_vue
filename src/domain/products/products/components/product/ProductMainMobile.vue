<template>
  <div class="product-main-mobile">
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
.product-main-mobile {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 0.5rem 0;
}

.gallery-section {
  width: 100%;
}

.details-section {
  width: 100%;
}

.related-section {
  width: 100%;
  margin-top: 0.5rem;
}

.reviews-section {
  width: 100%;
  margin-top: 0.5rem;
}

/* Tablet vertical: más espacio */
@media (min-width: 600px) and (max-width: 1023px) {
  .product-main-mobile {
    gap: 1.5rem;
    padding: 1rem 0;
  }

  .related-section,
  .reviews-section {
    margin-top: 1rem;
  }
}
</style>
