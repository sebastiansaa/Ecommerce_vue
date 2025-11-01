<template>
  <div class="user-profile-card-mobile">
    <div v-if="user" class="profile-container">
      <div class="avatar-section">
        <img v-if="user.avatar" :src="user.avatar" alt="Avatar" class="avatar" />
        <div v-else class="avatar-placeholder">
          <span>{{ getInitials(user) }}</span>
        </div>
      </div>
      <div class="info-section">
        <h2 class="user-name">{{ formatUserName(user) }}</h2>
        <p class="user-email">{{ formatUserEmail(user) }}</p>
        <span class="user-role">{{ getUserRoleLabel(user) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserProfile } from '@/domain/user/interface'
import { formatUserName, formatUserEmail, getUserRoleLabel } from '@/domain/user/helpers'

defineProps<{
  user: UserProfile | null
}>()

function getInitials(user: UserProfile) {
  const name = user.name || user.email
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}
</script>

<style scoped>
.user-profile-card-mobile {
  width: 100%;
  padding: 1rem;
}

.profile-container {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.avatar-section {
  margin-bottom: 0.5rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e0e0e0;
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #e0e0e0;
}

.avatar-placeholder span {
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
}

.info-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.user-name {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.user-email {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

.user-role {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
}
</style>
