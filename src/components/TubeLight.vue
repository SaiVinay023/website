<template>
  <q-btn
    flat
    round
    dense
    class="tubelight-btn"
    @click="cycleTheme"
    :aria-label="`Switch to ${nextTheme.label} theme`"
  >
    <q-img
      :src="currentTheme.src"
      :alt="currentTheme.label + ' theme'"
      class="theme-icon"
      spinner-color="white"
    />
  </q-btn>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { QBtn, QImg } from 'quasar'

// ---- Icons ----
import lightIcon from '../assets/icons/sunLogo/light.svg'
import darkIcon from '../assets/icons/sunLogo/dark.svg'
import sunriseIcon from '../assets/icons/sunLogo/sunrise.svg'
import midnightIcon from '../assets/icons/sunLogo/midnight.svg'
import forestIcon from '../assets/icons/sunLogo/forest.svg'
import energyIcon from '../assets/icons/sunLogo/energy.svg'

// ---- Theme definitions ----
interface Theme {
  name: string
  label: string
  src: string
  color: string
}

const themes: Theme[] = [
  { name: 'light', label: 'Light', src: lightIcon, color: '#ffffff' },
  { name: 'dark', label: 'Dark', src: darkIcon, color: '#1a1a1a' },
  { name: 'sunrise', label: 'Sunrise', src: sunriseIcon, color: '#ff6b35' },
  { name: 'midnight', label: 'Midnight', src: midnightIcon, color: '#2c3e50' },
  { name: 'forest', label: 'Forest', src: forestIcon, color: '#27ae60' },
  { name: 'energy', label: 'Energy', src: energyIcon, color: '#3498db' },
];

const emit = defineEmits<{
  (e: 'themeChanged', theme: Theme): void;
}>();


// ---- Reactive state ----
const themeIndex = ref(0)
const currentTheme = computed(() => themes[themeIndex.value] as Theme)
const nextTheme = computed(() => themes[(themeIndex.value + 1) % themes.length] as Theme)


// ---- Cycle theme ----
const cycleTheme = () => {
themeIndex.value = (themeIndex.value + 1) % themes.length
emit('themeChanged', currentTheme.value)
}

// ---- Initialize theme from localStorage or system ----
onMounted(() => {
  const saved = localStorage.getItem('tubelight-theme')
  if (saved) {
    const idx = themes.findIndex(t => t.name === saved)
    if (idx >= 0) themeIndex.value = idx
  } else {
    const Dark = window.matchMedia('(prefers-color-scheme: dark)').matches
    themeIndex.value = Dark ? themes.findIndex(t => t.name === 'dark') : 0
  }
  
})
</script>

<style scoped>
.tubelight-btn {
  min-width: 40px;
  height: 40px;
  padding: 0;
}

.theme-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.2s ease, opacity 0.3s ease;
}

.tubelight-btn:hover .theme-icon {
  transform: rotate(20deg);
}
</style>
