<template>
  <Drawer :modelValue="isOpen" @update:modelValue="updateIsOpen">
    <div class="nav__mobile-menu nav__mobile-menu--under-nav">
      <div class="nav__mobile-group nav__mobile-group--categories">
        <BaseButton
          v-for="cat in categories"
          :key="cat.key"
          class="base-btn-nav-movil"
          @click="handleCategoryMobile(cat.key)"
        >
          {{ t(cat.label) }}
        </BaseButton>
      </div>
      <div class="nav__mobile-group nav__mobile-group--actions">
        <BaseButton class="base-btn-nav-movil" @click="handleSectionMobile('login')">{{
          t('account')
        }}</BaseButton>
        <BaseButton class="base-btn-nav-movil" @click="handleSectionMobile('stores')">{{
          t('ourStores')
        }}</BaseButton>
        <BaseButton class="base-btn-nav-movil" @click="handleSectionMobile('about')">{{
          t('about')
        }}</BaseButton>
      </div>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import Drawer from '@/shared/components/ui/display/Drawer.vue'
import BaseButton from '@/shared/components/ui/actions/buttons/BaseButton.vue'
import { useNavigation } from '@/shared/composables'

import { categories } from '@/shared/helpers/categories'
const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['update:isOpen', 'selectCategory', 'selectSection'])

const { t } = useI18n()
const { handleCategory, handleSection } = useNavigation()

function handleCategoryMobile(category: string) {
  handleCategory(category, true)
  emit('selectCategory', category)
  emit('update:isOpen', false)
}

function handleSectionMobile(section: string) {
  handleSection(section, true)
  emit('selectSection', section)
  emit('update:isOpen', false)
}

function updateIsOpen(value: boolean) {
  emit('update:isOpen', value)
}
</script>

<style scoped>
.nav__mobile-menu--under-nav {
  margin-top: calc(56px + 64px); /* Nav (56px) + SearchBar (~64px) */
  background: var(--color-background);
  width: 100vw;
  min-height: calc(100vh - 56px - 64px);
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  z-index: 100;
  padding-top: 1rem; /* Gap interno en vez de margin */
}
.nav__mobile-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
  background: transparent;
}
.nav__mobile-group--actions {
  background: transparent;
  border-radius: 0;
  padding: 0;
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
  background: transparent;
  border-radius: 0;
  padding: 0;
}
.base-btn-nav-movil {
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0;
  background: transparent !important;
  color: #222;
  border: none;
  cursor: pointer;
  transition: none;
  text-align: left;
}
</style>
