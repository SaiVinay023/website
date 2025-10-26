<template>
  <div class="contact-page">
    <section class="hero">
      <h1>Contact Us</h1>
      <p>We're here to help</p>
    </section>
    <section class="details">
      <ul>
        <li>Email: <a :href="`mailto:${info.email}`">{{ info.email }}</a></li>
        <li>Phone: <a :href="`tel:${info.phone}`">{{ info.phone }}</a></li>
        <li>Address: {{ info.address.street }}, {{ info.address.city }}</li>
      </ul>
    </section>
    <section class="form">
      <!-- Replace with your form component -->
      <ContactForm />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import contentData from '../data/content.json'

const info = computed(() => contentData.company)
</script>

<style scoped>
/* contact layout */
</style>
