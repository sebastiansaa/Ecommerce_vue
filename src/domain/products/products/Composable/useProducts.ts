import { useQuery } from '@tanstack/vue-query'
import { productsApi } from '../api/productsApi'
import type { ProductInterface } from '../interface/ProductsInterface'
import { PRODUCTS_CONFIG } from '../../config'

export function useProducts() {
  return useQuery<ProductInterface[]>({
    queryKey: PRODUCTS_CONFIG.api.queryKeys.all,
    queryFn: async (): Promise<ProductInterface[]> => {
      const response = await productsApi.getAll();
      return response.data;
    },
    staleTime: PRODUCTS_CONFIG.cache.staleTime,
    gcTime: PRODUCTS_CONFIG.cache.gcTime,
    retry: PRODUCTS_CONFIG.cache.retry,
  });
}
