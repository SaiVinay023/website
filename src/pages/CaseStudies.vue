<template>
  <div class="case-studies">
    <section class="hero">
      <h1>Case Studies</h1>
      <p>Real transformations from real businesses</p>
    </section>
    <section class="list">
      <div
        v-for="cs in all"
        :key="cs.id"
        class="case-card"
      >
        <h2>{{ cs.client }}</h2>
        <p><strong>Challenge:</strong> {{ cs.challenge }}</p>
        <p><strong>Solution:</strong> {{ cs.solution }}</p>
        <ul>
          <li v-for="result in cs.results" :key="result">{{ result }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import caseStudiesData from '../data/caseStudies.json'

const all = computed(() => caseStudiesData.caseStudies)
</script>

<style scoped>
/* simple card list */
</style>
