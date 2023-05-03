<script setup lang="ts">
import drr from './components/drr.vue'
</script>

<template>
  <drr :x="300" :y="300" :width="400" :height="267" :aspectRatio="true">
    <img class="image" src="./assets/8s.jpg" alt="Vue logo" />
  </drr>
</template>

<style>
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
