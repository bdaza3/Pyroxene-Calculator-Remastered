<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, ref } from 'vue'
import Chart from 'chart.js/auto'
import type { Chart as ChartJS } from 'chart.js'

const props = defineProps<{
  items: Array<{ label: string; value: number; color: string }>
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: ChartJS | null = null

function createChart() {
  if (!canvasRef.value) return
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  const labels = props.items.map((i) => i.label)
  const data = props.items.map((i) => i.value)
  const backgroundColor = props.items.map((i) => i.color)

  chartInstance = new Chart(ctx as CanvasRenderingContext2D, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: { position: 'right', labels: { color: 'var(--muted, #9AA4B2)' } },
        tooltip: { callbacks: { label: (context) => `${context.label}: ${context.parsed}` } },
      },
    },
  })
}

onMounted(() => createChart())

onBeforeUnmount(() => {
  chartInstance?.destroy()
  chartInstance = null
})

watch(
  () => props.items,
  () => {
    chartInstance?.destroy()
    createChart()
  },
  { deep: true },
)
</script>

<template>
  <div class="allocation-card" style="height:220px">
    <canvas ref="canvasRef" aria-label="Allocation breakdown" role="img"></canvas>
  </div>
</template>
