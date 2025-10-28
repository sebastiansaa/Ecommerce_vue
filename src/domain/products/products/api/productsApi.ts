import { axiosAdapter as api } from "../../../../shared/api"
import type { ProductInterface } from "../interface/ProductsInterface"
import type { AxiosResponse } from "axios"

export const productsApi = {
  // Obtener todos los productos
  getAll: (): Promise<AxiosResponse<ProductInterface[]>> => api.get('/products'),

  // Obtener un producto por ID
  getById: (id: number): Promise<AxiosResponse<ProductInterface>> => api.get(`/products/${id}`),

  // Crear un producto
  create: (data: any): Promise<AxiosResponse<ProductInterface>> => api.post('/products', data),

  // Actualizar un producto
  update: (id: number, data: any): Promise<AxiosResponse<ProductInterface>> => api.put(`/products/${id}`, data),

  // Eliminar un producto
  remove: (id: number): Promise<AxiosResponse<void>> => api.delete(`/products/${id}`)
}
