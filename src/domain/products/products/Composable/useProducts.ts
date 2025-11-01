import { useQuery } from '@tanstack/vue-query'
import { productsApi } from '../api/productsApi'
import type { ProductInterface } from '../interface/ProductsInterface'
import { adaptProductId } from '@/shared/helpers'
import { PRODUCTS_CONFIG } from '../../config'

export function useProducts() {
  return useQuery<ProductInterface[]>({
    queryKey: PRODUCTS_CONFIG.api.queryKeys.all,
    queryFn: async (): Promise<ProductInterface[]> => {
      const response = await productsApi.getAll();
      // Adaptar todos los IDs a string para consistencia
      return response.data.map(product => adaptProductId(product));
    },
    staleTime: PRODUCTS_CONFIG.cache.staleTime,
    gcTime: PRODUCTS_CONFIG.cache.gcTime,
    retry: PRODUCTS_CONFIG.cache.retry,
  });
}
