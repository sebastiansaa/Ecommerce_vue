<template>
  <nav class="nav">
    <div class="nav__section nav__section--left">
      <LogoButton />
    </div>
    <div class="nav__section nav__section--center" style="position: relative">
      <BaseButton class="base-btn-nav-desktop" @click="toggleCatMenu">{{ t('buy') }}</BaseButton>
    </div>
    <div class="nav__section nav__section--right">
      <RouterLink class="nav__link" to="/stores">{{ t('ourStores') }}</RouterLink>
      <RouterLink class="nav__link" to="/about">{{ t('about') }}</RouterLink>
      <IconButton
        class="icon-btn-nav-desktop"
        aria-label="Buscar"
        @click="handleSectionDesktop('search')"
        >🔍</IconButton
      >
      <IconButton
        class="icon-btn-nav-desktop"
        aria-label="Login"
        @click="handleSectionDesktop('login')"
        >👤</IconButton
      >
      <IconButton
        class="icon-btn-nav-desktop"
        aria-label="Preguntas"
        @click="handleSectionDesktop('faq')"
        >❓</IconButton
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
  <NavDesktopCat :show="showCatMenu" @select="handleCategory" />
</template>

<script setup>
import { IconButton, BaseButton, LogoButton } from '@/shared/components/ui/actions/buttons'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import NavDesktopCat from './NavDesktopCat.vue'
import { useNavigation } from '@/shared/composables'
import { ref } from 'vue'

const router = useRouter()
const { t } = useI18n()
const { handleCategory, handleSection, toggleLang, langText, navStore } = useNavigation()

function handleCategoryDesktop(category) {
  handleCategory(category)
}

function handleSectionDesktop(section) {
  handleSection(section)
}

const showCatMenu = ref(false)

function toggleCatMenu() {
  showCatMenu.value = !showCatMenu.value
  navStore.toggleNavCat()
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
}
.nav__section--center {
  display: flex;
  flex: 1;
  justify-content: center;
  gap: 1rem;
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
