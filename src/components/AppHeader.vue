<template>
  <q-header>
    <q-toolbar class="row items-center q-px-lg" style="min-height: 64px">
      <div class="column items-center no-wrap cursor-pointer" @click="goHome" style="max-width: 200px; flex-shrink: 0; gap: 4px">
        <q-avatar square size="50px">
          <img src="../assets/icons/main/myxoflow.svg" alt="Logo" />
        </q-avatar>
        <div class="text-weight-bold text-subtitle1">MyxoFlow</div>
      </div>
      <div class="row items-center justify-evenly q-gutter-md desktop-menu" style="flex-grow: 1; margin-left: 32px">
        <q-btn v-for="item in simpleNavItems" :key="item.path" dense rounded bordered no-caps :label="item.label" @click="navigate(item.path, item.external)" />
        <div v-for="item in dropdownNavItems" :key="item.path" class="relative-position" @mouseenter="handleMouseEnter(item.path)" @mouseleave="handleMouseLeave">
          <q-btn rounded bordered dense no-caps :label="item.label" @click="navigate(item.path, item.external)" />
          <q-menu :model-value="openDropdown === item.path" @update:model-value="val => openDropdown = val ? item.path : null" anchor="bottom left" self="top left" transition-show="fade" transition-hide="fade" :class="{'show': openDropdown === item.path}">
            <q-list>
              <q-item v-for="child in item.children" :key="child.path" clickable @click="navigate(child.path, child.external)">
                <q-item-section>{{ child.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </div>
    </q-toolbar>

  </q-header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { QBtn, QAvatar, QToolbar, QHeader, QList, QItem, QItemSection, QMenu } from 'quasar'
import { useRouter } from 'vue-router'
import navigationJson from '../data/navigation.json'

// Define Exact Types
interface NavigationItemBase {
  label: string
  path: string
  external?: boolean
}


interface NavigationParent extends NavigationItemBase {
  children: NavigationItemBase[]
}

type NavigationItem = NavigationItemBase | NavigationParent

const nav = navigationJson.navigation as NavigationItem[]
const router = useRouter()
const openDropdown: Ref<string | null> = ref(null)
let hoverTimeout: ReturnType<typeof setTimeout> | null = null

// Computed separated routes
const simpleNavItems = nav.filter((i): i is NavigationItemBase => !('children' in i) && i.label.toLowerCase() !== 'home')
const dropdownNavItems = nav.filter((i): i is NavigationParent => 'children' in i)

function handleMouseEnter(path: string): void {
  if (hoverTimeout) clearTimeout(hoverTimeout)
  hoverTimeout = setTimeout(() => {
    openDropdown.value = path
  }, 500) // 0.5s delay
}

function handleMouseLeave(): void {
  if (hoverTimeout) clearTimeout(hoverTimeout)
  hoverTimeout = setTimeout(() => {
    openDropdown.value = null
  }, 5000) // 5s delay

}

async function navigate(path: string, external?: boolean): Promise<void> {
  if (external) {
    window.open(path, '_blank')
  } else {
    await router.push(path)
  }
}

async function goHome(): Promise<void> {
  await router.push('/')
}
</script>

<style scoped>
.q-menu.bg-dark {
  background: #1e1e1e !important;
  color: white !important;
}
.q-btn {
  transition: background 0.2s ease;
}
.q-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
