//adapter que usa axios para hacer las peticiones HTTP, USA AUTENTICACIÓN. Agrega token a headers
// Para endpoints que requieren autenticación. Tinen interceptores para manejar tokens y errores.


import axios from "axios";
import { useErrorHandler } from '@/shared/composables/useErrorHandler'
import { API_BASE_URL } from "@/shared/api/api"
import type { HttpClient } from "./HttpClient";
import { useAuthStore } from "@/domain/auth/store/useAuthStore";


function getAuthToken() {
  const authStore = useAuthStore();
  return authStore.token;
}

const instance = axios.create({ baseURL: API_BASE_URL });
const { handleError } = useErrorHandler();

instance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    handleError(error, 'AxiosAuthAdapter');
    return Promise.reject(error);
  }
);

export const axiosAutherizedAdapter: HttpClient = {
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
