// Punto de entrada para las interfaces del dominio reviews

// Interface principal para una review
export interface Review {
    id: string
    productId: number
    userName: string
    rating: number // 1-5
    comment: string
    date: string // ISO string
    avatar?: string
    isVerified?: boolean
}

// Interface para el resumen de reviews de un producto
export interface ReviewSummary {
    averageRating: number
    totalReviews: number
    ratingsDistribution: Record<1 | 2 | 3 | 4 | 5, number>
}

// Interface para paginación de reviews
export interface ReviewsPagination {
    page: number
    limit: number
    total: number
    hasNext: boolean
    hasPrevious: boolean
}

// Interface para filtros de reviews
export interface ReviewFilters {
    rating?: number
    sortBy?: 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful'
    verified?: boolean
}

// Interface para crear una nueva review
export interface CreateReviewRequest {
    productId: number
    rating: number
    comment: string
    userName: string
}

// Interface para la respuesta de la API
export interface ReviewsResponse {
    reviews: Review[]
    summary: ReviewSummary
    pagination: ReviewsPagination
}

// Tipos utilitarios
export type RatingValue = 1 | 2 | 3 | 4 | 5
export type ReviewSortOption = ReviewFilters['sortBy']
