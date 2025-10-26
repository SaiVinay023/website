<template>
  <div class="product-page">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <q-spinner color="primary" size="64px" />
      <p class="loading-text">Loading product details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !product" class="error-container">
      <div class="error-content">
        <q-icon name="error_outline" size="80px" color="negative" />
        <h2>Product Not Found</h2>
        <p>{{ error || 'The product you are looking for does not exist.' }}</p>
        <q-btn
          label="Back to Home"
          color="primary"
          size="lg"
          unelevated
          rounded
          @click="navigateHome"
        />
      </div>
    </div>

    <!-- Product Content -->
    <template v-else>
      <!-- Hero Section -->
      <section class="product-hero">
        <div class="container">
          <div class="breadcrumb">
            <router-link to="/" class="breadcrumb-link">Home</router-link>
            <q-icon name="chevron_right" size="16px" class="breadcrumb-separator" />
            <router-link to="/products" class="breadcrumb-link">Products</router-link>
            <q-icon name="chevron_right" size="16px" class="breadcrumb-separator" />
            <span class="breadcrumb-current">{{ product.name }}</span>
          </div>

          <div class="hero-content">
            <div class="hero-text">
              <h1 class="hero-title">{{ details?.title || product.name }}</h1>
              <p class="hero-tagline">{{ details?.tagline || product.tagline }}</p>

              <div v-if="product.geography" class="geography-badge">
                <q-icon name="public" size="20px" />
                <span>{{ product.geography }}</span>
              </div>

              <div class="hero-actions">
                <q-btn
                  :label="product.pricing.tiers[0]?.cta"
                  color="primary"
                  size="lg"
                  unelevated
                  rounded
                  @click="scrollToSection('pricing')"
                />
                <q-btn
                  label="Learn More"
                  color="primary"
                  size="lg"
                  outline
                  rounded
                  @click="scrollToSection('solution')"
                />
              </div>
            </div>

            <div class="hero-visual">
              <div class="product-icon">
                <q-icon name="apps" size="120px" color="white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Background Section -->
      <section v-if="details?.background" id="background" class="background-section">
        <div class="container">
          <div class="section-header">
            <h2>{{ details.background.headline }}</h2>
          </div>
          <div class="background-content">
            <p class="summary-text">{{ details.background.summary }}</p>
            <div class="insight-box">
              <q-icon name="lightbulb" size="32px" color="amber" />
              <p>{{ details.background.insight }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Problem Section -->
      <section v-if="details?.problem" id="problem" class="problem-section">
        <div class="container">
          <div class="section-header">
            <h2>Structural Challenges</h2>
            <p>The broken ecosystem we're fixing</p>
          </div>
          <div class="challenges-grid">
            <div
              v-for="(challenge, index) in details.problem.structuralChallenges"
              :key="index"
              class="challenge-card"
            >
              <div class="challenge-icon">
                <q-icon name="close" size="24px" color="negative" />
              </div>
              <p>{{ challenge }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Market Opportunity Section -->
      <section v-if="details?.marketOpportunity" id="market" class="market-section">
        <div class="container">
          <div class="section-header">
            <h2>Market Opportunity</h2>
          </div>
          <div class="market-content">
            <p class="insight-text">{{ details.marketOpportunity.insight }}</p>
            <div class="data-points">
              <div
                v-for="(point, index) in details.marketOpportunity.dataPoints"
                :key="index"
                class="data-point"
              >
                <q-icon name="trending_up" size="24px" color="positive" />
                <span>{{ point }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Solution Section -->
      <section v-if="details?.solution" id="solution" class="solution-section">
        <div class="container">
          <div class="section-header">
            <h2>{{ details.solution.headline }}</h2>
            <p>{{ details.solution.description }}</p>
          </div>
          <div class="features-grid">
            <div
              v-for="feature in details.solution.coreFeatures"
              :key="feature.title"
              class="feature-card"
            >
              <div class="feature-icon">
                <q-icon name="check_circle" size="32px" color="primary" />
              </div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.text }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Comparative Analysis Section -->
      <section v-if="details?.comparative" id="comparison" class="comparative-section">
        <div class="container">
          <div class="section-header">
            <h2>{{ details.comparative.title }}</h2>
          </div>
          <div class="comparison-table">
            <div class="table-header">
              <div class="header-cell aspect">Aspect</div>
              <div class="header-cell traditional">Traditional Model</div>
              <div class="header-cell myxofill">MyxoFill</div>
            </div>
            <div
              v-for="item in details.comparative.items"
              :key="item.aspect"
              class="table-row"
            >
              <div class="table-cell aspect">
                <strong>{{ item.aspect }}</strong>
              </div>
              <div class="table-cell traditional">
                <q-icon name="close" size="20px" color="negative" />
                <span>{{ item.traditional }}</span>
              </div>
              <div class="table-cell myxofill">
                <q-icon name="check" size="20px" color="positive" />
                <span>{{ item.myxofill }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Vision Section -->
      <section v-if="details?.vision" id="vision" class="vision-section">
        <div class="container">
          <div class="section-header">
            <h2>{{ details.vision.title }}</h2>
          </div>
          <div class="principles-grid">
            <div
              v-for="principle in details.vision.principles"
              :key="principle.title"
              class="principle-card"
            >
              <h3>{{ principle.title }}</h3>
              <p>{{ principle.description }}</p>
            </div>
          </div>
          <div class="vision-summary">
            <p>{{ details.vision.summary }}</p>
          </div>
        </div>
      </section>

      <!-- Metrics Section -->
      <section v-if="details?.metrics" id="metrics" class="metrics-section">
        <div class="container">
          <div class="section-header">
            <h2>Expected Impact</h2>
          </div>
          <div class="metrics-grid">
            <div
              v-for="(impact, index) in details.metrics.expectedImpact"
              :key="index"
              class="metric-card"
            >
              <q-icon name="insights" size="40px" color="primary" />
              <p>{{ impact }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Now Section -->
      <section v-if="details?.whyNow" id="timing" class="timing-section">
        <div class="container">
          <div class="section-header">
            <h2>Why Now?</h2>
            <p>Market timing and trends favor this solution</p>
          </div>
          <div class="timing-grid">
            <div v-for="(reason, index) in details.whyNow" :key="index" class="timing-card">
              <q-icon name="schedule" size="32px" color="primary" />
              <p>{{ reason }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section id="pricing" class="pricing-section">
        <div class="container">
          <div class="section-header">
            <h2>Pricing</h2>
            <p class="pricing-model">{{ product.pricing.model }}</p>
          </div>

          <div class="pricing-grid">
            <div
              v-for="tier in product.pricing.tiers"
              :key="tier.name"
              class="pricing-card"
              :class="{ popular: tier.popular }"
            >
              <div v-if="tier.popular" class="popular-badge">Most Popular</div>

              <h3>{{ tier.name }}</h3>
              <p class="tier-description">{{ tier.description }}</p>

              <div class="price-display">
                <span class="price">{{ tier.price }}</span>
                <span class="period">{{ tier.billingPeriod }}</span>
              </div>

              <div class="tier-features">
                <h4>Includes:</h4>
                <ul>
                  <li v-for="feature in tier.features" :key="feature">
                    <q-icon name="check" size="18px" color="positive" />
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <q-btn
                :label="tier.cta"
                :color="tier.popular ? 'primary' : 'secondary'"
                size="lg"
                unelevated
                rounded
                class="tier-cta"
                @click="handleCTA(tier.name)"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Related Products Section -->
      <section v-if="relatedProducts.length > 0" class="related-section">
        <div class="container">
          <div class="section-header">
            <h2>Related Products</h2>
            <p>You might also be interested in</p>
          </div>

          <div class="related-grid">
            <div
              v-for="related in relatedProducts"
              :key="related.key"
              class="related-card"
              @click="navigateToProduct(related.key)"
            >
              <h3>{{ related.name }}</h3>
              <p class="related-tagline">{{ related.tagline }}</p>
              <p class="related-description">{{ related.description }}</p>

              <div class="related-footer">
                <span class="related-price">{{ related.pricing.tiers[0]?.price }}</span>
                <q-icon name="arrow_forward" size="24px" color="primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="product-cta-section">
        <div class="container">
          <div class="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join the transparent, merit-based marketplace</p>

            <div class="cta-actions">
              <q-btn
                :label="product.pricing.tiers[0]?.cta"
                color="white"
                text-color="primary"
                size="xl"
                unelevated
                rounded
                @click="scrollToSection('pricing')"
              />
              <q-btn
                label="Contact Sales"
                color="transparent"
                text-color="white"
                size="xl"
                outline
                rounded
                @click="navigateToContact"
              />
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/useProductStore'
import { updatePageTitle, updateMetaDescription } from '../utils'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

// Computed
const productKey = computed(() => route.params.key as string)
const product = computed(() => productStore.currentProduct)
const details = computed(() => productStore.currentDetails)
const isLoading = computed(() => productStore.isLoading)
const error = computed(() => productStore.error)
const relatedProducts = computed(() =>
  product.value ? productStore.getRelatedProducts(product.value.key) : []
)

// Load product data
const loadProduct = async (): Promise<void> => {
  const key = productKey.value
  if (!key) return

  // Load basic product info
  const foundProduct = productStore.getProductByKey(key)
  if (!foundProduct) {
    return
  }

  // Load detailed product info
  await productStore.loadProductDetails(key)

  // Update meta tags
  updatePageTitle(foundProduct.name)
  updateMetaDescription(foundProduct.description)
}

// Watch for route changes
watch(
  () => route.params.key,
  async() => {
    await loadProduct()
    window.scrollTo(0, 0)
  }
)

onMounted(async () => {
  await loadProduct()
})

// Methods
const scrollToSection = (sectionId: string, offset = 80): void => {
  const element = document.getElementById(sectionId)
  if (element) {
    const top = element.offsetTop - offset
    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  }
}

const navigateToProduct = async (key: string): Promise<void> => {
  await router.push({ name: 'product', params: { key } })
}

const navigateToContact = async (): Promise<void> => {
  await router.push({ name: 'contact' })
}

const navigateHome = async (): Promise<void> => {
  await router.push({ name: 'home' })
}

const handleCTA = async (tierName: string): Promise<void> => {
  console.log(`CTA clicked for tier: ${tierName}`)
  await navigateToContact()
}
</script>

<style scoped lang="scss">
.product-page {
  width: 100%;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

// Loading & Error States
.loading-container,
.error-container {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
}

.loading-text {
  margin-top: 24px;
  font-size: 18px;
  color: var(--q-dark);
  opacity: 0.7;
}

.error-content {
  text-align: center;
  max-width: 600px;

  h2 {
    font-size: 36px;
    font-weight: 700;
    margin: 24px 0 16px;
    color: var(--q-dark);
  }

  p {
    font-size: 18px;
    margin-bottom: 32px;
    opacity: 0.7;
  }
}

// Hero Section
.product-hero {
  padding: 140px 0 100px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: white;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 40px;
  font-size: 14px;

  .breadcrumb-link {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: white;
    }
  }

  .breadcrumb-separator {
    opacity: 0.5;
  }

  .breadcrumb-current {
    color: white;
    font-weight: 600;
  }
}

.hero-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 80px;
  align-items: center;
}

.hero-text {
  .hero-title {
    font-size: 56px;
    font-weight: 800;
    margin-bottom: 20px;
    line-height: 1.1;
  }

  .hero-tagline {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 32px;
    opacity: 0.95;
    line-height: 1.4;
  }
}

.geography-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 40px;
  backdrop-filter: blur(10px);
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-icon {
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  border-radius: 32px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transform: rotate(-5deg);
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(0deg) scale(1.05);
  }
}

// Section Styles
section {
  padding: 100px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;

  h2 {
    font-size: 48px;
    font-weight: 800;
    margin-bottom: 20px;
    color: var(--q-dark);
  }

  p {
    font-size: 20px;
    opacity: 0.7;
    max-width: 700px;
    margin: 0 auto;
  }
}

// Background Section
.background-section {
  background: white;
}

.background-content {
  max-width: 900px;
  margin: 0 auto;
}

.summary-text {
  font-size: 20px;
  line-height: 1.8;
  text-align: center;
  margin-bottom: 40px;
  opacity: 0.85;
}

.insight-box {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 32px 40px;
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  border-radius: 16px;
  border-left: 4px solid #ffa726;

  p {
    font-size: 18px;
    line-height: 1.7;
    margin: 0;
    font-weight: 600;
  }
}

// Problem Section
.problem-section {
  background: #f8f9fa;
}

.challenges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.challenge-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 28px;
  background: white;
  border-radius: 12px;
  border-left: 4px solid var(--q-negative);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .challenge-icon {
    flex-shrink: 0;
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    margin: 0;
  }
}

// Market Section
.market-section {
  background: white;
}

.market-content {
  max-width: 900px;
  margin: 0 auto;
}

.insight-text {
  font-size: 20px;
  line-height: 1.8;
  text-align: center;
  margin-bottom: 48px;
  opacity: 0.85;
}

.data-points {
  display: grid;
  gap: 20px;
}

.data-point {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 32px;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  border-radius: 12px;
  border-left: 4px solid var(--q-positive);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.6;
}

// Solution Section
.solution-section {
  background: #f8f9fa;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
}

.feature-card {
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }

  .feature-icon {
    margin-bottom: 24px;
  }

  h3 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
    color: var(--q-dark);
  }

  p {
    font-size: 16px;
    line-height: 1.7;
    opacity: 0.8;
  }
}

// Comparative Section
.comparative-section {
  background: white;
}

.comparison-table {
  max-width: 1100px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr;
  gap: 2px;
  background: #e9ecef;
}

.table-header {
  background: var(--q-dark);
  color: white;

  .header-cell {
    padding: 20px 24px;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

.table-row {
  background: white;

  &:hover {
    background: #f8f9fa;
  }
}

.table-cell {
  padding: 24px;
  background: white;
  display: flex;
  align-items: center;
  gap: 12px;

  &.aspect {
    font-weight: 700;
  }

  &.traditional {
    background: #ffebee;
  }

  &.myxofill {
    background: #e8f5e9;
  }

  span {
    font-size: 15px;
    line-height: 1.6;
  }
}

// Vision Section
.vision-section {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
}

.principle-card {
  padding: 40px 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  h3 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  p {
    font-size: 16px;
    line-height: 1.7;
    opacity: 0.9;
  }
}

.vision-summary {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  p {
    font-size: 20px;
    line-height: 1.8;
    font-weight: 600;
    opacity: 0.95;
  }
}

// Metrics Section
.metrics-section {
  background: #f8f9fa;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.metric-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  p {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.6;
    margin-top: 20px;
  }
}

// Timing Section
.timing-section {
  background: white;
}

.timing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.timing-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 28px 32px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  p {
    font-size: 17px;
    font-weight: 600;
    line-height: 1.6;
    margin: 0;
  }
}

// Pricing Section
.pricing-section {
  background: linear-gradient(to bottom, #f8f9fa 0%, white 100%);
}

.pricing-model {
  font-size: 16px;
  font-weight: 600;
  color: var(--q-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 12px;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  max-width: 1100px;
  margin: 0 auto;
}

.pricing-card {
  position: relative;
  padding: 48px;
  background: white;
  border-radius: 20px;
  border: 2px solid #e9ecef;
  transition: all 0.4s ease;

  &.popular {
    border-color: var(--q-primary);
    box-shadow: 0 16px 48px rgba(var(--q-primary-rgb), 0.2);
    transform: scale(1.05);
  }

  &:hover:not(.popular) {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }

  h3 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 12px;
    color: var(--q-dark);
  }

  .tier-description {
    font-size: 16px;
    margin-bottom: 32px;
    opacity: 0.7;
  }
}

.popular-badge {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 24px;
  background: var(--q-primary);
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.price-display {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 2px solid #e9ecef;

  .price {
    display: block;
    font-size: 48px;
    font-weight: 800;
    color: var(--q-primary);
    margin-bottom: 8px;
  }

  .period {
    font-size: 16px;
    opacity: 0.7;
  }
}

.tier-features {
  margin-bottom: 32px;

  h4 {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 20px;
    opacity: 0.7;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 10px 0;
      font-size: 15px;
      line-height: 1.5;
    }
  }
}

.tier-cta {
  width: 100%;
  height: 52px;
  font-size: 16px;
  font-weight: 700;
}

// Related Products
.related-section {
  background: #f8f9fa;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}

.related-card {
  padding: 32px;
  background: white;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    border-color: var(--q-primary);
  }

  h3 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
    color: var(--q-dark);
  }

  .related-tagline {
    font-size: 16px;
    color: var(--q-primary);
    font-weight: 600;
    margin-bottom: 12px;
  }

  .related-description {
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 20px;
    opacity: 0.8;
  }
}

.related-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;

  .related-price {
    font-size: 20px;
    font-weight: 700;
    color: var(--q-primary);
  }
}

// Product CTA Section
.product-cta-section {
  padding: 120px 0;
  background: linear-gradient(135deg, var(--q-primary) 0%, var(--q-secondary) 100%);
  color: white;
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;

  h2 {
    font-size: 48px;
    font-weight: 800;
    margin-bottom: 24px;
  }

  p {
    font-size: 20px;
    margin-bottom: 48px;
    opacity: 0.95;
  }
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

// Responsive Design
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .hero-visual {
    order: -1;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr;
  }

  .table-cell.aspect {
    background: var(--q-dark) !important;
    color: white;
    font-weight: 700;
  }
}

@media (max-width: 768px) {
  .product-hero {
    padding: 100px 0 60px;
  }

  .hero-text .hero-title {
    font-size: 40px;
  }

  .hero-text .hero-tagline {
    font-size: 20px;
  }

  .section-header h2 {
    font-size: 36px;
  }

 .pricing-card.popular {
    transform: scale(1);
  }

  .cta-content h2 {
    font-size: 36px;
  }
}

@media (max-width: 480px) {
  .hero-text .hero-title {
    font-size: 32px;
  }

  section {
    padding: 60px 0;
  }
}
</style>