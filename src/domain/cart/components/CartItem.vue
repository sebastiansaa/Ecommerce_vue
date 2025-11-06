<template>
  <div class="cart-item">
    <div class="cart-item__image">
      <img :src="item.product.images[0]" :alt="item.product.title" />
    </div>
    <div class="cart-item__details">
      <h3 class="cart-item__name">{{ item.product.title }}</h3>
      <p class="cart-item__price">${{ item.product.price.toFixed(2) }}</p>
    </div>
    <div class="cart-item__quantity">
      <button @click="decreaseQuantity" class="quantity-btn">-</button>
      <span class="quantity">{{ item.quantity }}</span>
      <button @click="increaseQuantity" class="quantity-btn">+</button>
    </div>
    <div class="cart-item__total">
      <p>${{ (item.product.price * item.quantity).toFixed(2) }}</p>
    </div>
    <div class="cart-item__remove">
      <BaseAccountButton @click="$emit('remove')">
        <TrashIcon class="icon" />
      </BaseAccountButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/outline'
import type { CartItem } from '../interface'
import { BaseAccountButton } from '@/shared/components/ui/actions/buttons'

const props = defineProps<{ item: CartItem }>()
const emit = defineEmits(['updateQuantity', 'remove'])

function increaseQuantity() {
  emit('updateQuantity', props.item.product.id, props.item.quantity + 1)
}

function decreaseQuantity() {
  if (props.item.quantity > 1) {
    emit('updateQuantity', props.item.product.id, props.item.quantity - 1)
  }
}
</script>

<style scoped>
.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem;
  background: #fff;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  margin-bottom: 1rem;
}

.cart-item__image img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.cart-item__name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.cart-item__price {
  font-size: 1rem;
  color: #64748b;
}

.cart-item__quantity {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.quantity-btn {
  background: #f1f5f9;
  border: none;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background 0.2s;
}

.quantity-btn:hover {
  background: #e2e8f0;
}

.quantity {
  font-size: 1rem;
  font-weight: 600;
  min-width: 2rem;
  text-align: center;
}

.cart-item__total {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
}

.icon {
  width: 1.2rem;
  height: 1.2rem;
}

@media (max-width: 768px) {
  .cart-item {
    grid-template-columns: 80px 1fr auto;
    gap: 1rem;
    padding: 1rem;
  }

  .cart-item__quantity,
  .cart-item__total {
    grid-column: 2 / 3;
  }

  .cart-item__remove {
    grid-column: 3 / 4;
    grid-row: 1 / 3;
  }
}
</style>
