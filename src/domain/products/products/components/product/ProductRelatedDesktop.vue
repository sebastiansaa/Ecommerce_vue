<template>
  <div class="product-related-desktop">
    <h3 class="related-title">{{ $t('relatedProducts') }}</h3>

    <div v-if="isLoading" class="loading">
      <p>Cargando productos relacionados...</p>
    </div>

    <div v-else-if="relatedProducts.length > 0" class="products-carousel">
      <button class="carousel-arrow left" @click="prev" :disabled="currentIndex === 0">
        &#8592;
      </button>
      <div class="carousel-items">
        <ProductCard
          v-for="product in visibleProducts"
          :key="product.id"
          :product="product"
          @select="navigateToProduct"
          class="related-card"
        />
      </div>
      <button
        class="carousel-arrow right"
        @click="next"
        :disabled="currentIndex + visibleCount >= relatedProducts.length"
      >
        &#8594;
      </button>
    </div>

    <div v-else class="no-products">
      <p>No hay productos relacionados disponibles</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProducts } from '../../Composable'
import { getRelatedProducts } from '../../helpers'
import { PRODUCTS_CONFIG } from '@/domain/products/config/products.config'
import { useProductNavigation } from '@/shared/composables'
import ProductCard from '../../components/ProductCard.vue'
import type { ProductInterface } from '../../interface/ProductsInterface'

interface Props {
  product: ProductInterface
}

const props = defineProps<Props>()
const { navigateToProduct } = useProductNavigation()

const { data: products, isLoading } = useProducts()

const relatedProducts = computed(() =>
  getRelatedProducts(
    products.value,
    props.product,
    PRODUCTS_CONFIG.carousel.relatedProducts.desktop.maxResults,
  ),
)

const visibleCount = ref(PRODUCTS_CONFIG.carousel.relatedProducts.desktop.visibleCount)
const currentIndex = ref(0)

const visibleProducts = computed(() =>
  relatedProducts.value.slice(currentIndex.value, currentIndex.value + visibleCount.value),
)

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1
  }
}

function next() {
  if (currentIndex.value + visibleCount.value < relatedProducts.value.length) {
    currentIndex.value += 1
  }
}
</script>

<style scoped>
.product-related-desktop {
  margin-top: 2rem;
  padding: v-bind('PRODUCTS_CONFIG.styles.spacing.padding.medium');
  position: relative;
}

.related-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: v-bind('PRODUCTS_CONFIG.styles.spacing.gap.medium');
  color: #333;
}

.loading,
.no-products {
  text-align: center;
  color: #666;
  padding: v-bind('PRODUCTS_CONFIG.styles.spacing.padding.medium');
}

.products-carousel {
  display: flex;
  align-items: center;
  gap: v-bind('PRODUCTS_CONFIG.styles.spacing.gap.medium');
}

.carousel-arrow {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: v-bind('PRODUCTS_CONFIG.styles.borderRadius.button');
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background v-bind('PRODUCTS_CONFIG.styles.transitions.fast')
    v-bind('PRODUCTS_CONFIG.styles.transitions.easing');
  flex-shrink: 0;
}

.carousel-arrow:hover:not(:disabled) {
  background: #f0f0f0;
}

.carousel-arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.carousel-items {
  display: flex;
  gap: v-bind('PRODUCTS_CONFIG.styles.spacing.gap.medium');
  transition: transform v-bind('PRODUCTS_CONFIG.styles.transitions.slow')
    v-bind('PRODUCTS_CONFIG.styles.transitions.easingSmooth');
  will-change: transform;
  flex: 1;
  overflow: hidden;
}

.related-card {
  flex: 1;
  min-width: 0;
  max-width: 300px;
}

/* Desktop grande: 4 productos */
@media (min-width: 1200px) {
  .related-card {
    max-width: 280px;
  }
}
</style>
