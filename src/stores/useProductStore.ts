// stores/ProductStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import productsData from '../data/products/products.json'
import type { Product , ProductDetails} from '../types/index'


export const useProductStore = defineStore('product', () => {
  // State
  const products :Ref<Product[]> = ref<Product[]>(productsData.products)
  const currentProduct :Ref<Product | null> = ref(null)
  const currentDetails = ref<ProductDetails | null>(null)

  const isLoading: Ref<boolean> = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const allProducts = computed(() => products.value)
  
  const featuredProducts = computed(() => 
    products.value.filter(p => p.featured)
  )

  // Actions
  const getProductByKey = (key: string): Product | undefined => {
    const product = products.value.find(p => p.key === key)
    if (product) {
      currentProduct.value = product
    }
    return product
  }
  const loadProductDetails = async (key: string): Promise<ProductDetails | null> => {
    isLoading.value = true
    error.value = null

    try {
      // Dynamic import of detail JSON
      const detailModule = await import(`../data/products/${key}.json`)
      currentDetails.value = detailModule.default as ProductDetails
      return currentDetails.value
    } catch (err) {
      error.value = `Failed to load detailed information for ${key}`
      console.error('Product details load error:', err)
      currentDetails.value = null
      return null
    } finally {
      isLoading.value = false
    }
  }


  const getRelatedProducts = (currentKey: string, limit = 3): Product[] => {
    const current = products.value.find(p => p.key === currentKey)
    if (!current) return []

    

    // Find products with overlapping tags
    return products.value
      .filter(p => p.key !== currentKey)
      .map(p => ({
        product: p,
        score: p.tags.filter(tag => current.tags.includes(tag)).length
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.product)
  }

  const setCurrentProduct = (product: Product | null): void => {
    currentProduct.value = product
  }

  const getProductsByTag = (tag: string): Product[] => {
    return products.value.filter(p => p.tags.includes(tag))
  }

  const clearCurrentProduct = () => {
    currentProduct.value = null
  }

  return {
    // State
    products,
    currentProduct,
    currentDetails,
    isLoading,
    error,
    
    // Computed
    allProducts,
    featuredProducts,
    
    // Actions
    getProductByKey,
    loadProductDetails,
    getRelatedProducts,
    setCurrentProduct,
    getProductsByTag,
    clearCurrentProduct,
  }
})
