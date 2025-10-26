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

<style scoped lang="scss">
.products-list-page {
  width: 100%;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.products-hero {
  padding: 140px 0 80px;
  background: linear-gradient(135deg, var(--q-primary) 0%, var(--q-secondary) 100%);
  color: white;
  text-align: center;

  h1 {
    font-size: 56px;
    font-weight: 800;
    margin-bottom: 24px;
  }

  p {
    font-size: 22px;
    opacity: 0.95;
  }
}

.products-content {
  padding: 100px 0;
  background: #f8f9fa;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 32px;
}

.product-card {
  position: relative;
  padding: 40px;
  background: white;
  border-radius: 20px;
  border: 2px solid #e9ecef;
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border-color: var(--q-primary);
  }
}

.featured-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 20px;
  background: var(--q-primary);
  color: white;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.product-icon {
  margin-bottom: 24px;
}

.product-card h3 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
}

.tagline {
  font-size: 16px;
  color: var(--q-primary);
  font-weight: 600;
  margin-bottom: 16px;
}

.description {
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 24px;
  opacity: 0.8;
}

.product-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.tag {
  padding: 6px 16px;
  background: #f8f9fa;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--q-secondary);
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 2px solid #e9ecef;

  .price {
    font-size: 24px;
    font-weight: 700;
    color: var(--q-primary);
  }
}

@media (max-width: 768px) {
  .products-hero h1 {
    font-size: 40px;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
