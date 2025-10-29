<template>
  <div class="nav-wrapper">
    <nav class="nav">
      <div class="nav__section nav__section--left">
        <LogoButton />
        <button class="nav__burger" @click="isOpen = !isOpen" aria-label="Abrir menú">
          <span v-if="!isOpen">&#9776;</span>
          <span v-else>✕</span>
        </button>
      </div>
      <div class="nav__section nav__section--right">
        <div class="nav__right-icons">
          <button
            class="icon-btn-nav-movil"
            aria-label="Carrito"
            @click="handleSectionMobile('cart')"
          >
            🛒
          </button>
          <button class="nav__lang-btn" @click="toggleLang">
            <span>{{ langText }}</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- SearchBar debajo del nav en móvil -->
    <div class="nav__searchbar-mobile">
      <SearchBar />
    </div>

    <NavMobileDrawer
      :isOpen="isOpen"
      @update:isOpen="isOpen = $event"
      @selectCategory="handleCategoryMobile"
      @selectSection="handleSectionMobile"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useNavigation } from '@/shared/composables'
import { LogoButton } from '@/shared/components/ui/actions/buttons'
import { SearchBar } from '@/domain/products/search/components'
import NavMobileDrawer from './NavMobileDrawer.vue'

const { handleCategory, handleSection, toggleLang, langText } = useNavigation()
const isOpen = ref(false)
function handleCategoryMobile(category) {
  handleCategory(category, true)
  isOpen.value = false
}

function handleSectionMobile(section) {
  handleSection(section, true)
  isOpen.value = false
}
</script>

<style scoped>
.icon-btn-nav-movil {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #222;
  margin-right: 0;
  transition: background 0.2s;
  border-radius: 50%;
  padding: 0.5rem;
}
.icon-btn-nav-movil:hover {
  background: #ececec;
}

.nav__section--right {
  position: absolute;
  right: 0.2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  z-index: 3;
}

.nav__right-icons {
  display: flex;
  gap: 0.05rem;
  margin-right: 0;
  align-items: center;
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
.nav-wrapper {
  position: relative;
}
.nav {
  min-height: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.5rem 1rem;
  background: #f8f8f8;
  border-bottom: 1px solid #eee;
  border-radius: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
}
.nav__section--left {
  flex: 1;
  justify-content: center;
  position: relative;
  min-height: 56px;
  height: 56px;
}
.nav__logo-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  z-index: 1;
}
.nav__burger {
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  z-index: 2;
  display: block !important;
  color: #222;
}
.nav__mobile-menu--under-nav {
  margin-top: 56px;
  background: var(--color-background);
  width: 100vw;
  min-height: calc(100vh - 56px);
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  z-index: 100;
}
.nav__mobile-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
  background: transparent;
}
.nav__mobile-group--actions {
  background: var(--color-background);
  border-radius: 12px;
  padding: 1.25rem 0.75rem;
  margin-bottom: 0;
  margin-top: 2rem;
  flex: unset;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.75rem;
}
.nav__mobile-group--categories {
  margin-bottom: 2.5rem;
  background: var(--color-background);
  border-radius: 12px;
  padding: 1.25rem 0.75rem;
}

.nav__searchbar-mobile {
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  padding: 0.75rem 1rem;
  background: #ffffff;
  border-bottom: 1px solid #e0e7ef;
  z-index: 1999;
}

@media (min-width: 768px) {
  .nav__searchbar-mobile {
    display: none;
  }
}
</style>
