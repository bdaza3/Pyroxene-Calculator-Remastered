<script setup lang="ts">
import { computed } from 'vue'
import { usePyroDashboard } from '@/composables/usePyroDashboard'
import TrendChart from '@/components/dashboard/TrendChart.vue'
import AllocationDonut from '@/components/dashboard/AllocationDonut.vue'

const dashboard = usePyroDashboard()

const scheduleByKind = computed(() => {
  const groups = new Map<string, number>()
  for (const entry of dashboard.scheduleInWindow.value) {
    groups.set(entry.kind, (groups.get(entry.kind) ?? 0) + entry.pyroxeneReward)
  }
  return [...groups.entries()].map(([label, value], index) => ({
    label,
    value,
    color: ['#57c7f2', '#6fd8ff', '#8f76e5', '#a88ef4'][index % 4],
  }))
})
</script>

<template>
  <section class="page-grid">
    <article class="content-panel span-two">
      <div class="panel-title-row">
        <div>
          <h3>Balance Trend</h3>
          <p>Historical Pyroxene accumulation over saved snapshots</p>
        </div>
      </div>
      <TrendChart :series="dashboard.chartSeries.value" />
    </article>

    <article class="content-panel">
      <div class="panel-title-row">
        <div>
          <h3>Schedule Mix</h3>
          <p>Income by event type before banner launch</p>
        </div>
      </div>
      <AllocationDonut :items="scheduleByKind" />
    </article>

    <article class="content-panel">
      <div class="panel-title-row">
        <div>
          <h3>Performance Signals</h3>
          <p>Simple reads across the active account</p>
        </div>
      </div>
      <div class="metric-stack">
        <div class="metric-row">
          <span>Latest delta</span>
          <strong>{{ dashboard.latestDelta.value.toLocaleString() }}</strong>
        </div>
        <div class="metric-row">
          <span>Current spending rate</span>
          <strong>{{ dashboard.spendingRate.value }}%</strong>
        </div>
        <div class="metric-row">
          <span>Accounts tracked</span>
          <strong>{{ dashboard.data.value.accounts.length }}</strong>
        </div>
        <div class="metric-row">
          <span>Saved plans</span>
          <strong>{{ dashboard.data.value.plans.length }}</strong>
        </div>
      </div>
    </article>

    <article class="content-panel span-two">
      <div class="panel-title-row">
        <div>
          <h3>Forecast Breakdown</h3>
          <p>Enabled projection sources ranked by contribution</p>
        </div>
      </div>
      <div class="data-list">
        <div v-for="source in dashboard.projectionSources.value" :key="source.key" class="data-list-item">
          <div>
            <strong>{{ source.label }}</strong>
            <span>{{ source.cadence }}</span>
          </div>
          <strong>{{ source.enabled ? source.amount.toLocaleString() : 'Disabled' }}</strong>
        </div>
      </div>
    </article>
  </section>
</template>
