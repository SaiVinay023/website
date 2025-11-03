<template>
  <q-layout view="hHh lpR fFf">
    <AppHeader :nav="nav" />
    <AppFooter />
    <TubeLight class="tubelight-fixed" />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import AppHeader from 'src/components/AppHeader.vue'
import AppFooter from 'src/components/AppFooter.vue'
import TubeLight from 'src/components/TubeLight.vue'

import navigationJson from 'src/data/navigation.json'

const nav = navigationJson.navigation as unknown as object[]

</script>
