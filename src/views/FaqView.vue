<template>
  <div class="faq-container">
    <h1>Preguntas Frecuentes</h1>
    <div class="faq-content">
      <div class="faq-item">
        <h3>¿Cómo puedo realizar un pedido?</h3>
        <p>
          Navega por nuestros productos, añade los que desees a tu carrito y procede al checkout.
        </p>
      </div>
      <div class="faq-item">
        <h3>¿Cuáles son los métodos de pago disponibles?</h3>
        <p>Aceptamos tarjetas de crédito, débito y PayPal.</p>
      </div>
      <div class="faq-item">
        <h3>¿Cuánto tarda la entrega?</h3>
        <p>El tiempo de entrega varía entre 3-7 días hábiles dependiendo de tu ubicación.</p>
      </div>
      <div class="faq-item">
        <h3>¿Puedo devolver un producto?</h3>
        <p>Sí, tienes 30 días para devolver cualquier producto en perfecto estado.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vista temporal de FAQ
</script>

<style scoped>
.faq-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.faq-content {
  margin-top: 2rem;
}

.faq-item {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.faq-item h3 {
  margin-bottom: 1rem;
  color: #333;
}

.faq-item p {
  color: #666;
  line-height: 1.6;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}
</style>
