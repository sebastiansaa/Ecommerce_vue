// Servicios para integración con backend - Reviews
// HTTP service listo para conectar con la API del backend

import { axiosAdapter, type HttpClient } from '@/shared/api'
import { useErrorHandler } from '@/shared/composables'
import { SHARED_CONFIG } from '@/shared/config'
import type {
  Review,
  ReviewSummary,
  CreateReviewRequest,
  ReviewSortOption
} from '../interface'
import { getMockReviews, mockReviewSummary, addMockReview } from './mockReviews'

// Interface para la respuesta de paginación de reviews
interface ReviewsResponse {
  reviews: Review[]
  total: number
  hasMore: boolean
  currentPage: number
}

/**
 * Servicio para manejar las operaciones de reviews con el backend
 */
export class ReviewsService {
  private httpClient: HttpClient
  private baseURL: string

  constructor(baseURL = 'http://localhost:3001/api') {
    this.httpClient = axiosAdapter
    this.baseURL = baseURL
    // El manejo de errores se hace centralizadamente en shared/api
  }

  /**
   * Obtener reviews de un producto con paginación y filtros
   */
  async getProductReviews(
    productId: number,
    page = 1,
    limit = 10,
    sortBy: ReviewSortOption = 'newest',
    ratingFilter?: number
  ) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy
    })

    if (ratingFilter) {
      params.append('rating', ratingFilter.toString())
    }

    const response = await this.httpClient.get<ReviewsResponse>(
      `/products/${productId}/reviews?${params.toString()}`
    )

    return {
      reviews: response.data.reviews,
      total: response.data.total,
      hasMore: response.data.hasMore,
      currentPage: response.data.currentPage
    }
  }

  /**
   * Obtener resumen de reviews de un producto
   */
  async getProductReviewSummary(productId: number): Promise<ReviewSummary> {
    const response = await this.httpClient.get<ReviewSummary>(`/products/${productId}/reviews/summary`)
    return response.data
  }

  /**
   * Crear una nueva review
   */
  async createReview(productId: number, reviewData: CreateReviewRequest): Promise<Review> {
    const response = await this.httpClient.post<Review>(
      `/products/${productId}/reviews`,
      reviewData
    )
    return response.data
  }

  /**
   * Actualizar una review existente
   */
  async updateReview(reviewId: string, updateData: Partial<CreateReviewRequest>): Promise<Review> {
    const response = await this.httpClient.put<Review>(
      `/reviews/${reviewId}`,
      updateData
    )
    return response.data
  }

  /**
   * Eliminar una review
   */
  async deleteReview(reviewId: string): Promise<void> {
    await this.httpClient.delete(`/reviews/${reviewId}`)
  }

  /**
   * Marcar una review como útil
   */
  async markReviewHelpful(reviewId: string): Promise<void> {
    await this.httpClient.post(`/reviews/${reviewId}/helpful`)
  }

  /**
   * Reportar una review
   */
  async reportReview(reviewId: string, reason: string): Promise<void> {
    await this.httpClient.post(`/reviews/${reviewId}/report`, {
      reason
    })
  }
}

/**
 * Servicio Mock para desarrollo (cuando no hay backend)
 */
export class ReviewsServiceMock implements Partial<ReviewsService> {
  async getProductReviews(
    productId: number,
    page = 1,
    limit = 10,
    sortBy: ReviewSortOption = 'newest',
    ratingFilter?: number
  ) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500))

    const mockData = getMockReviews(page, limit)

    return {
      reviews: mockData.reviews,
      total: mockData.total,
      hasMore: mockData.hasMore,
      currentPage: mockData.currentPage
    }
  }

  async getProductReviewSummary(productId: number): Promise<ReviewSummary> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockReviewSummary
  }

  async createReview(productId: number, reviewData: CreateReviewRequest): Promise<Review> {
    await new Promise(resolve => setTimeout(resolve, 800))
    return addMockReview(reviewData)
  }
}
