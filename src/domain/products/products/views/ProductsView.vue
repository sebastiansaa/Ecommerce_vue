<template>
  <div>
    <h2 v-if="currentCategory" class="category-title">{{ t(currentCategory.label) }}</h2>

    <!-- Loading state -->
    <div v-if="isLoading && filteredProducts.length === 0" class="loading">
      <p>Cargando productos de {{ currentCategory?.label || category }}...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <!-- Products -->
    <div v-else>
      <ProductsGrid :products="filteredProducts" />

      <!-- Loading more -->
      <div v-if="isLoading && filteredProducts.length > 0" class="loading-more">
        <p>Cargando más productos...</p>
      </div>

      <!-- No products found -->
      <div v-if="!isLoading && filteredProducts.length === 0" class="no-products">
        <p>No hay productos en esta categoría.</p>
      </div>
    </div>

    <!-- Category not found -->
    <div v-if="!currentCategory" class="not-found">
      <p>Categoría no encontrada.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import ProductsGrid from '@/domain/products/products/components/ProductsGrid.vue'
import { categories } from '@/shared/helpers/categories'
import { useI18n } from 'vue-i18n'
import { useCategoryInfiniteScroll } from '@/domain/products/products/Composable'
import { computed, watch, onMounted } from 'vue'
import { useNavStore } from '@/stores/useNavStore'

const route = useRoute()
const { t } = useI18n()

const category = computed(() => route.params.category as string)
const currentCategory = computed(() => categories.find((cat) => cat.key === category.value))

// Usar el nuevo composable que filtra por categoría en la API
const { products: filteredProducts, isLoading, error } = useCategoryInfiniteScroll(category)

const navStore = useNavStore()

onMounted(() => {
  if (category.value && navStore.selectedCategory !== category.value) {
    navStore.setCategory(category.value)
  }
})

watch(category, (newCat) => {
  if (newCat && navStore.selectedCategory !== newCat) {
    navStore.setCategory(newCat)
  }
})
</script>

<style scoped>
.category-title {
  text-align: center;
  margin-bottom: 1rem;
}

.loading,
.loading-more,
.error,
.no-products,
.not-found {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 0.5rem;
  color: #c33;
}

.products-toggle {
  display: none;
}
</style>
