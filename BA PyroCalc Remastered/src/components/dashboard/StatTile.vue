<script setup lang="ts">
defineProps<{
  label: string
  value: string
  hint: string
  tone?: 'default' | 'positive' | 'warning'
}>()
</script>

<template>
  <article class="stat-tile" :data-tone="tone ?? 'default'">
    <p class="stat-label">{{ label }}</p>
    <strong class="stat-value">{{ value }}</strong>
    <p class="stat-hint">{{ hint }}</p>
  </article>
</template>
