<template>
  <form class="buy-now-form" @submit.prevent="handleSubmit(onSubmit)">
    <label>
      Dirección de envío
      <input
        v-model="addressValue"
        :class="{ error: addressError && (addressMeta.touched || submitCount > 0) }"
        placeholder="Ingresa tu dirección"
        @blur="addressMeta.touched = true"
      />
      <span v-if="addressError && (addressMeta.touched || submitCount > 0)" class="error-msg">{{
        addressError
      }}</span>
    </label>
    <label>
      Método de pago
      <select
        v-model="paymentMethodValue"
        :class="{ error: paymentMethodError && (paymentMethodMeta.touched || submitCount > 0) }"
        @blur="paymentMethodMeta.touched = true"
      >
        <option value="">Selecciona</option>
        <option value="credit">Tarjeta de crédito</option>
        <option value="debit">Tarjeta de débito</option>
        <option value="paypal">PayPal</option>
      </select>
      <span
        v-if="paymentMethodError && (paymentMethodMeta.touched || submitCount > 0)"
        class="error-msg"
        >{{ paymentMethodError }}</span
      >
    </label>
  </form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { buyNowFormSchema } from '../../schema/buyNowFormSchema'

const props = defineProps<{ modelValue: any }>()
const emit = defineEmits(['update:modelValue'])

const { handleSubmit, submitCount, values } = useForm({
  validationSchema: toTypedSchema(buyNowFormSchema),
  initialValues: props.modelValue,
})

const { value: addressValue, errorMessage: addressError, meta: addressMeta } = useField('address')

const {
  value: paymentMethodValue,
  errorMessage: paymentMethodError,
  meta: paymentMethodMeta,
} = useField('paymentMethod')

watch(
  values,
  (val) => {
    emit('update:modelValue', val)
  },
  { deep: true },
)

function onSubmit() {
  emit('update:modelValue', values)
}
</script>

<style scoped>
.buy-now-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.buy-now-form input,
.buy-now-form select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ddd;
}
.error {
  border-color: #e53935;
}
.error-msg {
  color: #e53935;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}
</style>
