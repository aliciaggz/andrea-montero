<template>
  <button v-show="visible" @click="scrollToTop" class="scroll-top-btn" aria-label="Volver arriba">
    ↑
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const visible = ref(false);

const checkScroll = () => {
  visible.value = window.scrollY > 400;
};

// Scroll suave tipo iOS
const scrollToTop = () => {
  const start = window.pageYOffset;
  const duration = 700;
  let startTime = null;

  const ease = (t) =>
    t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animate = (time) => {
    if (!startTime) startTime = time;
    const progress = Math.min((time - startTime) / duration, 1);
    window.scrollTo(0, start * (1 - ease(progress)));
    if (progress < 1) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<style scoped lang="scss">
.scroll-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 999px;
  border: none;
  background-color: $color-red;
  color: white;
  font-size: 1.8rem;
  font-weight: 200;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, color 0.3s ease;
  z-index: 9999;
}

.scroll-top-btn:hover {
  background-color: $color-turquoise;
  color: $color-black;
}
</style>
