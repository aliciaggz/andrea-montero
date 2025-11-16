<template>
  <component :is="href ? 'a' : 'button'" :href="href || undefined" :target="href ? target : undefined"
    :type="!href ? type : undefined" :id="id" :class="['base-btn', extraClass]" @click="handleClick">
    {{ label }}
  </component>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';

const props = defineProps<{
  label: string;
  href?: string;
  target?: string;
  type?: string;
  extraClass?: string;
  id?: string;
  onClick?: (e: Event) => void;
  scrollTargetId?: string; // ID del contenedor al que hacer scroll
}>();

const { label, href = '', target = '_self', type = 'button', extraClass = '', id = '', onClick = null } = props;




// ref para el contenedor que queremos scrollear
const containerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (props.scrollTargetId) {
    containerRef.value = document.getElementById(props.scrollTargetId);
  }
});

// función de scroll suave estilo iOS
const smoothScrollIOS = (target: HTMLElement) => {
  const targetPos = target.getBoundingClientRect().top + window.pageYOffset;
  const start = window.pageYOffset;
  const distance = targetPos - start;
  const duration = 700; // 0.7s
  let startTime: number | null = null;

  const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animate = (time: number) => {
    if (!startTime) startTime = time;
    const progress = Math.min((time - startTime) / duration, 1);
    window.scrollTo(0, start + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};

// función click
const handleClick = (event: Event) => {
  // Primero ejecutamos el onClick externo si existe
  if (onClick && typeof onClick === 'function') {
    onClick(event);
  }

  // Si no hay href y tenemos un contenedor, hacemos scroll
  if (!href && containerRef.value) {
    // toggle clase show
    containerRef.value.classList.toggle('show');
    if (containerRef.value.classList.contains('show')) {
      smoothScrollIOS(containerRef.value);
    }
  }
};



// const handleClick = (event: Event) => {
//   if (props.onClick && typeof props.onClick === 'function') {
//     props.onClick(event);
//   }
// };

// const toggleBtn = document.getElementById('toggle-phases');
// const container = document.getElementById('phases-container');

// const smoothScrollIOS = (target: HTMLElement) => {
//   const targetPos = target.getBoundingClientRect().top + window.pageYOffset;
//   const start = window.pageYOffset;
//   const distance = targetPos - start;
//   const duration = 700; // 0.7s estilo iOS
//   let startTime: number | null = null;

//   // curva iOS-like
//   const ease = (t: number) => {
//     return t < 0.5
//       ? 4 * t * t * t
//       : 1 - Math.pow(-2 * t + 2, 3) / 2;
//   };

//   const animate = (time: number) => {
//     if (!startTime) startTime = time;
//     const progress = Math.min((time - startTime) / duration, 1);

//     window.scrollTo(0, start + distance * ease(progress));

//     if (progress < 1) requestAnimationFrame(animate);
//   };

//   requestAnimationFrame(animate);
// };

// toggleBtn?.addEventListener('click', () => {
//   container?.classList.toggle('show');

//   // si se abre, animamos scroll suave
//   if (container?.classList.contains('show')) {
//     smoothScrollIOS(container);
//   }
// });
</script>

<style scoped lang="scss">
.base-btn {
  position: relative;
  overflow: hidden;
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 31.25rem;
  border: none;
  background-color: $color-black;
  color: $color-white;
  font-family: $font-poppins;
  font-size: $font-size-md;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
  z-index: 1;
}

/* efecto burbuja */
.base-btn::before {
  content: "";
  position: absolute;
  bottom: -110%;
  left: 35%;
  width: 3rem;
  height: 3rem;
  background: $color-blue-electric;
  border-radius: 100%;
  box-shadow:
    1.5rem 1rem 0 -0.5rem $color-blue-electric,
    -1.8rem 1.25rem 0 0 $color-blue-electric;
  transition: transform 0.4s ease;
  z-index: -1;
}

.base-btn:hover::before {
  transform: translateY(-75%) scale(1);
}

.base-btn>* {
  position: relative;
  z-index: 1;
}
</style>
