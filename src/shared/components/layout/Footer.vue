<template>
  <footer class="footer">
    <div class="footer__container">
      <!-- Logo y descripción -->
      <div class="footer__section footer__section--brand">
        <h3 class="footer__brand">{{ t('appName', 'E-Commerce') }}</h3>
        <p class="footer__description">
          {{ t('footerDescription', 'Tu tienda online de confianza') }}
        </p>
      </div>

      <!-- Enlaces de navegación -->
      <div class="footer__section footer__section--nav">
        <h4 class="footer__title">{{ t('navigation', 'Navegación') }}</h4>
        <nav class="footer__links">
          <RouterLink class="footer__link" to="/stores">
            {{ t('ourStores') }}
          </RouterLink>
          <RouterLink class="footer__link" to="/about">
            {{ t('about') }}
          </RouterLink>
          <RouterLink class="footer__link" to="/faq">
            {{ t('faq') }}
          </RouterLink>
        </nav>
      </div>

      <!-- Información de contacto -->
      <div class="footer__section footer__section--contact">
        <h4 class="footer__title">{{ t('contact', 'Contacto') }}</h4>
        <div class="footer__contact">
          <p>{{ t('email', 'Email') }}: info@ecommerce.com</p>
          <p>{{ t('phone', 'Teléfono') }}: +1 234 567 890</p>
        </div>
      </div>

      <!-- Redes sociales -->
      <div class="footer__section footer__section--social">
        <h4 class="footer__title">{{ t('followUs', 'Síguenos') }}</h4>
        <div class="footer__social">
          <a href="#" class="footer__social-link" aria-label="Facebook">📘</a>
          <a href="#" class="footer__social-link" aria-label="Instagram">📷</a>
          <a href="#" class="footer__social-link" aria-label="Twitter">🐦</a>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="footer__bottom">
      <p class="footer__copyright">
        © {{ currentYear }} {{ t('appName', 'E-Commerce') }}.
        {{ t('allRightsReserved', 'Todos los derechos reservados') }}.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

const { t } = useI18n()
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: #1a1a1a;
  color: #e0e0e0;
  padding: 1.5rem 0 0.75rem;
  margin-top: 2rem;
  width: 100%;
}

.footer__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #333;
  box-sizing: border-box;
}

/* Responsive grid usando SHARED_CONFIG breakpoints */
@media (min-width: 768px) {
  .footer__container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer__container {
    grid-template-columns: 2fr repeat(3, 1fr);
  }
}

.footer__section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer__section--brand {
  gap: 0.35rem;
}

.footer__brand {
  font-size: 1.35rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.footer__description {
  font-size: 0.85rem;
  color: #b0b0b0;
  margin: 0;
  line-height: 1.4;
}

.footer__title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.35rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer__links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer__link {
  color: #b0b0b0;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.footer__link:hover {
  color: #ff9800;
}

.footer__contact {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.footer__contact p {
  margin: 0;
  font-size: 0.9rem;
  color: #b0b0b0;
}

.footer__social {
  display: flex;
  gap: 1rem;
}

.footer__social-link {
  font-size: 1.5rem;
  text-decoration: none;
  transition: transform 0.2s;
}

.footer__social-link:hover {
  transform: scale(1.2);
}

.footer__bottom {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.75rem 1rem 0;
  text-align: center;
  box-sizing: border-box;
}

.footer__copyright {
  margin: 0;
  font-size: 0.85rem;
  color: #808080;
}

/* Mobile adjustments - Versión minimalista */
@media (max-width: 767px) {
  .footer {
    padding: 1.5rem 0 1rem;
    margin-top: 2rem;
  }

  .footer__container {
    gap: 1rem;
    padding-bottom: 1rem;
  }

  /* Solo mostrar brand compacto y links en mobile */
  .footer__section--brand {
    text-align: center;
  }

  .footer__brand {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }

  .footer__description {
    display: none;
  }

  /* Links de navegación en línea horizontal */
  .footer__section--nav .footer__title {
    display: none;
  }

  .footer__section--nav .footer__links {
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .footer__link {
    font-size: 0.85rem;
  }

  /* Ocultar contacto y redes sociales en mobile */
  .footer__section--contact,
  .footer__section--social {
    display: none;
  }

  /* Copyright más compacto */
  .footer__bottom {
    padding: 1rem 1rem 0;
  }

  .footer__copyright {
    font-size: 0.75rem;
  }
}
</style>
