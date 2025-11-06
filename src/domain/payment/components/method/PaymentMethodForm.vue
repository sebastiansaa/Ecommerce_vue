<template>
  <form class="card-form" @submit.prevent="handleSubmit(onSubmit)">
    <h3 class="form-title">Agregar tarjeta de crédito</h3>
    <div class="form-group">
      <label for="holder">Titular</label>
      <Field name="holder" v-slot="{ field, errors }">
        <input v-bind="field" id="holder" type="text" placeholder="Nombre completo" />
        <span class="error" v-if="errors[0]">{{ errors[0] }}</span>
      </Field>
    </div>
    <div class="form-group">
      <label for="number">Número</label>
      <Field name="number" v-slot="{ field, errors }">
        <input
          v-bind="field"
          id="number"
          type="text"
          maxlength="16"
          placeholder="1234 5678 9012 3456"
        />
        <span class="error" v-if="errors[0]">{{ errors[0] }}</span>
      </Field>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="expiry">Vencimiento</label>
        <Field name="expiry" v-slot="{ field, errors }">
          <input v-bind="field" id="expiry" type="text" maxlength="5" placeholder="MM/AA" />
          <span class="error" v-if="errors[0]">{{ errors[0] }}</span>
        </Field>
      </div>
      <div class="form-group">
        <label for="brand">Marca</label>
        <Field name="brand" v-slot="{ field, errors }">
          <input v-bind="field" id="brand" type="text" placeholder="Visa, Mastercard..." />
          <span class="error" v-if="errors[0]">{{ errors[0] }}</span>
        </Field>
      </div>
    </div>
    <div class="form-actions">
      <BaseAccountButton type="submit"><CheckIcon class="icon" /> Guardar</BaseAccountButton>
      <BaseAccountButton @click="$emit('close')">
        <XMarkIcon class="icon" /> Cancelar
      </BaseAccountButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Field, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { creditCardFormSchema } from '@/domain/payment/schema'
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { v4 as uuidv4 } from 'uuid'
import { BaseAccountButton } from '@/shared/components/ui/actions/buttons'
import type { CreditCard } from '@/domain/payment/interface'

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(creditCardFormSchema),
})

function onSubmit(values: Omit<CreditCard, 'id'>) {
  // Generar id único para la tarjeta
  const card = { ...values, id: uuidv4() }
  // Emitir evento para agregar tarjeta
  emit('add', card)
  emit('close')
}

const emit = defineEmits(['add', 'close'])
</script>

<style scoped>
.card-form {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 2rem;
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.form-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.form-row {
  display: flex;
  gap: 1rem;
}
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
.submit-btn {
  background: #22c55e;
  color: #fff;
  border: none;
  font-size: 1rem;
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: background 0.2s;
}
.submit-btn:hover {
  background: #16a34a;
}
.cancel-btn {
  background: #e5e7eb;
  color: #222;
  border: none;
  font-size: 1rem;
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: background 0.2s;
}
.cancel-btn:hover {
  background: #d1d5db;
}
.icon {
  width: 1.1rem;
  height: 1.1rem;
}
.error {
  color: #dc2626;
  font-size: 0.95rem;
}
</style>
