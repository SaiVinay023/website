<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section id="hero" class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-icon">{{ heroSection.badge.icon }}</span>
            <span class="badge-text">{{ heroSection.badge.text }}</span>
          </div>
          
          <h1 class="h1 q-mb-lg">{{ heroSection.title }}</h1>
          <p class="hero-subtitle q-mb-xl">{{ heroSection.subtitle }}</p>
          
          <div class="row justify-center q-gutter-lg q-mb-xl">
            <div 
              v-for="highlight in heroSection.highlights" 
              :key="highlight"
              class="row items-center q-gutter-sm"
            >
              <q-icon name="check_circle" color="white" size="20px" />
              <span class="text-weight-bold">{{ highlight }}</span>
            </div>
          </div>
          
          <div class="row justify-center q-gutter-md">
            <q-btn
              :label="heroSection.cta.primary"
              color="white"
              text-color="primary"
              size="lg"
              unelevated
              rounded
              @click="scrollToSection('products')"
            />
            <q-btn
              :label="heroSection.cta.secondary"
              color="transparent"
              text-color="white"
              size="lg"
              outline
              rounded
              @click="scrollToSection('partners')"
            />
          </div>
        </div>
      </div>
      
      <div class="hero-pattern"></div>
    </section>

    <!-- Philosophy Section -->
    <section id="philosophy" class="philosophy">
      <div class="container">
        <div class="section-header">
          <h2 class="h2">{{ philosophy.title }}</h2>
          <p>{{ philosophy.subtitle }}</p>
        </div>
        
        <div class="row q-col-gutter-xl">
          <div 
            v-for="principle in philosophy.principles" 
            :key="principle.title"
            class="col-12 col-md-4"
          >
            <div class="card text-center">
              <q-icon :name="principle.icon" size="48px" color="primary" class="q-mb-lg" />
              <h3 class="h3 q-mb-md">{{ principle.title }}</h3>
              <p class="p">{{ principle.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section id="team" class="team">
      <div class="container">
        <div class="section-header">
          <h2 class="h2">{{ team.title }}</h2>
          <p>{{ team.subtitle }}</p>
        </div>
        
        <div class="row q-col-gutter-xl">
          <div 
            v-for="member in team.members" 
            :key="member.name"
            class="col-12 col-md-6"
          >
            <div class="card">
              <div class="row items-center q-gutter-lg q-mb-lg">
                <div class="member-avatar">
                  <q-icon name="person" size="80px" color="white" />
                </div>
                <div>
                  <h3 class="h3 q-mb-xs">{{ member.name }}</h3>
                  <p class="text-primary text-weight-bold q-mb-none">{{ member.role }}</p>
                </div>
              </div>
              
              <p class="p q-mb-lg">{{ member.bio }}</p>
              
              <div>
                <h4 class="text-overline text-weight-bold q-mb-md">Key Responsibilities</h4>
                <div v-for="resp in member.responsibilities" :key="resp" class="row items-start q-gutter-sm q-py-xs">
                  <q-icon name="arrow_right" size="16px" color="primary" />
                  <span class="col">{{ resp }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Network Section -->
    <section id="network" class="network">
      <div class="container">
        <div class="section-header">
          <h2 class="h2 text-white">{{ network.title }}</h2>
        </div>
        
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-6">
            <div class="card network-card">
              <div class="row items-center justify-between q-mb-lg">
                <q-icon name="location_on" size="40px" color="primary" />
                <span class="network-scope">{{ network.deployment.scope }}</span>
              </div>
              <h3 class="h3 q-mb-md text-white">{{ network.deployment.title }}</h3>
              <p class="p text-white">{{ network.deployment.description }}</p>
            </div>
          </div>
          
          <div class="col-12 col-md-6">
            <div class="card network-card">
              <div class="row items-center justify-between q-mb-lg">
                <q-icon name="public" size="40px" color="secondary" />
                <span class="network-scope global">{{ network.supply.scope }}</span>
              </div>
              <h3 class="h3 q-mb-md text-white">{{ network.supply.title }}</h3>
              <p class="p text-white">{{ network.supply.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section id="products" class="products">
      <div class="container">
        <div class="section-header">
          <h2 class="h2">Products & Services</h2>
          <p>Decentralized solutions for every industry vertical</p>
        </div>
        
        <div class="row q-col-gutter-lg">
          <div 
            v-for="product in allProducts" 
            :key="product.key"
            class="col-12 col-sm-6 col-lg-4"
          >
            <div class="card" :class="{ 'featured': product.featured }">
              <div v-if="product.featured" class="product-badge">Featured</div>
              
              <div class="q-mb-lg">
                <h3 class="h3 q-mb-xs">{{ product.name }}</h3>
                <p class="text-primary text-weight-bold q-mb-none">{{ product.tagline }}</p>
              </div>
              
              <p class="p q-mb-lg">{{ product.description }}</p>
              
              <div class="q-mb-lg">
                <h4 class="text-overline text-weight-bold q-mb-md">Key Features</h4>
                <div v-for="feature in product.features.slice(0, 4)" :key="feature" class="row items-start q-gutter-sm q-py-xs">
                  <q-icon name="check" size="18px" color="positive" />
                  <span class="col">{{ feature }}</span>
                </div>
              </div>
              
              <div v-if="product.geography" class="row items-center q-gutter-sm q-pa-md q-mb-md bg-grey-2 rounded-borders">
                <q-icon name="public" size="16px" color="secondary" />
                <span class="text-weight-medium text-secondary">{{ product.geography }}</span>
              </div>
              
              <div class="product-pricing q-mb-lg">
                <div class="text-overline text-weight-bold">{{ product.pricing.model }}</div>
                <div class="row items-baseline q-gutter-xs">
                  <span class="text-h3 text-primary text-weight-bold">{{ product.pricing.tiers[0]?.price }}</span>
                  <span class="text-body2">{{ product.pricing.tiers[0]?.billingPeriod }}</span>
                </div>
              </div>

              <q-btn
                :label="product.pricing.tiers[0]?.cta"
                color="primary"
                unelevated
                rounded
                class="full-width"
                @click="navigateToProduct(product.key)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Operational Model Section -->
    <section id="how-it-works" class="operational">
      <div class="container">
        <div class="section-header">
          <h2 class="h2">{{ operationalModel.title }}</h2>
          <p>{{ operationalModel.subtitle }}</p>
        </div>
        
        <div class="row q-col-gutter-md">
          <div 
            v-for=" step in operationalModel.steps" 
            :key="step.number"
            class="col-12 col-sm-6 col-lg-3"
          >
            <div class="column items-center text-center q-px-md">
              <div class="step-number q-mb-lg">{{ step.number }}</div>
              <q-icon :name="step.icon" size="32px" color="primary" class="q-mb-md" />
              <h3 class="h3 q-mb-md">{{ step.title }}</h3>
              <p class="p">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partner Opportunities Section -->
    <section id="partners" class="partners">
      <div class="container">
        <div class="section-header">
          <h2 class="h2">{{ partnerOpportunities.title }}</h2>
          <p>{{ partnerOpportunities.subtitle }}</p>
        </div>
        
        <div class="row q-col-gutter-xl q-mb-xl">
          <div 
            v-for="benefit in partnerOpportunities.benefits" 
            :key="benefit.title"
            class="col-12 col-md-4"
          >
            <div class="card text-center">
              <q-icon :name="benefit.icon" size="56px" color="primary" class="q-mb-lg" />
              <h3 class="h3 q-mb-md">{{ benefit.title }}</h3>
              <p class="p">{{ benefit.description }}</p>
            </div>
          </div>
        </div>
        
        <div class="card featured row items-center q-gutter-lg">
          <q-icon name="lightbulb" size="32px" color="amber" />
          <p class="text-h6 text-weight-medium q-mb-none col">{{ partnerOpportunities.ideal }}</p>
        </div>
      </div>
    </section>

    <!-- Revenue Model Section -->
    <section id="revenue" class="revenue">
      <div class="container">
        <div class="section-header">
          <h2 class="h2 text-white">{{ revenue.title }}</h2>
        </div>
        
        <div class="row q-col-gutter-lg">
          <div 
            v-for="stream in revenue.streams" 
            :key="stream.name"
            class="col-12 col-sm-6 col-md-3"
          >
            <div class="card network-card text-center">
              <q-icon name="payments" size="32px" color="primary" class="q-mb-md" />
              <h3 class="text-h6 text-weight-bold q-mb-md text-white">{{ stream.name }}</h3>
              <p class="text-body2 text-white">{{ stream.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision Section -->
    <section id="vision" class="vision">
      <div class="container">
        <div class="section-header">
          <h2 class="h2">{{ vision.title }}</h2>
        </div>
        
        <div class="column q-gutter-md" style="max-width: 900px; margin: 0 auto;">
          <div 
            v-for="(goal, index) in vision.goals" 
            :key="index"
            class="card row items-center q-gutter-lg"
          >
            <q-icon name="arrow_forward" size="24px" color="primary" />
            <span class="text-h6 text-weight-medium col">{{ goal }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section id="cta" class="final-cta">
      <div class="container">
        <div class="cta-content">
          <h1 class="h1 q-mb-lg" style="color: white;">{{ finalCTA.title }}</h1>
          <p class="text-h5 q-mb-xl" style="color: white; opacity: 0.9;">{{ finalCTA.subtitle }}</p>
          
          <div class="row justify-center q-gutter-md q-mb-xl">
            <q-btn
              :label="finalCTA.primary"
              color="white"
              text-color="primary"
              size="xl"
              unelevated
              rounded
              @click="scrollToSection('products')"
            />
            <q-btn
              :label="finalCTA.secondary"
              color="transparent"
              text-color="white"
              size="xl"
              outline
              rounded
              @click="scrollToSection('partners')"
            />
          </div>
          
          <div class="cta-guarantee q-mb-xl">
            <q-icon name="verified" size="24px" />
            <p class="text-body1 text-weight-bold q-mb-none">{{ finalCTA.guarantee }}</p>
          </div>
          
          <div class="row justify-center q-gutter-xl">
            <div class="row items-center q-gutter-sm">
              <q-icon name="email" size="20px" />
              <a :href="`mailto:${companyInfo.email}`" class="text-white text-weight-bold">{{ companyInfo.email }}</a>
            </div>
            <div class="row items-center q-gutter-sm">
              <q-icon name="phone" size="20px" />
              <a :href="`tel:${companyInfo.phone}`" class="text-white text-weight-bold">{{ companyInfo.phone }}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useHomeStore } from '../stores/useHomeStore'
import { useRouter } from 'vue-router'

const homeStore = useHomeStore()
const router = useRouter()

const {
  heroSection,
  companyInfo,
  philosophy,
  team,
  network,
  operationalModel,
  partnerOpportunities,
  revenue,
  vision,
  finalCTA,
  allProducts,
} = homeStore

const { scrollToSection } = homeStore

const navigateToProduct = async (productKey: string) => {
  await router.push({ name: 'product', params: { key: productKey } })
}
</script>

<style scoped lang="scss">
// MINIMAL PAGE-SPECIFIC STYLES ONLY
// All common styles are in app.scss

.home-page {
  width: 100%;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

// Hero-specific styles
.hero-section {
  position: relative;
  padding: 160px 0 120px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: white;
  text-align: center;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1000px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 28px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 32px;
  margin-bottom: 32px;
  font-size: 16px;
  font-weight: 600;
  backdrop-filter: blur(10px);
  
  .badge-icon {
    font-size: 24px;
  }
}

.hero-subtitle {
  font-size: 22px;
  opacity: 0.9;
  line-height: 1.7;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

// Team-specific
.member-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--q-primary) 0%, var(--q-secondary) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

// Network-specific
.network-card {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 2px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.08) !important;
    border-color: rgba(255, 255, 255, 0.2);
  }
}

.network-scope {
  padding: 10px 24px;
  background: var(--q-primary);
  color: white;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  
  &.global {
    background: var(--q-secondary);
  }
}

// Product-specific
.product-badge {
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
  letter-spacing: 0.05em;
}

.product-pricing {
  padding: 28px 0;
  border-top: 2px solid #e9ecef;
  border-bottom: 2px solid #e9ecef;
}

// Operational-specific
.step-number {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--q-primary) 0%, var(--q-secondary) 100%);
  color: white;
  font-size: 32px;
  font-weight: 800;
  border-radius: 50%;
  box-shadow: 0 8px 24px rgba(0, 150, 136, 0.3);
}

// CTA-specific
.final-cta {
  padding: 140px 0;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: white;
  text-align: center;
}

.cta-content {
  max-width: 900px;
  margin: 0 auto;
}

.cta-guarantee {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.cta-contact a {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.8;
  }
}

// Responsive
@media (max-width: 768px) {
  .hero-section {
    padding: 100px 0 80px;
  }
  
  .final-cta {
    padding: 80px 0;
  }
}
</style>
