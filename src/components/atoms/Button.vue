<template>
  <component :is="href ? 'a' : 'button'" :href="href || undefined" :target="href ? target : undefined"
    :type="!href ? type : undefined" :id="id" :class="['base-btn', extraClass]" @click="handleClick">
    {{ label }}
  </component>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  label: string;
  href?: string;
  target?: string;
  type?: string;
  extraClass?: string;
  id?: string;
  onClick?: (e: Event) => void;
}>();

const { label, href = '', target = '_self', type = 'button', extraClass = '', id = '', onClick = null } = props;


const handleClick = (event: Event) => {
  if (props.onClick && typeof props.onClick === 'function') {
    props.onClick(event);
  }
};
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
