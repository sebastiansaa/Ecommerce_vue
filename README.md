Esta aplicación ecommerce, construida con Vue 3, Pinia y TypeScript, ofrece una experiencia completa y profesional tanto para usuarios como para administradores. Permite autenticación segura con JWT, registro, login social, recuperación y refresco de sesión. Los usuarios pueden explorar un catálogo de productos, buscar, filtrar por categorías, ver detalles, agregar al carrito y realizar compras simuladas con gestión de pagos. El sistema maneja inventario y stock en tiempo real, permitiendo actualizar cantidades y evitar compras de productos agotados.

Los administradores pueden gestionar productos, categorías, usuarios y órdenes desde un panel dedicado, con control de roles y permisos. Se pueden crear, editar y eliminar productos, subir imágenes, y administrar el inventario de manera eficiente. La app soporta reseñas y valoraciones de productos, permitiendo a los usuarios dejar feedback y consultar opiniones antes de comprar.

La arquitectura modular por dominios facilita la escalabilidad y el mantenimiento, integrando validación robusta, internacionalización (i18n), notificaciones y pruebas unitarias/E2E. El estado de la sesión y los datos clave se persisten automáticamente, garantizando una experiencia fluida incluso tras recargar la página.

En resumen, esta app cubre todo el ciclo de un ecommerce moderno: autenticación, gestión de usuarios y roles, catálogo, carrito, pagos, inventario, administración, reviews y más, lista para producción y personalización.

# Ecommerce Vue 3

Proyecto ecommerce modular con Vue 3, Pinia, TypeScript, Vite y autenticación JWT profesional.

## Características principales

- Vue 3 + TypeScript + Vite
- Pinia para gestión de estado global
- Autenticación JWT (login, registro, social, refresh token, expiración, restauración de sesión)
- Manejo de roles y permisos (admin/customer)
- Validación con Zod y Vee-Validate
- Vue Query para peticiones asíncronas y caché
- Vue Router y Vue I18n (internacionalización)
- Toasts de notificación
- Axios para HTTP requests
- Estructura modular por dominio (auth, user, payment, products, etc.)
- Tests unitarios (Vitest) y E2E (Playwright)

## Scripts útiles

- `npm run dev` — Iniciar servidor de desarrollo
- `npm run build` — Compilar para producción
- `npm run preview` — Previsualizar build
- `npm run test:unit` — Ejecutar tests unitarios (Vitest)
- `npm run test:e2e` — Ejecutar tests end-to-end (Playwright)
- `npm run lint` — Lint automático
- `npm run format` — Formatear código con Prettier

## Dependencias principales

- vue, pinia, vue-router, vue-i18n
- axios, @tanstack/vue-query, zod, vee-validate
- vue-toastification, uuid, jwt-decode

## Estructura recomendada

```
src/
  domain/
    auth/
      store/
      services/
      schema/
      interface/
      Composable/
    user/
    payment/
    products/
  shared/
    api/
    components/
    composables/
    helpers/
    services/
  views/
  assets/
```

## API

- Base: `https://api.escuelajs.co/api/v1`
- Endpoints principales: `/auth/login`, `/auth/register`, `/auth/profile`, `/auth/refresh-token`

## Notas

- El store de auth maneja sesión, persistencia, expiración y roles.
- Los tests unitarios y E2E están listos para ser implementados.
- Sigue buenas prácticas de arquitectura y separación de dominios.

---

Desarrollado por Sebastian Saavedra
