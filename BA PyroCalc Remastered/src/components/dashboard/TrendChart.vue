<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, ref } from 'vue'
import Chart from 'chart.js/auto'
import type { Chart as ChartJS } from 'chart.js'

const props = defineProps<{
  series: Array<{ label: string; value: number }>
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: ChartJS | null = null

function createChart() {
  if (!canvasRef.value) return
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  const labels = props.series.map((s) => s.label)
  const data = props.series.map((s) => s.value)

  chartInstance = new Chart(ctx as CanvasRenderingContext2D, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Pyroxene',
          data,
          fill: true,
          backgroundColor: 'rgba(50,197,255,0.12)',
          borderColor: '#32C5FF',
          borderWidth: 2,
          tension: 0.25,
          pointRadius: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false }, ticks: { color: 'var(--muted, #9AA4B2)' } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: 'var(--muted, #9AA4B2)' } },
      },
      plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
    },
  })
}

onMounted(() => createChart())

onBeforeUnmount(() => {
  chartInstance?.destroy()
  chartInstance = null
})

watch(
  () => props.series,
  () => {
    chartInstance?.destroy()
    createChart()
  },
  { deep: true },
)
</script>

<template>
  <div class="trend-chart" style="height:220px">
    <canvas ref="canvasRef" aria-label="Pyroxene trend chart" role="img"></canvas>
  </div>
</template>
