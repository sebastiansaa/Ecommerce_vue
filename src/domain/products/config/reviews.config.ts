import { SHARED_CONFIG } from '@/shared/config'

// Configuración específica para reviews
export const REVIEWS_CONFIG = {
  // Reutilizar configuración compartida
  ...SHARED_CONFIG,

  // Configuración específica de estrellas
  stars: {
    maxRating: 5,
    size: {
      small: '16px',
      medium: '20px',
      large: '24px',
      xlarge: '32px',
    },
    colors: {
      filled: '#FFD700',      // Dorado para estrellas llenas
      empty: '#E5E7EB',       // Gris claro para estrellas vacías
      halfFilled: '#FFD700',   // Dorado para medias estrellas
    },
    gap: '2px',               // Espacio entre estrellas
  },

  // Configuración de barras de distribución
  ratingBars: {
    height: '16px',
    colors: {
      filled: '#3B82F6',      // Azul para la barra llena
      background: '#F3F4F6',  // Gris claro para el fondo
    },
    borderRadius: '8px',
    transition: '0.3s ease',
    maxWidth: '320px',        // Ancho máximo de las barras (era 220px)
  },

  // Layout de la sección de reviews
  layout: {
    gap: {
      summary: '1.5rem',      // Gap entre elementos del summary
      reviews: '1rem',        // Gap entre reviews individuales
      sections: '2rem',       // Gap entre summary y lista
    },
    summary: {
      width: {
        mobile: '100%',
        desktop: '45%',       // 45% del ancho total en desktop (era 35%)
      },
    },
    reviewsList: {
      width: {
        mobile: '100%',
        desktop: '50%',       // 50% del ancho total en desktop (era 60%)
      },
    },
  },

  // Configuración de reviews individuales
  reviewItem: {
    maxCommentLength: 200,    // Caracteres visibles antes del "leer más"
    avatar: {
      size: '40px',
      fallbackColors: [
        '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
        '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
      ],
    },
    dateFormat: 'relative',   // 'relative' o 'absolute'
  },

  // Colores y estados
  colors: {
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
      muted: '#9CA3AF',
    },
    background: {
      card: '#FFFFFF',
      section: '#F9FAFB',
    },
    border: {
      light: '#E5E7EB',
      medium: '#D1D5DB',
    },
  },

  // Configuración de paginación/carga
  pagination: {
    initialLoad: 5,           // Reviews iniciales a mostrar
    loadMore: 5,              // Reviews adicionales por carga
    maxVisible: 20,           // Máximo de reviews visibles sin paginación
  },

  // Animaciones específicas
  animations: {
    starsHover: '0.2s ease',
    barsGrow: '0.6s ease-out',
    reviewsAppear: '0.3s ease-in-out',
  },
} as const

// Tipos derivados para TypeScript
export type ReviewsConfig = typeof REVIEWS_CONFIG
export type StarSize = keyof typeof REVIEWS_CONFIG.stars.size
export type RatingValue = 1 | 2 | 3 | 4 | 5
