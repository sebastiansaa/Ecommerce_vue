# ecommerce

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

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

Desarrollado por [Tu Nombre]
