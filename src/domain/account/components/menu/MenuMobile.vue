<template>
  <nav class="tab-bar">
    <button
      v-for="item in menuItems"
      :key="item.key"
      :class="['tab-btn', { active: item.key === modelValue }]"
      @click="$emit('update:modelValue', item.key)"
    >
      <span class="tab-icon"><component :is="item.icon" /></span>
      <span class="tab-label">{{ item.label }}</span>
    </button>
    <button class="tab-btn logout-btn" @click="handleLogout">
      <span class="tab-icon"><ArrowRightOnRectangleIcon /></span>
      <span class="tab-label">{{ t('logout') }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import {
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()

const menuItems = [
  { key: 'profile', label: 'Perfil', icon: UserIcon },
  { key: 'orders', label: 'Compras', icon: ShoppingBagIcon },
  { key: 'wishlist', label: 'Lista de deseos', icon: HeartIcon },
  { key: 'security', label: 'Seguridad', icon: LockClosedIcon },
]

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
  z-index: 100;
}
.tab-btn {
  background: none;
  border: none;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
  font-size: 0.85rem;
  padding: 0.2rem 0;
  transition: color 0.2s;
}
.tab-btn.active {
  color: #2d6cdf;
}
.tab-icon {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tab-label {
  font-size: 0.75rem;
  margin-top: 0.1rem;
}
.logout-btn {
  color: #d32f2f;
}
.logout-btn:hover {
  color: #b71c1c;
}
</style>
