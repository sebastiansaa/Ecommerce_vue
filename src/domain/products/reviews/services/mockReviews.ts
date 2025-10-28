// Mock data para reviews - Datos de prueba para desarrollo
import type { Review, ReviewSummary } from '../interface'

/**
 * Reviews mock para testing y desarrollo
 */
export const mockReviews: Review[] = [
  {
    id: '1',
    productId: 1,
    userName: 'Ana García',
    rating: 5,
    comment: 'Excelente producto, muy buena calidad y llegó rápido. Lo recomiendo totalmente.',
    date: '2024-10-25T10:30:00Z',
    isVerified: true,
    avatar: 'https://ui-avatars.com/api/?name=Ana+Garcia&background=10b981&color=fff'
  },
  {
    id: '2',
    productId: 1,
    userName: 'Carlos López Martínez',
    rating: 4,
    comment: 'Buen producto pero podría mejorar en algunos aspectos. El envío fue puntual.',
    date: '2024-10-24T15:45:00Z',
    isVerified: false,
    avatar: 'https://ui-avatars.com/api/?name=Carlos+Lopez&background=3b82f6&color=fff'
  },
  {
    id: '3',
    productId: 1,
    userName: 'María Rodríguez',
    rating: 5,
    comment: 'Perfecto! Exactamente lo que esperaba. Muy recomendado para todos.',
    date: '2024-10-23T09:15:00Z',
    isVerified: true,
    avatar: 'https://ui-avatars.com/api/?name=Maria+Rodriguez&background=f59e0b&color=fff'
  },
  {
    id: '4',
    productId: 1,
    userName: 'Roberto Silva',
    rating: 3,
    comment: 'Está bien, cumple con lo que promete pero sin destacar demasiado.',
    date: '2024-10-22T14:20:00Z',
    isVerified: false,
    avatar: 'https://ui-avatars.com/api/?name=Roberto+Silva&background=8b5cf6&color=fff'
  },
  {
    id: '5',
    productId: 1,
    userName: 'Laura Jiménez Ruiz',
    rating: 4,
    comment: 'Me gustó mucho, buena relación calidad-precio. Tal vez mejorar el empaque.',
    date: '2024-10-21T11:10:00Z',
    isVerified: true,
    avatar: 'https://ui-avatars.com/api/?name=Laura+Jimenez&background=ef4444&color=fff'
  },
  {
    id: '6',
    productId: 1,
    userName: 'Javier Morales',
    rating: 5,
    comment: 'Increíble calidad, superó mis expectativas. El diseño es hermoso y funcional.',
    date: '2024-10-20T16:30:00Z',
    isVerified: true,
    avatar: 'https://ui-avatars.com/api/?name=Javier+Morales&background=06b6d4&color=fff'
  },
  {
    id: '7',
    productId: 1,
    userName: 'Carmen Vega',
    rating: 2,
    comment: 'No me convenció del todo. Esperaba más por el precio que pagué.',
    date: '2024-10-19T13:25:00Z',
    isVerified: false,
    avatar: 'https://ui-avatars.com/api/?name=Carmen+Vega&background=84cc16&color=fff'
  },
  {
    id: '8',
    productId: 1,
    userName: 'Diego Herrera Santos',
    rating: 4,
    comment: 'Muy bueno en general, algunas características podrían mejorar pero lo recomiendo.',
    date: '2024-10-18T08:45:00Z',
    isVerified: true,
    avatar: 'https://ui-avatars.com/api/?name=Diego+Herrera&background=f97316&color=fff'
  },
  {
    id: '9',
    productId: 1,
    userName: 'Isabella Castro',
    rating: 5,
    comment: 'Fantástico! Justo lo que necesitaba. El servicio al cliente también excelente.',
    date: '2024-10-17T19:50:00Z',
    isVerified: true,
    avatar: 'https://ui-avatars.com/api/?name=Isabella+Castro&background=ec4899&color=fff'
  },
  {
    id: '10',
    productId: 1,
    userName: 'Fernando Vargas',
    rating: 3,
    comment: 'Cumple su función básica pero nada excepcional. El precio está bien.',
    date: '2024-10-16T12:15:00Z',
    isVerified: false,
    avatar: 'https://ui-avatars.com/api/?name=Fernando+Vargas&background=6366f1&color=fff'
  }
]

/**
 * Resumen mock para testing y desarrollo
 */
export const mockReviewSummary: ReviewSummary = {
  totalReviews: 127,
  averageRating: 4.3,
  ratingsDistribution: {
    5: 67,
    4: 32,
    3: 18,
    2: 7,
    1: 3
  }
}

/**
 * Función para obtener reviews mock con paginación
 */
export function getMockReviews(page = 1, limit = 5) {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedReviews = mockReviews.slice(startIndex, endIndex)

  return {
    reviews: paginatedReviews,
    total: mockReviews.length,
    hasMore: endIndex < mockReviews.length,
    currentPage: page,
    totalPages: Math.ceil(mockReviews.length / limit)
  }
}

/**
 * Función para obtener una review mock específica
 */
export function getMockReviewById(reviewId: string): Review | undefined {
  return mockReviews.find(review => review.id === reviewId)
}

/**
 * Función para agregar una nueva review mock
 */
export function addMockReview(reviewData: {
  productId: number
  userName: string
  rating: number
  comment: string
}): Review {
  const newReview: Review = {
    id: 'mock-' + Date.now(),
    productId: reviewData.productId,
    userName: reviewData.userName,
    rating: reviewData.rating,
    comment: reviewData.comment,
    date: new Date().toISOString(),
    isVerified: false,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(reviewData.userName)}&background=random&color=fff`
  }

  mockReviews.unshift(newReview) // Agregar al inicio
  return newReview
}

/**
 * Colores para avatares
 */
export const avatarColors = [
  '#10b981', // green
  '#3b82f6', // blue
  '#f59e0b', // amber
  '#8b5cf6', // purple
  '#ef4444', // red
  '#06b6d4', // cyan
  '#84cc16', // lime
  '#f97316', // orange
  '#ec4899', // pink
  '#6366f1'  // indigo
]