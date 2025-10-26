// stores/HomeStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import contentData from '../data/content.json'
import productsData from '../data/products/products.json'

import type { Product } from '../types/index'



export const useHomeStore = defineStore('home', () => {
  // State
  const content = ref(contentData)
  const products = ref<Product[]>(productsData.products)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed - Company & Hero
  const heroSection = computed(() => content.value.hero)
  const companyInfo = computed(() => content.value.company)
  
  // Computed - Philosophy
  const philosophy = computed(() => content.value.philosophy)
  
  // Computed - Team
  const team = computed(() => content.value.team)
  
  // Computed - Network
  const network = computed(() => content.value.network)
  
  // Computed - Operational Model
  const operationalModel = computed(() => content.value.operationalModel)
  
  // Computed - Partner Opportunities
  const partnerOpportunities = computed(() => content.value.partnerOpportunities)
  
  // Computed - Revenue Model
  const revenue = computed(() => content.value.revenue)
  
  // Computed - Vision
  const vision = computed(() => content.value.vision)
  
  // Computed - Final CTA
  const finalCTA = computed(() => content.value.finalCTA)

  // Computed - Products
  const featuredProducts = computed(() => 
    products.value.filter(p => p.featured)
  )
  
  const allProducts = computed(() => products.value)
  
  const productsByTag = computed(() => (tag: string) =>
    products.value.filter(p => p.tags.includes(tag))
  )

  // Actions
  const scrollToSection = (sectionId: string, offset = 80) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const top = element.offsetTop - offset
      window.scrollTo({
        top,
        behavior: 'smooth',
      })
    }
  }

  const getProductByKey = (key: string): Product | undefined => {
    return products.value.find(p => p.key === key)
  }

  const getFeaturedProductsCount = (): number => {
    return products.value.filter(p => p.featured).length
  }

  const getProductsByGeography = (geography: string): Product[] => {
    return products.value.filter(p => 
      p.geography?.toLowerCase().includes(geography.toLowerCase())
    )
  }

  return {
    // State
    content,
    products,
    isLoading,
    error,
    
    // Computed - Content Sections
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
    
    // Computed - Products
    featuredProducts,
    allProducts,
    productsByTag,
    
    // Actions
    scrollToSection,
    getProductByKey,
    getFeaturedProductsCount,
    getProductsByGeography,
  }
})
