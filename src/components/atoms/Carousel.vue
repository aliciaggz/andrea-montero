<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  slides: {
    type: Array,
    required: true
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  interval: {
    type: Number,
    default: 3000
  }
});

const current = ref(0);
let timer = null;

function next() {
  current.value = (current.value + 1) % props.slides.length;
}

function prev() {
  current.value = (current.value - 1 + props.slides.length) % props.slides.length;
}

onMounted(() => {
  if (props.autoplay) {
    timer = setInterval(next, props.interval);
  }
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div class="carousel">
    <!-- Navigation arrows -->
    <button class="carousel__nav carousel__nav--prev" @click="prev">&lt;</button>
    <button class="carousel__nav carousel__nav--next" @click="next">&gt;</button>

    <!-- Slides track -->
    <div class="carousel__track">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="carousel__slide"
        :class="{ 'carousel__slide--active': index === current }"
      >
        <slot :name="'slide-' + index">{{ slide }}</slot>
      </div>
    </div>

    <!-- Dots -->
    <div class="carousel__dots">
      <button
        v-for="(_, i) in slides"
        :key="i"
        :class="{ active: i === current }"
        @click="current = i"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel__track {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel__slide {
  min-width: 100%;
  flex-shrink: 0;
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.carousel__slide--active {
  opacity: 1;
}

.carousel__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.3);
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  z-index: 10;
}

.carousel__nav--prev { left: 1rem; }
.carousel__nav--next { right: 1rem; }

.carousel__dots {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.carousel__dots button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  margin: 0 5px;
  background: #ccc;
  cursor: pointer;
}

.carousel__dots button.active {
  background: #007bff;
}
</style>
