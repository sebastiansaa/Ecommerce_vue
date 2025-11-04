import { useQuery } from '@tanstack/vue-query'
import { productsApi } from '../api/productsApi'
import type { ProductInterface } from '../interface/ProductsInterface'
import { adaptProductId } from '@/domain/products/products/helpers/adaptProduct'
import { PRODUCTS_CONFIG } from '../../config'
import { computed, unref, type Ref, type ComputedRef } from 'vue'

export function useProductById(id: number | Ref<number> | ComputedRef<number>) {
  const idValue = computed(() => unref(id))

  return useQuery<ProductInterface>({
    queryKey: computed(() => PRODUCTS_CONFIG.api.queryKeys.byId(idValue.value)),
    queryFn: async (): Promise<ProductInterface> => {
      try {
        const response = await productsApi.getById(idValue.value);
        // Adaptar el producto para que el id siempre sea string
        return adaptProductId(response.data);
      } catch (error: any) {
        // Agregar logging específico para errores
        console.error(`Error fetching product ${idValue.value}:`, error);

        // Si es 404, lanzar error más específico
        if (error.response?.status === 404 || error.response?.status === 400) {
          throw new Error(`Producto con ID ${idValue.value} no encontrado`);
        }

        // Re-lanzar otros errores
        throw error;
      }
    },
    staleTime: PRODUCTS_CONFIG.cache.staleTime,
    gcTime: PRODUCTS_CONFIG.cache.gcTime,
    retry: (failureCount, error: any) => {
      // No reintentar errores 404/400 (producto no existe)
      if (error?.response?.status === 404 || error?.response?.status === 400) {
        return false;
      }
      // Reintentar otros errores hasta 3 veces
      return failureCount < PRODUCTS_CONFIG.cache.retry;
    },
    enabled: computed(() => !!idValue.value && idValue.value > 0),
  });
}
