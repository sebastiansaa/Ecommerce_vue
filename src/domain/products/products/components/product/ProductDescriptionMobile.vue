<template>
  <div class="product-description-mobile">
    <h2 class="product-title">{{ product.title }}</h2>
    <p class="product-price">
      <strong>{{ product.price }} USD</strong>
    </p>
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
.product-description-mobile {
  padding: v-bind('PRODUCTS_CONFIG.styles.spacing.padding.medium');
  background: #fff;
  border-radius: v-bind('PRODUCTS_CONFIG.styles.borderRadius.card');
  box-shadow: v-bind('PRODUCTS_CONFIG.styles.shadows.card');
}

.product-title {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
}

.product-price {
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: v-bind('PRODUCTS_CONFIG.styles.spacing.gap.medium');
}

.product-price strong {
  font-weight: 700;
}

.product-description {
  color: #555;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Tablet vertical: más espacio */
@media (min-width: 600px) and (max-width: 1023px) {
  .product-description-mobile {
    padding: v-bind('PRODUCTS_CONFIG.styles.spacing.padding.large');
  }

  .product-title {
    font-size: 1.75rem;
  }

  .product-price {
    font-size: 1.75rem;
  }

  .product-description {
    font-size: 1rem;
  }
}
</style>
