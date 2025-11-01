<template>
  <div class="product-main-desktop">
    <div class="gallery-section">
      <ProductGallery
        :images="product.images"
        :description="product.description"
        :product="product"
      />
    </div>
    <div class="details-section">
      <ProductDescription :product="product" />
      <div class="actions-section">
        <div class="action-btn">
          <AddToCart :product="product" />
        </div>
        <div class="action-btn">
          <BuyNow :product="product" />
        </div>
      </div>
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
import AddToCart from '@/domain/cart/components/AddToCart.vue'
import BuyNow from '@/domain/payment/components/BuyNow.vue'
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
  align-items: center;
  gap: 1rem;
}

.actions-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.action-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-btn :deep(button) {
  width: 260px !important;
  min-width: 260px !important;
  max-width: 260px !important;
  box-sizing: border-box;
  margin: 0 auto;
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
