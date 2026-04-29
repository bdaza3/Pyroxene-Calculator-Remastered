<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  modeLabel: string
}>()
</script>

<template>
  <header class="dashboard-header">
    <div>
      <p class="eyebrow">Pyroxene Operations Dashboard</p>
      <h1>{{ title }}</h1>
      <p class="subtitle">{{ subtitle }}</p>
    </div>
    <div class="status-pill">
      <span class="status-dot" />
      {{ modeLabel }}
    </div>
  </header>
</template>
