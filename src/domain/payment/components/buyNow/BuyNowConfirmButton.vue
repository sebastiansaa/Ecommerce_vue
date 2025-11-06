<template>
  <BasePaymentButton @click="$emit('confirm')">Confirmar compra</BasePaymentButton>
</template>

<script setup>
import { BasePaymentButton } from '@/shared/components/ui/actions/buttons'
</script>
