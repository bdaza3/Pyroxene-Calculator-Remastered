<script setup>
import { onMounted } from 'vue'
import { checkBoxes } from '@/scripts/checkBoxes.js'
import { initCalculations } from '@/scripts/calculationsHandler.js'
import UserSelections from './UserSelections.vue'
import Results from './Results.vue'
import Footer from './Footer.vue'
import test from './test.vue'

onMounted(() => {
  checkBoxes()
  initCalculations()
})
</script>

<template>
  <div class="main-container">
    <test />
    <div class="left-section">
      <UserSelections />
    </div>

    <div class="right-section">
      <Results />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
</style>
