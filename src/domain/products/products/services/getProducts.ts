import type { HttpClient } from "@/shared/api/HttpClient";
import type { ProductInterface } from "../interface";
import { axiosAdapter } from "@/shared/api";


// Service tradicional: obtiene todos los productos (sin paginación)
export const getProducts = async (
  httpClient: HttpClient = axiosAdapter
): Promise<ProductInterface[]> => {
  try {
    const response = await httpClient.get<ProductInterface[]>(`/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

