<template>
  <q-footer
    bordered
    class="bg-grey-9 text-white q-pa-md transition-all"
    :class="isFooterVisible ? 'translate-y-0' : 'translate-y-full'"
    style="position: fixed; bottom: 0; left: 0; right: 0; z-index: 1000;"
  >
    <!-- COLLAPSE/EXPAND TOGGLE -->
    <div
      class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-grey-9 rounded-t-full cursor-pointer flex items-center justify-center"
      style="width: 40px; height: 20px;"
      @click="toggleFooter"
    >
      <q-icon
        name="keyboard_arrow_up"
        size="sm"
        :class="{ 'rotate-180': isFooterVisible }"
        class="transition-transform"
      />
    </div>

    <!-- FOOTER CONTENT -->
    <div class="row q-col-gutter-md justify-around" v-show="isFooterVisible">
      <div
        class="col-12 col-sm-3"
        v-for="(section, sectionName) in footer"
        :key="sectionName"
      >
        <div class="text-subtitle2 text-uppercase q-mb-sm">
          {{ sectionName }}
        </div>
        <q-list dense>
          <q-item
            v-for="link in section"
            :key="link.path"
            clickable
            tag="router-link"
            :to="link.path"
            class="text-white"
          >
            <q-item-section>{{ link.label }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <div class="text-center q-mt-md text-grey-4" v-show="isFooterVisible">
      © 2025 MyxoFlow. All rights reserved.
    </div>
  </q-footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import navigationJson from "../data/navigation.json";

const footer = navigationJson.footer;
const isFooterVisible = ref(false);

const toggleFooter = () => {
  isFooterVisible.value = !isFooterVisible.value;
};

// Automatically reveal footer when scrolling to bottom
const handleScroll = () => {
  const scrolledToBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 20;
  isFooterVisible.value = scrolledToBottom;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.transition-all {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.translate-y-full {
  transform: translateY(calc(100% - 20px)); /* keep arrow visible */
}

.translate-y-0 {
  transform: translateY(0);
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
