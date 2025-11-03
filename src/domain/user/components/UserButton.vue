<template>
  <div class="user-button-wrapper" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <!-- Usuario NO logueado -->
    <IconButton v-if="!user" class="icon-btn-nav-desktop" aria-label="Login" @click="goToLogin">
      <UserIcon class="user-icon" />
    </IconButton>

    <!-- Usuario logueado -->
    <button v-else class="user-button" @click="toggleMenu">
      <span class="user-greeting">{{ $t('user.greeting', 'Hola') }},</span>
      <span class="user-name">{{ firstName }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/domain/auth/store/useAuthStore'
import { IconButton } from '@/shared/components/ui/actions/buttons'
import { UserIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits<{
  'toggle-menu': []
  'mouse-enter': []
  'mouse-leave': []
}>()

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const firstName = computed(() => {
  if (!user.value?.name) return ''
  return user.value.name.split(' ')[0]
})

function goToLogin() {
  router.push({ name: 'login' })
}

function toggleMenu() {
  emit('toggle-menu')
}

function handleMouseEnter() {
  if (user.value) {
    emit('mouse-enter')
  }
}

function handleMouseLeave() {
  if (user.value) {
    emit('mouse-leave')
  }
}
</script>

<style scoped>
.user-button-wrapper {
  position: relative;
}

.user-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.user-button:hover {
  background: #f0f0f0;
}

.user-greeting {
  font-size: 0.9rem;
  color: #666;
}

.user-name {
  font-size: 1rem;
  color: #333;
  font-weight: 600;
}
</style>
