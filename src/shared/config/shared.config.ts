// Configuración compartida entre todos los dominios
export const SHARED_CONFIG = {
    // Breakpoints compartidos para responsive design
    breakpoints: {
        mobile: 767,        // max-width para mobile
        tablet: 768,        // min-width para tablet
        tabletMax: 1023,    // max-width para tablet
        desktop: 1024,      // min-width para desktop
    },

    // Grid responsive compartido
    grid: {
        mobile: 2,          // columnas en mobile
        tablet: 3,          // columnas en tablet
        desktop: 4,         // columnas en desktop
    },

    // Cache compartido para todos los queries
    cache: {
        staleTime: 1000 * 60 * 5,    // 5 minutos - tiempo antes de refetch
        gcTime: 1000 * 60 * 30,      // 30 minutos - garbage collection
        retry: 3,                    // intentos de reintento en error
    },

    // Timeouts compartidos
    api: {
        timeout: 10000,              // 10 segundos timeout por defecto
    },
}
