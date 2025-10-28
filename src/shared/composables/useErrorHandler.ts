import { useToast } from 'vue-toastification'

export function useErrorHandler() {
  const toast = useToast()

  const handleError = (error: any, context?: string) => {
    console.error(`Error in ${context || 'unknown'}:`, error)

    let message = 'Ha ocurrido un error inesperado.'
    let title = 'Error'

    if (error.response) {
      // Error de respuesta HTTP
      const status = error.response.status

      switch (status) {
        case 404:
          title = 'No encontrado'
          message = 'El recurso solicitado no fue encontrado.'
          break
        case 401:
          title = 'No autorizado'
          message = 'No tienes permisos para acceder a este recurso.'
          break
        case 403:
          title = 'Acceso denegado'
          message = 'No tienes permisos suficientes.'
          break
        case 500:
          title = 'Error del servidor'
          message = 'Error interno del servidor. Inténtalo más tarde.'
          break
        default:
          message = error.response.data?.message || `Error ${status}: ${error.response.statusText}`
      }
    } else if (error.message) {
      // Error de red o cliente
      if (error.message.includes('Network Error')) {
        title = 'Error de conexión'
        message = 'Revisa tu conexión a internet e inténtalo de nuevo.'
      } else {
        message = error.message
      }
    }

    toast.error(message, {
      timeout: 5000,
      closeOnClick: true
    })

    return { title, message, status: error.response?.status }
  }

  const handleSuccess = (message: string) => {
    toast.success(message)
  }

  const handleInfo = (message: string) => {
    toast.info(message)
  }

  return {
    handleError,
    handleSuccess,
    handleInfo
  }
}
