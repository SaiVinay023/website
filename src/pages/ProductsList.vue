<template>
  <div class="products-list-page">
    <section class="products-hero">
      <div class="container">
        <h1>Our Products & Services</h1>
        <p>Decentralized solutions for every industry vertical</p>
      </div>
    </section>

    <section class="products-content">
      <div class="container">
        <div class="products-grid">
          <div 
            v-for="product in allProducts" 
            :key="product.key"
            class="product-card"
            @click="navigateToProduct(product.key)"
          >
            <div v-if="product.featured" class="featured-badge">
              Featured
            </div>

            <div class="product-icon">
              <q-icon name="apps" size="56px" color="primary" />
            </div>

            <h3>{{ product.name }}</h3>
            <p class="tagline">{{ product.tagline }}</p>
            <p class="description">{{ product.description }}</p>

            <div class="product-tags">
              <span v-for="tag in product.tags.slice(0, 3)" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>

            <div class="product-footer">
              <span class="price">{{ product.pricing.tiers[0]?.price }}</span>
              <q-btn
                label="Learn More"
                color="primary"
                outline
                rounded
                @click.stop="navigateToProduct(product.key)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/useProductStore'

const router = useRouter()
const productStore = useProductStore()

const allProducts = computed(() => productStore.allProducts)

const navigateToProduct = async (key: string) => {
  await router.push({ name: 'product', params: { key } })
}
</script>
