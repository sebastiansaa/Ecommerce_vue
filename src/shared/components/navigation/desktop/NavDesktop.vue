<template>
  <nav class="nav">
    <div class="nav__section nav__section--left">
      <LogoButton />
    </div>

    <div class="nav__section nav__section--center">
      <SearchBar />
    </div>

    <div class="nav__section nav__section--right">
      <!-- Botón de Usuario con Drawer -->
      <UserButton
        @toggle-menu="isUserMenuOpen = !isUserMenuOpen"
        @mouse-enter="handleUserMenuHover(true)"
        @mouse-leave="handleUserMenuHover(false)"
      />

      <IconButton
        class="icon-btn-nav-desktop"
        aria-label="Lista de deseos"
        @click="handleSectionDesktop('wishlist')"
        >❤️</IconButton
      >
      <IconButton
        class="icon-btn-nav-desktop"
        aria-label="Carrito"
        @click="handleSectionDesktop('cart')"
        >🛒</IconButton
      >
      <div class="nav__section--lang">
        <button class="nav__lang-btn" @click="toggleLang">
          <span>{{ langText }}</span>
        </button>
      </div>
    </div>
  </nav>
  <NavDesktopCat @select="handleCategory" />

  <!-- User Menu Drawer -->
  <UserMenuDrawer v-model:is-open="isUserMenuOpen" />
</template>

<script setup>
import { ref } from 'vue'
import { IconButton, LogoButton } from '@/shared/components/ui/actions/buttons'
import { SearchBar } from '@/domain/products/search/components'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import NavDesktopCat from './NavDesktopCat.vue'
import UserButton from '../UserButton.vue'
import UserMenuDrawer from '../UserMenuDrawer.vue'
import { useNavigation } from '@/shared/composables'

const router = useRouter()
const { t } = useI18n()
const { handleCategory, handleSection, toggleLang, langText, navStore } = useNavigation()

const isUserMenuOpen = ref(false)
let hoverTimeout = null

function handleSectionDesktop(section) {
  handleSection(section)
}

function handleUserMenuHover(isEntering) {
  // Abrir el menú cuando el mouse entra (con un pequeño delay)
  if (isEntering) {
    clearTimeout(hoverTimeout)
    hoverTimeout = setTimeout(() => {
      isUserMenuOpen.value = true
    }, 200)
  } else {
    // No cerrar automáticamente al salir, dejar que el usuario cierre manualmente
    clearTimeout(hoverTimeout)
  }
}
</script>

<style scoped>
.nav__link {
  color: #222;
  text-decoration: none;
  font-size: 1rem;
  margin: 0 0.5rem;
  transition:
    background 0.2s,
    color 0.2s,
    box-shadow 0.2s;
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
}
.nav__link:hover {
  background: #ececec;
  color: #181818;
  box-shadow: 0 2px 8px rgba(60, 60, 60, 0.04);
}
.icon-btn-nav-desktop {
  color: #222;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.2rem;
  border-radius: 50%;
  transition:
    background 0.2s,
    color 0.2s;
}
.icon-btn-nav-desktop:hover {
  background: #ececec;
  color: #181818;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 1rem;
  background: #ffffff;
  border-bottom: 1px solid #e0e7ef;
  border-radius: 18px;
  margin: 0 auto;
  max-width: 1280px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
}
.nav__section--left {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.nav__section--center {
  display: flex;
  flex: 0 0 45%;
  justify-content: center;
  padding: 0 1rem;
}
.nav__section--right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.nav__section--lang {
  margin-left: 2rem;
}
.nav__lang-btn {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #222;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background 0.2s;
}
.nav__lang-btn:hover {
  background: #f0f0f0;
}
</style>
