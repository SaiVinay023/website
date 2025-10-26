<template>
  <q-layout view="hHh lpR fFf">
    <!-- HEADER -->
    <AppHeader :nav="nav" />

    <!-- FOOTER -->
    <AppFooter />

    <!-- THEME TOGGLE BUTTON (TubeLight) -->
    <TubeLight class="tubelight-fixed" @themeChanged="themeChangedHandler" />

    <!-- Slime mold background -->
    <div id="slime-bg">
    </div>

    <!-- PAGE CONTAINER -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import navigationJson from '../data/navigation.json';
import AppHeader from 'src/components/AppHeader.vue';
import AppFooter from 'src/components/AppFooter.vue';
import TubeLight from 'src/components/TubeLight.vue';

interface Theme {
  name: string;
  label: string;
  src: string;
  color: string;
}

const themes: Theme[] = [
  { name: 'light',   label: 'Light',   src: '', color: '#ffffff' },
  { name: 'dark',    label: 'Dark',    src: '', color: '#1a1a1a' },
  { name: 'sunrise', label: 'Sunrise', src: '', color: '#ff6b35' },
  { name: 'midnight',label: 'Midnight',src: '', color: '#2c3e50' },
  { name: 'forest',  label: 'Forest',  src: '', color: '#27ae60' },
  { name: 'energy',  label: 'Energy',  src: '', color: '#3498db' },
];

const nav = navigationJson.navigation;
const slimeBgEl = ref<HTMLElement | null>(null);

const applyTheme = (theme: Theme) => {
  // Theme class on html
  document.documentElement.className = themes.map(t => `theme-${t.name}`).includes(`theme-${theme.name}`)
    ? `theme-${theme.name}`
    : ''

  // Meta theme-color
  const m = document.querySelector('meta[name="theme-color"]')
  if (m) m.setAttribute('content', theme.color)

  // Filter on background div
  if (slimeBgEl.value) {
    switch (theme.name) {
      case 'dark':
        slimeBgEl.value.style.filter = 'hue-rotate(180deg) brightness(0.6)'
        break
      case 'sunrise':
        slimeBgEl.value.style.filter = 'hue-rotate(30deg) saturate(1.3)'
        break
      case 'forest':
        slimeBgEl.value.style.filter = 'hue-rotate(90deg) saturate(1.2)'
        break
      case 'energy':
        slimeBgEl.value.style.filter = 'hue-rotate(200deg) saturate(1.1)'
        break
      default:
        slimeBgEl.value.style.filter = 'none'
    }
  }
}

const zoomSlime = () => {
  if (!slimeBgEl.value) return
  slimeBgEl.value.style.transition = 'transform 1.5s ease, filter 1.5s ease'
  slimeBgEl.value.style.transform = 'scale(1.5)'
  setTimeout(() => {
    if (slimeBgEl.value) slimeBgEl.value.style.transform = 'scale(1)'
  }, 700)
}

const themeChangedHandler = (theme: Theme) => {
  applyTheme(theme);
  zoomSlime();
  localStorage.setItem('tubelight-theme', theme.name);
};

onMounted(() => {
  slimeBgEl.value = document.getElementById('slime-bg')

  // Initialize theme
  const saved = localStorage.getItem('tubelight-theme')
  let initial = themes[0]
  if (saved) {
    const i = themes.findIndex(t => t.name === saved)
    if (i >= 0) initial = themes[i]
  } else {
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
    initial = dark ? themes.find(t => t.name === 'dark')! : themes[0]
  }
  applyTheme(initial as Theme)
})
</script>

<style scoped>
#slime-bg {
  position: relative;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: url('../assets/icons/background/slime.svg') center/cover no-repeat;

  overflow: hidden;
  z-index: 0;
  pointer-events: none;
  transform-origin: center center;
  transform: scale(1);
}

.slime-mold-svg {
  width: 120%;
  height: 120%;
  transform-origin: center center;
  transition: transform 1.5s ease, filter 1.5s ease;
}

.tubelight-fixed {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  z-index: 2000;
}
</style>
