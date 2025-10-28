# Reviews Backend Integration Guide

Esta guía explica cómo integrar los servicios y composables de reviews cuando el backend esté listo.

## 📁 Estructura Actual

```
src/domain/products/reviews/
├── services/index.ts       # ✅ ReviewsService (listo para backend)
├── Composable/index.ts     # ✅ useReviews & useReviewForm (listos)
├── helpers/index.ts        # ✅ Utilidades de formateo y validación
├── interface/index.ts      # ✅ Interfaces TypeScript
└── views/ProductsComponent.vue  # UI usando mock data
```

## 🔧 Servicios Preparados

### ReviewsService

Ubicación: `src/domain/products/reviews/services/index.ts`

**Métodos disponibles:**

- `getProductReviews(productId, page?, limit?, sortBy?, ratingFilter?)`
- `getProductReviewSummary(productId)`
- `createReview(productId, reviewData)`
- `updateReview(reviewId, updateData)`
- `deleteReview(reviewId)`
- `markReviewHelpful(reviewId)`
- `reportReview(reviewId, reason)`

**Mock Service incluido:** `ReviewsServiceMock` para desarrollo.

## 🎯 Composables Preparados

### useReviews

**Para:** Listado y gestión de reviews
**Características:**

- Paginación automática
- Filtrado por rating
- Ordenamiento
- Estado de carga y errores
- Caché automático

### useReviewForm

**Para:** Formulario de nueva review
**Características:**

- Validación en tiempo real
- Manejo de estados (loading, success, error)
- Reset automático
- Validaciones personalizadas

## 🚀 Pasos de Integración

### Paso 1: Configurar baseURL

En `services/index.ts`, actualizar:

```typescript
// Cambiar de:
const API_BASE_URL = 'http://localhost:3001/api'

// A tu backend real:
const API_BASE_URL = process.env.VITE_API_URL || 'http://tu-backend.com/api'
```

### Paso 2: Configurar autenticación

Si tu backend requiere autenticación, añadir headers:

```typescript
// En ReviewsService.constructor():
this.apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
```

### Paso 3: Importar servicios en componentes

Actualmente NO están importados para evitar errores. Cuando esté listo:

```typescript
// En ProductsComponent.vue o donde necesites
import { useReviews, useReviewForm } from '@/domain/products/reviews/Composable'

export default defineComponent({
  setup() {
    const {
      reviews,
      isLoading,
      fetchReviews,
      // ... otros métodos
    } = useReviews('product-id')

    return {
      reviews,
      isLoading,
      // ...
    }
  },
})
```

### Paso 4: Actualizar interfaces si es necesario

En `interface/index.ts`, verificar que las interfaces coincidan con tu backend:

```typescript
export interface Review {
  id: string
  // Verificar que estos campos coincidan con tu backend
  productId: string
  userId: string
  userName: string
  rating: RatingValue
  comment: string
  date: string
  verified?: boolean
  helpful?: number
}
```

## 🔄 Flujo de Datos

### Obtener Reviews

```typescript
// 1. El componente usa useReviews
const { reviews, fetchReviews } = useReviews(productId)

// 2. useReviews llama a ReviewsService
// 3. ReviewsService hace HTTP request al backend
// 4. Los datos se procesan y devuelven al componente
```

### Crear Review

```typescript
// 1. El usuario llena el formulario
// 2. useReviewForm valida los datos
// 3. Se llama a ReviewsService.createReview()
// 4. El backend procesa y devuelve la nueva review
// 5. Se actualiza la lista automáticamente
```

## 🛡️ Manejo de Errores

Los servicios ya incluyen manejo de errores básico:

```typescript
try {
  const reviews = await reviewsService.getProductReviews(productId)
  // Éxito
} catch (error) {
  if (error.response?.status === 404) {
    // Producto no encontrado
  } else if (error.response?.status === 500) {
    // Error del servidor
  }
  // Error general
}
```

## 📝 Variables de Entorno

Crear archivo `.env`:

```bash
VITE_API_URL=http://localhost:3001/api
VITE_API_TIMEOUT=10000
```

## 🧪 Testing Backend

Para probar la integración:

1. **Verificar conexión:**

```typescript
// En consola del navegador:
const service = new ReviewsService()
const test = await service.getProductReviews('test-product-id')
console.log(test)
```

2. **Usar herramientas de desarrollo:**

- Network tab para ver las requests
- Console para ver errores
- Vue DevTools para ver el estado

## 📋 Checklist de Integración

- [ ] Backend API endpoints funcionando
- [ ] Configurar baseURL correcto
- [ ] Verificar autenticación si es necesaria
- [ ] Importar composables en componentes
- [ ] Verificar interfaces con backend
- [ ] Configurar variables de entorno
- [ ] Probar conexión
- [ ] Remover mock data
- [ ] Testing completo

## 💡 Notas Importantes

1. **Mock Data:** Los componentes actuales usan datos mock. Al integrar, estos se reemplazarán automáticamente.

2. **Caché:** useReviews incluye caché básico. Para producción, considera usar TanStack Query.

3. **Paginación:** Está preparada para backend que soporte `page` y `limit`.

4. **Filtros:** El sistema soporta filtrado por rating y ordenamiento.

5. **Validaciones:** Están duplicadas en frontend y deberían estar también en backend.

## 🔧 Helpers Disponibles

Ubicación: `helpers/index.ts`

- **formatReviewDate:** Formateo de fechas
- **reviewValidation:** Validaciones de datos
- **ratingUtils:** Utilidades para ratings
- **textUtils:** Formateo de texto
- **sortUtils:** Ordenamiento de reviews
- **avatarUtils:** Generación de avatares
- **reviewCache:** Caché simple

## 🚨 Consideraciones de Seguridad

1. **Validación:** Siempre validar datos en backend
2. **Sanitización:** Limpiar contenido de usuarios
3. **Rate Limiting:** Limitar creación de reviews
4. **Autenticación:** Verificar usuario logueado
5. **Autorización:** Solo el autor puede editar/eliminar

---

**¿Listo para integrar?** Sigue estos pasos y todo debería funcionar sin problemas. Los servicios y composables están diseñados para una integración fluida.
