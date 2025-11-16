<script setup>
import { ref, onMounted } from 'vue';

const showBanner = ref(false);

// Revisamos si ya hay consentimiento en localStorage
onMounted(() => {
  const consent = localStorage.getItem('cookieConsent');
  showBanner.value = !consent;
});

const acceptCookies = () => {
  localStorage.setItem('cookieConsent', 'true');
  showBanner.value = false;
};

const closeBanner = () => {
  showBanner.value = false;
};
</script>

<template>
  <div v-if="showBanner" class="cookie-banner">
    <p>
      Este sitio utiliza <strong>Microsoft Clarity</strong> para analizar la interacción de los usuarios y mejorar la
      experiencia.
      Para más información, consulta nuestra
      <a href="/privacy-policy" target="_blank">Política de Privacidad</a>.
    </p>
    <div class="cookie-banner__buttons-container">
      <button @click="acceptCookies" class="cookie-banner__btn">Aceptar</button>
      <button @click="closeBanner" class="cookie-banner__close-btn">Cerrar</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cookie-banner {
  position: fixed;
  max-width: 25%;
  bottom: 1rem;
  left: 1rem;
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
  font-size: 0.75rem;
  gap: 1rem;
  font-family: $font-poppins;

  & p {
    margin: 0;
    flex: 1 1 auto;
  }

  &__buttons-container {
    width: 100%;
    display: flex;
    gap: 0.5rem;
    justify-content: end;

  }

  &__btn {
    background-color: $color-yellow;
    color: $color-black;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    cursor: pointer;
  }

  &__close-btn {
    border: 1px solid $color-white;
    color: $color-white;
    background-color: transparent;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    cursor: pointer;
  }
}

.cookie-banner a {
  color: $color-yellow;
  text-decoration: underline;
}
</style>
