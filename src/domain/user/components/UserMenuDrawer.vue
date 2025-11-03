<template>
  <div v-if="isOpen" class="user-menu-drawer-overlay" @click="$emit('update:isOpen', false)"></div>
  <transition name="slide-left">
    <div v-if="isOpen" class="user-menu-drawer">
      <div class="drawer-content">
        <!-- Header -->
        <div class="drawer-header">
          <h3 class="drawer-title">{{ $t('user.menu.title', 'Mi Cuenta') }}</h3>
          <button class="drawer-close" @click="$emit('update:isOpen', false)" aria-label="Cerrar">
            <XMarkIcon class="icon-close" />
          </button>
        </div>

        <!-- Secciones -->
        <div class="drawer-sections">
          <!-- Lado Izquierdo: Shopping -->
          <div class="drawer-column drawer-column--left">
            <h4 class="column-title">{{ $t('user.menu.shopping', 'Compras') }}</h4>
            <nav class="menu-list">
              <button class="menu-item" @click="navigateTo('wishlist')">
                <HeartIcon class="menu-icon" />
                <span class="menu-text">{{ $t('user.menu.wishlist', 'Lista de Deseos') }}</span>
              </button>
              <button class="menu-item" @click="navigateTo('cart')">
                <ShoppingCartIcon class="menu-icon" />
                <span class="menu-text">{{ $t('user.menu.cart', 'Carrito de Compras') }}</span>
              </button>
              <button class="menu-item" @click="navigateTo('clothes')">
                <SparklesIcon class="menu-icon" />
                <span class="menu-text">{{ $t('user.menu.discover', 'Encuentra Más') }}</span>
              </button>
            </nav>
          </div>

          <!-- Lado Derecho: Account -->
          <div class="drawer-column drawer-column--right">
            <h4 class="column-title">{{ $t('user.menu.account', 'Mi Cuenta') }}</h4>
            <nav class="menu-list">
              <button class="menu-item" @click="navigateTo('account')">
                <UserIcon class="menu-icon" />
                <span class="menu-text">{{ $t('user.menu.profile', 'Cuenta') }}</span>
              </button>
              <button class="menu-item" @click="navigateTo('user-orders')">
                <ShoppingBagIcon class="menu-icon" />
                <span class="menu-text">{{ $t('user.menu.orders', 'Pedidos Realizados') }}</span>
              </button>
              <button class="menu-item" @click="navigateTo('user-reviews')">
                <StarIcon class="menu-icon" />
                <span class="menu-text">{{ $t('user.menu.reviews', 'Reseñas') }}</span>
              </button>
            </nav>
          </div>
        </div>

        <!-- Footer: Logout -->
        <div class="drawer-footer">
          <button class="logout-button" @click="handleLogout">
            <ArrowRightOnRectangleIcon class="logout-icon" />
            <span class="logout-text">{{ $t('user.menu.logout', 'Cerrar Sesión') }}</span>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import {
  HeartIcon,
  ShoppingCartIcon,
  SparklesIcon,
  UserIcon,
  ShoppingBagIcon,
  StarIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

const router = useRouter()
const authStore = useAuthStore()

function navigateTo(routeName: string) {
  emit('update:isOpen', false)
  router.push({ name: routeName })
}

function handleLogout() {
  authStore.logout()
  emit('update:isOpen', false)
  router.push({ name: 'home' })
}
</script>

<style scoped>
.user-menu-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.user-menu-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 30%;
  min-width: 350px;
  max-width: 450px;
  background: #ffffff;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  z-index: 3000;
  display: flex;
  flex-direction: column;
}

.drawer-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e7ef;
}

.drawer-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.drawer-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 0.25rem;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.icon-close {
  width: 1.5rem;
  height: 1.5rem;
}

.drawer-close:hover {
  background: #f0f0f0;
}

.drawer-sections {
  flex: 1;
  display: flex;
  gap: 1px;
  background: #e0e7ef;
  overflow-y: auto;
}

.drawer-column {
  flex: 1;
  background: #ffffff;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.column-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 0.5rem 0;
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
  text-align: left;
  width: 100%;
}

.menu-item:hover {
  background: #f5f7fa;
}

.menu-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  color: #666;
}

.menu-text {
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
}

.drawer-footer {
  padding: 1.5rem;
  border-top: 1px solid #e0e7ef;
}

.logout-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.logout-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.logout-button:active {
  transform: translateY(0);
}

.logout-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Transitions */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(100%);
}

/* Responsive */
@media (max-width: 768px) {
  .user-menu-drawer {
    width: 85%;
    min-width: unset;
  }

  .drawer-sections {
    flex-direction: column;
  }
}
</style>
