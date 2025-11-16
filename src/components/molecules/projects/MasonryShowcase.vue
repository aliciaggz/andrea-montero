<template>
  <section class="masonry-section" :style="`--columns:${columns}; --bg:${bgColorImg}`">
    <div class="grid" ref="grid">
      <div class="grid-sizer"></div>
      <div class="grid-item" v-for="img in images" :key="img.src">
        <img class="grid-item__image" :src="img.src.src" :alt="img.alt || ''" loading="lazy" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

const props = defineProps({
  images: { type: Array, required: true },
  columns: { type: Number, default: 3 },
  bgColorImg: { type: String, default: '#ABC8FF' },
});

const grid = ref(null);

const initMasonry = () => {
  if (!grid.value) return;
  imagesLoaded(grid.value, () => {
    new Masonry(grid.value, {
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
      gutter: 14,
    });
  });
};

onMounted(() => {
  initMasonry();
});

// Opcional: reinicializar cada vez que las imágenes cambien
watch(() => props.images, () => {
  initMasonry();
});
</script>

<style lang="scss" scoped>
.masonry-section {
  margin-top: 3rem;
  margin-bottom: 6rem;
  border-radius: 1rem;
  margin-inline: 2rem;
  margin-inline: 0;
  padding-inline: 0;
}

.grid {
  margin: 0 auto;
  width: 100%;
}

/* Define el ancho de las columnas */
.grid-sizer,
.grid-item {
  width: calc(100% / var(--columns) - 0.933rem); // resta el gutter
}

.grid-item {
  margin-bottom: 2rem;
  background-color: var(--bg);
  padding: 1rem; // reducimos padding interno
  border-radius: 1rem;
  overflow: hidden;
  // box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &__image {
    width: 100%;
    height: auto;
    display: block;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
  }
}

/* Responsive */
@media (max-width: 900px) {

  .grid-sizer,
  .grid-item {
    width: 48%;
  }
}

@media (max-width: 600px) {

  .grid-item {
    margin-bottom: 1rem;
  }

  .masonry-section {
    --columns: 2;
    /* incluso en móvil, 2 columnas en vez de 1 */
  }

}
</style>
