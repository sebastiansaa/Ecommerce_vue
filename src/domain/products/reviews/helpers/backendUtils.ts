// Helpers para integración con backend - Reviews
// Utilities para formateo, validación y manejo de datos de reviews

import type { Review, RatingValue, ReviewSortOption } from '../interface'

/**
 * Formateo de fechas para reviews
 */
export const formatReviewDate = {
  /**
   * Formatear fecha como tiempo relativo (ej: "Hace 2 días")
   */
  relative: (dateString: string): string => {
    const reviewDate = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - reviewDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return 'Hace 1 día'
    if (diffDays < 7) return `Hace ${diffDays} días`
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7)
      return `Hace ${weeks} semana${weeks > 1 ? 's' : ''}`
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30)
      return `Hace ${months} mes${months > 1 ? 'es' : ''}`
    }
    const years = Math.floor(diffDays / 365)
    return `Hace ${years} año${years > 1 ? 's' : ''}`
  },

  /**
   * Formatear fecha absoluta (ej: "20 de octubre de 2024")
   */
  absolute: (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  },

  /**
   * Formatear fecha corta (ej: "20/10/2024")
   */
  short: (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES')
  }
}

/**
 * Validaciones para reviews
 */
export const reviewValidation = {
  /**
   * Validar rating (1-5)
   */
  isValidRating: (rating: number): rating is RatingValue => {
    return Number.isInteger(rating) && rating >= 1 && rating <= 5
  },

  /**
   * Validar comentario
   */
  isValidComment: (comment: string, minLength = 10, maxLength = 1000): boolean => {
    const trimmed = comment.trim()
    return trimmed.length >= minLength && trimmed.length <= maxLength
  },

  /**
   * Validar nombre de usuario
   */
  isValidUserName: (userName: string, minLength = 2, maxLength = 50): boolean => {
    const trimmed = userName.trim()
    return trimmed.length >= minLength && trimmed.length <= maxLength
  },

  /**
   * Validar review completa
   */
  isValidReview: (review: { rating: number; comment: string; userName: string }): boolean => {
    return reviewValidation.isValidRating(review.rating) &&
      reviewValidation.isValidComment(review.comment) &&
      reviewValidation.isValidUserName(review.userName)
  }
}

/**
 * Utilidades para formateo de ratings
 */
export const ratingUtils = {
  /**
   * Formatear rating con decimales
   */
  formatRating: (rating: number, decimals = 1): string => {
    return rating.toFixed(decimals)
  },

  /**
   * Obtener texto descriptivo del rating
   */
  getRatingText: (rating: number): string => {
    if (rating >= 4.5) return 'Excelente'
    if (rating >= 4) return 'Muy bueno'
    if (rating >= 3) return 'Bueno'
    if (rating >= 2) return 'Regular'
    return 'Malo'
  },

  /**
   * Calcular porcentaje de distribución
   */
  calculateDistributionPercentage: (
    count: number,
    total: number
  ): number => {
    return total > 0 ? Math.round((count / total) * 100) : 0
  }
}

/**
 * Utilidades para el texto de reviews
 */
export const textUtils = {
  /**
   * Truncar comentario con "..."
   */
  truncateComment: (comment: string, maxLength = 150): { text: string; isTruncated: boolean } => {
    if (comment.length <= maxLength) {
      return { text: comment, isTruncated: false }
    }
    return {
      text: comment.slice(0, maxLength) + '...',
      isTruncated: true
    }
  },

  /**
   * Contar palabras en un comentario
   */
  countWords: (comment: string): number => {
    return comment.trim().split(/\s+/).length
  },

  /**
   * Formatear conteo de reviews
   */
  formatReviewCount: (count: number): string => {
    if (count === 0) return 'Sin reseñas'
    if (count === 1) return '1 reseña'
    if (count < 1000) return `${count} reseñas`
    return `${(count / 1000).toFixed(1)}k reseñas`
  }
}

/**
 * Utilidades para ordenamiento
 */
export const sortUtils = {
  /**
   * Opciones de ordenamiento disponibles
   */
  sortOptions: [
    { value: 'newest' as ReviewSortOption, label: 'Más recientes' },
    { value: 'oldest' as ReviewSortOption, label: 'Más antiguos' },
    { value: 'highest' as ReviewSortOption, label: 'Mayor puntuación' },
    { value: 'lowest' as ReviewSortOption, label: 'Menor puntuación' },
    { value: 'helpful' as ReviewSortOption, label: 'Más útiles' }
  ],

  /**
   * Función de ordenamiento
   */
  sortReviews: (reviews: Review[], sortBy: ReviewSortOption): Review[] => {
    const sorted = [...reviews]

    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      case 'highest':
        return sorted.sort((a, b) => b.rating - a.rating)
      case 'lowest':
        return sorted.sort((a, b) => a.rating - b.rating)
      case 'helpful':
        // TODO: Implementar cuando tengamos datos de "helpful"
        return sorted
      default:
        return sorted
    }
  }
}

/**
 * Utilidades para avatares
 */
export const avatarUtils = {
  /**
   * Generar iniciales del nombre
   */
  generateInitials: (userName: string): string => {
    return userName
      .split(' ')
      .map(name => name.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('')
  },

  /**
   * Obtener color de avatar basado en el nombre
   */
  getAvatarColor: (userName: string, colors: string[]): string => {
    if (!colors.length) return '#6b7280' // Color por defecto
    const index = userName.length % colors.length
    return colors[index] || '#6b7280'
  }
}

/**
 * Cache simple para reviews (para desarrollo)
 */
export const reviewCache = {
  cache: new Map<string, any>(),

  /**
   * Obtener del cache
   */
  get: <T>(key: string): T | null => {
    const item = reviewCache.cache.get(key)
    if (!item) return null

    // Verificar expiración (5 minutos)
    if (Date.now() - item.timestamp > 5 * 60 * 1000) {
      reviewCache.cache.delete(key)
      return null
    }

    return item.data
  },

  /**
   * Guardar en cache
   */
  set: (key: string, data: any): void => {
    reviewCache.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  },

  /**
   * Limpiar cache
   */
  clear: (): void => {
    reviewCache.cache.clear()
  }
}
