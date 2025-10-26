<template>
  <q-header reveal bordered class="bg-primary text-white">
    <q-toolbar class="row items-center q-px-lg" style="min-height:64px;">
      <!-- LOGO + TAGLINE -->
      <div
        class="column items-center no-wrap cursor-pointer"
        @click="$router.push('/')"
        style="max-width: 200px; flex-shrink: 0; gap: 4px;"
      >
        <q-avatar square size="50px">
          <img src="../assets/icons/main/myxoflow.svg" alt="Logo" />
        </q-avatar>
        <div class="text-weight-bold text-subtitle1">MyxoFlow</div>
        <div class="text-caption" style="opacity:0.8;">We make software accessible</div>
      </div>

      <!-- NAVIGATION -->
      <div
        class="row items-center justify-evenly q-gutter-md"
        style="flex-grow:1; margin-left:32px;"
      >
        <!-- Simple Links -->
        <q-btn
          v-for="item in nav.filter((i) => !i.children && i.label.toLowerCase() !== 'home')"
          :key="item.path"
          flat
          dense
          no-caps
          class="text-white"
          :label="item.label"
          :to="item.path"
          :target="item.external ? '_blank' : '_self'"
        />

        <!-- Dropdowns -->
        <q-btn-dropdown
          v-for="item in nav.filter((i) => i.children)"
          :key="item.path"
          flat
          dense
          no-caps
          class="text-white"
          :label="item.label"
          dropdown-icon="arrow_drop_down"
        >
          <q-list>
            <q-item
              v-for="child in item.children"
              :key="child.path"
              clickable
              :to="child.path"
              tag="router-link"
            >
              <q-item-section>{{ child.label }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import navigationJson from "../data/navigation.json";
const nav = navigationJson.navigation;
</script>

<style scoped>
.q-header {
  backdrop-filter: blur(8px);
}

.q-btn {
  transition: background 0.2s ease;
}
.q-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
