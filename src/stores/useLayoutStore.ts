// src/stores/useLayoutStore.ts
import { defineStore } from 'pinia'
import navigationData from '../data/navigation.json'
import type { NavigationItem } from '../types/index'

export const useLayoutStore = defineStore('layout', () => {
  // Load navigation from JSON
  const navigation = navigationData.navigation as NavigationItem[]

  return { navigation }
})
