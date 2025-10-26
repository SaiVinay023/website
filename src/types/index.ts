// src/types/index.ts

// ============================================================================
// Company & Content Types
// ============================================================================

export interface Address {
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface SocialLink {
  platform: string
  url: string
  handle: string
}

export interface Company {
  name: string
  tagline: string
  description: string
  email: string
  phone: string
  address: Address
  social: SocialLink[]
}

export interface Badge {
  icon: string
  text: string
}

export interface HeroCTA {
  primary: string
  secondary: string
}

export interface Hero {
  badge: Badge
  title: string
  subtitle: string
  highlights: string[]
  cta: HeroCTA
}

export interface Principle {
  icon: string
  title: string
  description: string
}

export interface Philosophy {
  title: string
  subtitle: string
  principles: Principle[]
}

export interface TeamMember {
  name: string
  role: string
  avatar: string
  responsibilities: string[]
  bio: string
}

export interface Team {
  title: string
  subtitle: string
  members: TeamMember[]
}

export interface NetworkScope {
  title: string
  scope: string
  description: string
}

export interface Network {
  title: string
  deployment: NetworkScope
  supply: NetworkScope
}

export interface OperationalStep {
  number: string
  title: string
  description: string
  icon: string
}

export interface OperationalModel {
  title: string
  subtitle: string
  steps: OperationalStep[]
}

export interface PartnerBenefit {
  icon: string
  title: string
  description: string
}

export interface PartnerOpportunities {
  title: string
  subtitle: string
  benefits: PartnerBenefit[]
  ideal: string
}

export interface RevenueStream {
  name: string
  description: string
}

export interface Revenue {
  title: string
  streams: RevenueStream[]
}

export interface Vision {
  title: string
  goals: string[]
}

export interface FinalCTA {
  title: string
  subtitle: string
  primary: string
  secondary: string
  guarantee: string
}

export interface Content {
  company: Company
  hero: Hero
  philosophy: Philosophy
  team: Team
  network: Network
  operationalModel: OperationalModel
  partnerOpportunities: PartnerOpportunities
  revenue: Revenue
  vision: Vision
  finalCTA: FinalCTA
}

// ============================================================================
// Product Types
// ============================================================================

export interface PricingTier {
  name: string
  price: string
  billingPeriod: string
  description: string
  features: string[]
  cta: string
  popular?: boolean
}

export interface Pricing {
  model: string
  tiers: PricingTier[]
}

export interface Product {
  key: string
  name: string
  tagline: string
  description: string
  overview: string
  features: string[]
  useCases: string[]
  pricing: Pricing
  tags: string[]
  featured: boolean
  geography?: string
}

export interface ProductsData {
  products: Product[]
}

// ============================================================================
// Case Study Types
// ============================================================================

export interface QuoteAuthor {
  name: string
  role: string
  company: string
}

export interface Metric {
  label: string
  before: string
  after: string
  improvement: string
}

export interface CaseStudy {
  id: string
  client: string
  industry: string
  industryKey: string
  challenge: string
  solution: string
  results: string[]
  quote: string
  quoteAuthor: QuoteAuthor
  metrics: Metric[]
  tags: string[]
  featured: boolean
}

export interface CaseStudiesData {
  caseStudies: CaseStudy[]
}

// ============================================================================
// Testimonial Types
// ============================================================================

export interface TestimonialMetrics {
  [key: string]: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  industry: string
  content: string
  rating: number
  avatar: string
  date: string
  featured: boolean
  metrics?: TestimonialMetrics
}

export interface TestimonialsData {
  testimonials: Testimonial[]
}

// ============================================================================
// Stats Types
// ============================================================================

export type TrendType = 'up' | 'down' | 'stable'

export interface CompanyStat {
  value: string
  label: string
  icon: string
  change?: string
  trend: TrendType
  description: string
}

export interface StatsData {
  companyStats: CompanyStat[]
}

// ============================================================================
// Performance Types
// ============================================================================

export interface DataPoint {
  month: string
  value: number
}

export interface PerformanceMetrics {
  users: DataPoint[]
  revenue: DataPoint[]
  satisfaction: DataPoint[]
}

export interface PerformanceData {
  performanceMetrics: PerformanceMetrics
}

// ============================================================================
// FAQ Types
// ============================================================================

export interface Question {
  question: string
  answer: string
  tags: string[]
}

export interface FAQCategory {
  title: string
  questions: Question[]
}

export interface FAQData {
  categories: FAQCategory[]
}

// ============================================================================
// Navigation Types
// ============================================================================

export interface NavItem {
  label: string
  path: string
  external?: boolean
  children?: NavItem[]
}

export interface FooterSection {
  [key: string]: NavItem[]
}

export interface Navigation {
  navigation: NavItem[]
  footer: FooterSection
}

// ============================================================================
// Form Types
// ============================================================================

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  subject?: string
}

export interface PartnerFormData {
  name: string
  email: string
  company: string
  website?: string
  description: string
  interest: string[]
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// ============================================================================
// Filter & Sort Types
// ============================================================================

export type SortDirection = 'asc' | 'desc'

export interface SortOption {
  field: string
  direction: SortDirection
}

export interface FilterOption {
  field: string
  value: string | number | boolean
  operator?: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'contains'
}

// ============================================================================
// UI State Types
// ============================================================================

export interface LoadingState {
  isLoading: boolean
  error: string | null
  message?: string
}

export interface ModalState {
  isOpen: boolean
  title?: string
  content?: string
  type?: 'info' | 'success' | 'warning' | 'error'
}

export interface NotificationState {
  show: boolean
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

// ============================================================================
// Search & Filter Types
// ============================================================================

export interface SearchParams {
  query: string
  filters?: FilterOption[]
  sort?: SortOption
  page?: number
  pageSize?: number
}

export interface SearchResults<T> {
  results: T[]
  total: number
  query: string
  filters: FilterOption[]
}

// ============================================================================
// Utility Types
// ============================================================================

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type ID = string | number

// ============================================================================
// Export all types
// ============================================================================

export type {
  // Re-export commonly used types for convenience
  Product as ProductType,
  CaseStudy as CaseStudyType,
  Testimonial as TestimonialType,
  CompanyStat as StatType,
  NavItem as NavigationItem,
}
export interface PricingTier {
  name: string
  description: string
  price: string
  billingPeriod: string
  features: string[]
  cta: string
  popular?: boolean
}

export interface Product {
  key: string
  name: string
  tagline: string
  description: string
  overview: string
  features: string[]
  useCases: string[]
  pricing: {
    model: string
    tiers: PricingTier[]
  }
  tags: string[]
  featured: boolean
  geography?: string
}


// src/types/product-details.ts

export interface ProductBackground {
  headline: string
  summary: string
  insight: string
}

export interface ProductProblem {
  structuralChallenges: string[]
}

export interface MarketDataPoint {
  text: string
}

export interface ProductMarketOpportunity {
  insight: string
  dataPoints: string[]
}

export interface CoreFeature {
  title: string
  text: string
}

export interface ProductSolution {
  headline: string
  description: string
  coreFeatures: CoreFeature[]
}

export interface ComparativeItem {
  aspect: string
  traditional: string
  myxofill: string
}

export interface ProductComparative {
  title: string
  items: ComparativeItem[]
}

export interface VisionPrinciple {
  title: string
  description: string
}

export interface ProductVision {
  title: string
  principles: VisionPrinciple[]
  summary: string
}

export interface ProductMetrics {
  expectedImpact: string[]
}

export interface ProductDetails {
  key: string
  name: string
  title: string
  tagline: string
  background: ProductBackground
  problem: ProductProblem
  marketOpportunity: ProductMarketOpportunity
  solution: ProductSolution
  comparative: ProductComparative
  vision: ProductVision
  metrics: ProductMetrics
  whyNow: string[]
  sources: string[]
}
