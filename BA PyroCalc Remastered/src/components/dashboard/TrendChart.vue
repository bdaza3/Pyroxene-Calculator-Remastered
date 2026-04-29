<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  series: Array<{ label: string; value: number }>
}>()

const width = 560
const height = 220
const padding = 24

const points = computed(() => {
  if (props.series.length === 0) return []
  const values = props.series.map((entry) => entry.value)
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = Math.max(1, max - min)

  return props.series.map((entry, index) => {
    const x = padding + (index * (width - padding * 2)) / Math.max(1, props.series.length - 1)
    const y = height - padding - ((entry.value - min) / range) * (height - padding * 2)
    return { ...entry, x, y }
  })
})

const path = computed(() =>
  points.value.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' '),
)
</script>

<template>
  <div class="trend-chart">
    <svg :viewBox="`0 0 ${width} ${height}`" role="img" aria-label="Pyroxene trend chart">
      <defs>
        <linearGradient id="trend-fill" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(106, 196, 255, 0.35)" />
          <stop offset="100%" stop-color="rgba(106, 196, 255, 0.02)" />
        </linearGradient>
      </defs>
      <line x1="24" y1="196" x2="536" y2="196" class="axis-line" />
      <path
        v-if="points.length > 1"
        :d="`${path} L ${points[points.length - 1].x} 196 L ${points[0].x} 196 Z`"
        fill="url(#trend-fill)"
      />
      <path v-if="points.length > 1" :d="path" class="trend-line" />
      <g v-for="point in points" :key="point.label">
        <circle :cx="point.x" :cy="point.y" r="5" class="trend-point" />
        <text :x="point.x" y="212" text-anchor="middle" class="axis-label">{{ point.label }}</text>
        <text :x="point.x" :y="point.y - 12" text-anchor="middle" class="value-label">{{ point.value }}</text>
      </g>
    </svg>
  </div>
</template>
