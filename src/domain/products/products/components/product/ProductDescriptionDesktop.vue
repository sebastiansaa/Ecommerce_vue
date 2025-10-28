<template>
  <div class="product-description-desktop">
    <div class="title-price-row">
      <h2 class="product-title">{{ product.title }}</h2>
      <p class="product-price">
        <strong>{{ product.price }} USD</strong>
      </p>
    </div>
    <p class="product-description">
      {{ product.description || $t('noDescription') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { ProductInterface } from '@/domain/products/products/interface/ProductsInterface'
import { PRODUCTS_CONFIG } from '@/domain/products/config/products.config'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ product: ProductInterface }>()
const { t: $t } = useI18n()
</script>

<style scoped>
.product-description-desktop {
  padding: v-bind('PRODUCTS_CONFIG.styles.spacing.padding.large');
  background: #fff;
  border-radius: v-bind('PRODUCTS_CONFIG.styles.borderRadius.card');
  box-shadow: v-bind('PRODUCTS_CONFIG.styles.shadows.card');
}

.title-price-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: v-bind('PRODUCTS_CONFIG.styles.spacing.gap.large');
  margin-bottom: v-bind('PRODUCTS_CONFIG.styles.spacing.gap.medium');
}

.product-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
  flex: 1;
  margin: 0;
}

.product-price {
  font-size: 1.75rem;
  color: #007bff;
  white-space: nowrap;
  margin: 0;
  flex-shrink: 0;
}

.product-price strong {
  font-weight: 700;
}

.product-description {
  color: #555;
  line-height: 1.7;
  font-size: 1rem;
  margin: 0;
}

/* Desktop grande: más espacio y fuentes más grandes */
@media (min-width: 1400px) {
  .product-description-desktop {
    padding: v-bind('PRODUCTS_CONFIG.styles.spacing.padding.xlarge');
  }

  .product-title {
    font-size: 2rem;
  }

  .product-price {
    font-size: 2rem;
  }

  .product-description {
    font-size: 1.1rem;
    line-height: 1.8;
  }
}
</style>
