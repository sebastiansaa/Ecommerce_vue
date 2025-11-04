<template>
  <nav class="account-menu-desktop">
    <ul>
      <li v-for="item in menuItems" :key="item.key">
        <button
          :class="['menu-btn', { active: item.key === modelValue }]"
          @click="$emit('update:modelValue', item.key)"
        >
          <span class="menu-icon"><component :is="item.icon" /></span>
          <span class="menu-label">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { UserIcon, ShoppingBagIcon, HeartIcon, LockClosedIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])

const menuItems = [
  { key: 'profile', label: 'Perfil', icon: UserIcon },
  { key: 'orders', label: 'Compras', icon: ShoppingBagIcon },
  { key: 'wishlist', label: 'Lista de deseos', icon: HeartIcon },
  { key: 'security', label: 'Seguridad', icon: LockClosedIcon },
]
</script>

<style scoped>
.account-menu-desktop {
  width: 220px;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 1.5rem 0.5rem;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.menu-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: none;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  transition: background 0.2s;
}
.menu-btn.active,
.menu-btn:hover {
  background: #f0f4fa;
  color: #2d6cdf;
}
.menu-icon {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu-label {
  flex: 1;
  text-align: left;
}
</style>
