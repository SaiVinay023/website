// src/router/routes.ts
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Home
      { path: '', name: 'home', component: () => import('pages/HomePage.vue') },

      // Products listing
      {
        path: 'products',
        name: 'products',
        component: () => import('pages/ProductsList.vue')
      },
      // Individual Product
      {
        path: 'products/:key',
        name: 'product',
        component: () => import('pages/ProductPage.vue'),
        props: true
      },

      // How It Works
      {
        path: 'how-it-works',
        name: 'how-it-works',
        component: () => import('src/pages/HowItWorks.vue')
      },

      // Case Studies
      {
        path: 'case-studies',
        name: 'case-studies',
        component: () => import('pages/CaseStudies.vue')
      },

      // About
      {
        path: 'about',
        name: 'about',
        component: () => import('pages/AboutPage.vue')
      },

      // Partners
      {
        path: 'partners',
        name: 'partners',
        component: () => import('pages/PartnersPage.vue')
      },

      // FAQ
      {
        path: 'faq',
        name: 'faq',
        component: () => import('pages/FAQPage.vue')
      },

      // Contact
      {
        path: 'contact',
        name: 'contact',
        component: () => import('pages/ContactPage.vue')
      }
    ]
  },

  // Always leave this as last one
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: () => import('pages/ErrorPage.vue')
  }
]

export default routes
