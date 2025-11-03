<template>
  <div>
    <!-- Slime animation layer -->
    <div v-if="showSlime" class="slime-container">
      <div
        id="slime-bg"
        v-html="slimeSvg"
        :style="{ animationDuration: animationDuration + 's' }"
        @animationend="onAnimationEnd"
      ></div>
      <div class="slime-overlay" :style="{ backgroundColor: currentTheme!.color }"></div>
    </div>

    <!-- Theme tubelight button -->
    <QBtn
      flat round dense
      class="tubelight-btn"
      @click="cycleTheme"
      :aria-label="`Switch to ${nextTheme!.label} theme`"
    >
      <q-img :src="currentTheme!.src" class="theme-icon"/>
    </QBtn>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Ref } from "vue";
import { QBtn, QImg } from "quasar";
import lightIcon from "../assets/icons/sunLogo/light.svg";
import darkIcon from "../assets/icons/sunLogo/dark.svg";
import sunriseIcon from "../assets/icons/sunLogo/sunrise.svg";
import midnightIcon from "../assets/icons/sunLogo/midnight.svg";
import forestIcon from "../assets/icons/sunLogo/forest.svg";
import energyIcon from "../assets/icons/sunLogo/energy.svg";
import slimeSvgRaw from "../assets/icons/background/slime.svg?raw";



interface Theme { name: string; label: string; src: string; color: string; }


const slimeSvg = slimeSvgRaw;
const animationDuration = 1.5; // total: 0.5 + 0.5 + 0.5


const themes = [
  { name: "light", label: "Light", src: lightIcon, color: "#ffffff" },
  { name: "dark", label: "Dark", src: darkIcon, color: "#1a1a1a" },
  { name: "sunrise", label: "Sunrise", src: sunriseIcon, color: "#ff6b35" },
  { name: "midnight", label: "Midnight", src: midnightIcon, color: "#2c3e50" },
  { name: "forest", label: "Forest", src: forestIcon, color: "#27ae60" },
  { name: "energy", label: "Energy", src: energyIcon, color: "#3498db" },
];

const themeIndex = ref(0);
const showSlime = ref(false);

const currentTheme = computed(() => themes[themeIndex.value]) as Ref<Theme>;
const nextTheme = computed(() => themes[(themeIndex.value + 1) % themes.length]) as Ref<Theme>;

function applyTheme(theme: Theme) {
  document.documentElement.className = `theme-${theme.name}`;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme.color);
  localStorage.setItem("tubelight-theme", theme.name);
}

function cycleTheme() {
  if (showSlime.value) return;
  showSlime.value = true;
  themeIndex.value = (themeIndex.value + 1) % themes.length;
  applyTheme(currentTheme.value);
}

function onAnimationEnd() {
  showSlime.value = false;
}

onMounted(() => {
  const saved = localStorage.getItem("tubelight-theme");
  const idx = themes.findIndex(t => t.name === saved);
  themeIndex.value = idx >= 0 ? idx : 0;
  applyTheme(currentTheme.value);
});

</script>

<style lang="scss">

.slime-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1000;
}

#slime-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1200px;
  height: 1200px;
  transform-origin: center;
  animation: slimeSplash ease-in-out forwards;
}

.slime-overlay {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  mix-blend-mode: screen;
  animation: overlayFlash 1.5s forwards;
}

/* Main Splash Animation */
@keyframes slimeSplash {
  0%   { transform: translate(-50%, -50%) scale(5) rotate(0deg); }
  33%  { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
  66%  { transform: translate(-50%, -50%) scale(1) rotate(15deg); }
  100% { transform: translate(-50%, -50%) scale(5) rotate(0deg); }
}

/* Overlay color fade */
@keyframes overlayFlash {
  0%,100% { opacity: 0; }
  40%,60% { opacity: 0.45; }
}
.tubelight-btn {
  position: fixed;
  top: 50%;
  bottom: 50%;
  right: 50px;
  z-index: 1100;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: var(--q-box-shadow-8);
  }
}

</style>
