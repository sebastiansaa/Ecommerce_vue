<template>
  <div class="product-related-mobile">
    <h3 class="related-title">{{ $t('relatedProducts') }}</h3>

    <div v-if="isLoading" class="loading">
      <p>Cargando productos relacionados...</p>
    </div>

    <div v-else-if="relatedProducts.length > 0" class="products-scroll">
      <div class="scroll-container">
        <ProductCard
          v-for="product in relatedProducts"
          :key="product.id"
          :product="product"
          @select="navigateToProduct"
          class="related-card"
        />
      </div>
    </div>

    <div v-else class="no-products">
      <p>No hay productos relacionados disponibles</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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
    PRODUCTS_CONFIG.carousel.relatedProducts.mobile.maxResults,
  ),
)
</script>

<style scoped>
.product-related-mobile {
  margin-top: 2rem;
  padding: v-bind('PRODUCTS_CONFIG.styles.spacing.padding.medium') 0;
  position: relative;
}

.related-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: v-bind('PRODUCTS_CONFIG.styles.spacing.gap.medium');
  color: #333;
  padding: 0 v-bind('PRODUCTS_CONFIG.styles.spacing.padding.medium');
}

.loading,
.no-products {
  text-align: center;
  color: #666;
  padding: v-bind('PRODUCTS_CONFIG.styles.spacing.padding.medium');
}

.products-scroll {
  overflow: hidden;
  width: 100%;
}

.scroll-container {
  display: flex;
  gap: v-bind('PRODUCTS_CONFIG.styles.spacing.gap.medium');
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding: 0 v-bind('PRODUCTS_CONFIG.styles.spacing.padding.medium');
  -webkit-overflow-scrolling: touch;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.scroll-container {
  scrollbar-width: none;
}

.related-card {
  flex: 0 0 calc(100% - 40%);
  min-width: calc(100% - 40%);
  max-width: 280px;
  scroll-snap-align: start;
}

/* Tablet vertical: mostrar 1.5 productos */
@media (min-width: 600px) and (max-width: 1023px) and (orientation: portrait) {
  .related-card {
    flex: 0 0 v-bind('PRODUCTS_CONFIG.carousel.relatedProducts.mobile.visibleWidth');
    min-width: calc(
      v-bind('PRODUCTS_CONFIG.carousel.relatedProducts.mobile.visibleWidth') - 0.5rem
    );
    max-width: 320px;
  }
}

/* Mobile pequeño: asegurar que se vea 1.5 */
@media (max-width: 599px) {
  .related-card {
    flex: 0 0 calc(70% - 0.5rem);
    min-width: calc(70% - 0.5rem);
    max-width: 260px;
  }
}
</style>
