<template>
  <div class="about">
    <section class="hero">
      <h1>About {{ info.name }}</h1>
      <p>{{ info.tagline }}</p>
    </section>
    <section class="company">
      <p>{{ info.description }}</p>
      <ul class="contact">
        <li>Email: {{ info.email }}</li>
        <li>Phone: {{ info.phone }}</li>
        <li>{{ info.address.city }}, {{ info.address.country }}</li>
      </ul>
    </section>
    <section class="philosophy">
      <h2>{{ philosophy.title }}</h2>
      <p>{{ philosophy.subtitle }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import contentData from '../data/content.json'

const info = computed(() => contentData.company)
const philosophy = computed(() => contentData.philosophy)
</script>

<style scoped>
/* basic about layout */
.about {
  padding: 2rem;
}

.hero {
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
}

.company {
  margin-top: 2rem;
}

.philosophy {
  margin-top: 2rem;
}
</style>
