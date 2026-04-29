<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  items: Array<{ label: string; value: number; color: string }>
}>()

const radius = 102
const circumference = 2 * Math.PI * radius
const total = computed(() => props.items.reduce((sum, item) => sum + item.value, 0))

const segments = computed(() => {
  let offset = 0
  return props.items.map((item) => {
    const ratio = total.value === 0 ? 0 : item.value / total.value
    const dash = ratio * circumference
    const segment = {
      ...item,
      dasharray: `${dash} ${circumference - dash}`,
      dashoffset: -offset,
      percent: total.value === 0 ? 0 : Math.round(ratio * 100),
    }
    offset += dash
    return segment
  })
})
</script>

<template>
  <div class="allocation-card">
    <div class="allocation-ring">
      <svg viewBox="0 0 260 260" role="img" aria-label="Allocation breakdown">
        <circle cx="130" cy="130" :r="radius" class="allocation-track" />
        <circle
          v-for="segment in segments"
          :key="segment.label"
          cx="130"
          cy="130"
          :r="radius"
          class="allocation-segment"
          :stroke="segment.color"
          :stroke-dasharray="segment.dasharray"
          :stroke-dashoffset="segment.dashoffset"
        />
      </svg>
      <div class="allocation-center">
        <strong>{{ total.toLocaleString() }}</strong>
        <span>Projected Pyroxenes</span>
      </div>
    </div>

    <ul class="allocation-legend">
      <li v-for="segment in segments" :key="segment.label">
        <span class="allocation-swatch" :style="{ backgroundColor: segment.color }" />
        <span>{{ segment.label }}</span>
        <strong>{{ segment.percent }}%</strong>
      </li>
    </ul>
  </div>
</template>
