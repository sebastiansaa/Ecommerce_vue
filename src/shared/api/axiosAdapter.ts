//adapter que usa axios para hacer las peticiones HTTP, NO USA AUTENTICACIÓN. Para endpoints públicos

import axios from "axios";

import { useErrorHandler } from '@/shared/composables/useErrorHandler'
import { API_BASE_URL } from "@/shared/api/api"
import type { HttpClient } from "./HttpClient";


const instance = axios.create({ baseURL: API_BASE_URL });
const { handleError } = useErrorHandler();

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Logging específico para errores de productos
    if (error.config?.url?.includes('/products/')) {
      const productId = error.config.url.match(/\/products\/(\d+)/)?.[1]
      if (productId && (error.response?.status === 400 || error.response?.status === 404)) {
        console.warn(`Producto ${productId} no encontrado en API (${error.response.status})`)
      }
    }

    handleError(error, 'AxiosAdapter');
    return Promise.reject(error);
  }
);

export const axiosAdapter: HttpClient = {
  get: async (url, config) => {
    return await instance.get(url, config);
  },
  post: async (url, data, config) => {
    return await instance.post(url, data, config);
  },
  put: async (url, data, config) => {
    return await instance.put(url, data, config);
  },
  delete: async (url, config) => {
    return await instance.delete(url, config);
  },
};
