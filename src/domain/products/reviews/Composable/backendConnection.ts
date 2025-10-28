// Composables para integración con backend - Reviews
// Lógica de estado y formularios listos para conectar con el backend

import { ref, computed, reactive } from 'vue'
import type { Review, ReviewSummary, CreateReviewRequest, ReviewFilters } from '../interface'
import { getMockReviews, mockReviewSummary } from '../services/mockReviews'
// import { ReviewsService } from '../services' // Descomentar cuando el backend esté listo

/**
 * Composable para manejar la lógica de reviews de un producto
 */
export function useReviews(productId: number) {
  // Estado
  const reviews = ref<Review[]>([])
  const summary = ref<ReviewSummary | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const hasMoreReviews = ref(true)

  // Filtros
  const filters = reactive<ReviewFilters>({
    rating: undefined,
    sortBy: 'newest',
    verified: undefined
  })

  // Computed
  const totalReviews = computed(() => summary.value?.totalReviews || 0)
  const averageRating = computed(() => summary.value?.averageRating || 0)
  const ratingsDistribution = computed(() => summary.value?.ratingsDistribution || {
    5: 0, 4: 0, 3: 0, 2: 0, 1: 0
  })

  const filteredReviews = computed(() => {
    let filtered = reviews.value

    if (filters.rating) {
      filtered = filtered.filter(review => review.rating === filters.rating)
    }

    if (filters.verified !== undefined) {
      filtered = filtered.filter(review => review.isVerified === filters.verified)
    }

    // Ordenamiento
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case 'highest':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'lowest':
        filtered.sort((a, b) => a.rating - b.rating)
        break
      case 'helpful':
        // TODO: Implementar cuando tengamos datos de helpful
        break
    }

    return filtered
  })

  // Métodos
  const fetchReviews = async (page = 1, reset = false) => {
    isLoading.value = true
    error.value = null

    try {
      // TODO: Descomentar cuando el backend esté listo
      // const reviewsService = new ReviewsService()
      // const data = await reviewsService.getProductReviews(
      //   productId,
      //   page,
      //   10,
      //   filters.sortBy,
      //   filters.rating
      // )

      // Mock data para desarrollo
      const mockData = getMockReviews(page, 10)

      if (reset) {
        reviews.value = mockData.reviews
        currentPage.value = 1
      } else {
        reviews.value.push(...mockData.reviews)
      }

      hasMoreReviews.value = mockData.hasMore
      currentPage.value = page
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al cargar reviews'
    } finally {
      isLoading.value = false
    }
  }

  const fetchSummary = async () => {
    try {
      // TODO: Descomentar cuando el backend esté listo
      // const reviewsService = new ReviewsService()
      // summary.value = await reviewsService.getProductReviewSummary(productId)

      // Mock data para desarrollo
      summary.value = mockReviewSummary
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al cargar resumen'
    }
  }

  const loadMore = async () => {
    if (!hasMoreReviews.value || isLoading.value) return
    await fetchReviews(currentPage.value + 1, false)
  }

  const refresh = async () => {
    await Promise.all([
      fetchReviews(1, true),
      fetchSummary()
    ])
  }

  const setFilter = (key: keyof ReviewFilters, value: any) => {
    filters[key] = value
    fetchReviews(1, true) // Reset y refetch con nuevo filtro
  }

  const resetFilters = () => {
    filters.rating = undefined
    filters.sortBy = 'newest'
    filters.verified = undefined
    fetchReviews(1, true)
  }

  return {
    // Estado
    reviews: filteredReviews,
    summary,
    isLoading,
    error,
    hasMoreReviews,
    currentPage,
    filters,

    // Computed
    totalReviews,
    averageRating,
    ratingsDistribution,

    // Métodos
    fetchReviews,
    fetchSummary,
    loadMore,
    refresh,
    setFilter,
    resetFilters
  }
}

/**
 * Composable para manejar el formulario de nueva review
 */
export function useReviewForm(productId: number) {
  // Estado del formulario
  const form = reactive<CreateReviewRequest>({
    productId,
    rating: 5,
    comment: '',
    userName: ''
  })

  // Estados de UI
  const isSubmitting = ref(false)
  const submitError = ref<string | null>(null)
  const submitSuccess = ref(false)

  // Validaciones
  const validation = reactive({
    rating: { isValid: true, message: '' },
    comment: { isValid: true, message: '' },
    userName: { isValid: true, message: '' }
  })

  // Computed
  const isFormValid = computed(() => {
    return validation.rating.isValid &&
      validation.comment.isValid &&
      validation.userName.isValid &&
      form.comment.trim().length >= 10 &&
      form.userName.trim().length >= 2
  })

  const commentLength = computed(() => form.comment.length)
  const commentIsValid = computed(() =>
    form.comment.trim().length >= 10 && form.comment.trim().length <= 1000
  )

  // Métodos de validación
  const validateRating = () => {
    if (form.rating < 1 || form.rating > 5) {
      validation.rating = { isValid: false, message: 'Selecciona una puntuación del 1 al 5' }
    } else {
      validation.rating = { isValid: true, message: '' }
    }
  }

  const validateComment = () => {
    const comment = form.comment.trim()
    if (comment.length < 10) {
      validation.comment = { isValid: false, message: 'El comentario debe tener al menos 10 caracteres' }
    } else if (comment.length > 1000) {
      validation.comment = { isValid: false, message: 'El comentario no puede exceder 1000 caracteres' }
    } else {
      validation.comment = { isValid: true, message: '' }
    }
  }

  const validateUserName = () => {
    const userName = form.userName.trim()
    if (userName.length < 2) {
      validation.userName = { isValid: false, message: 'El nombre debe tener al menos 2 caracteres' }
    } else if (userName.length > 50) {
      validation.userName = { isValid: false, message: 'El nombre no puede exceder 50 caracteres' }
    } else {
      validation.userName = { isValid: true, message: '' }
    }
  }

  const validateForm = () => {
    validateRating()
    validateComment()
    validateUserName()
    return isFormValid.value
  }

  // Métodos principales
  const submitReview = async () => {
    if (!validateForm()) {
      return false
    }

    isSubmitting.value = true
    submitError.value = null
    submitSuccess.value = false

    try {
      // TODO: Descomentar cuando el backend esté listo
      // const reviewsService = new ReviewsService()
      // await reviewsService.createReview(productId, form)

      // Simular éxito para desarrollo
      await new Promise(resolve => setTimeout(resolve, 1000))

      submitSuccess.value = true
      resetForm()
      return true

    } catch (err) {
      submitError.value = err instanceof Error ? err.message : 'Error al enviar la reseña'
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  const resetForm = () => {
    form.rating = 5
    form.comment = ''
    form.userName = ''
    submitError.value = null
    submitSuccess.value = false

    // Reset validaciones
    validation.rating = { isValid: true, message: '' }
    validation.comment = { isValid: true, message: '' }
    validation.userName = { isValid: true, message: '' }
  }

  const setRating = (rating: number) => {
    form.rating = rating
    validateRating()
  }

  return {
    // Estado del formulario
    form,
    isSubmitting,
    submitError,
    submitSuccess,
    validation,

    // Computed
    isFormValid,
    commentLength,
    commentIsValid,

    // Métodos
    submitReview,
    resetForm,
    setRating,
    validateForm,
    validateRating,
    validateComment,
    validateUserName
  }
}
