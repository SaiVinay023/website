<template>
  <div class="how-it-works">
    <section class="hero">
      <h1>{{ model.title }}</h1>
      <p>{{ model.subtitle }}</p>
    </section>
    <section class="steps">
      <div v-for="step in model.steps" :key="step.number" class="step">
        <div class="num">{{ step.number }}</div>
        <h3>{{ step.title }}</h3>
        <p>{{ step.description }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHomeStore } from '../stores/useHomeStore'

const store = useHomeStore()
const model = computed(() => store.operationalModel)
</script>

<style scoped>
/* layout for numbered steps */
</style>
