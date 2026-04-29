<script setup lang="ts">
import { usePyroDashboard } from '@/composables/usePyroDashboard'
import StatTile from '@/components/dashboard/StatTile.vue'
import TrendChart from '@/components/dashboard/TrendChart.vue'
import AllocationDonut from '@/components/dashboard/AllocationDonut.vue'

const dashboard = usePyroDashboard()
</script>

<template>
  <section class="page-grid">
    <div class="stats-row">
      <StatTile
        label="Total Pyroxene"
        :value="dashboard.totalBalanceAcrossAccounts.value.toLocaleString()"
        hint="All tracked accounts"
        tone="positive"
      />
      <StatTile
        label="Monthly Gain"
        :value="`${dashboard.monthlyGain.value >= 0 ? '+' : ''}${dashboard.monthlyGain.value.toLocaleString()}`"
        hint="Current account trend window"
        tone="positive"
      />
      <StatTile
        label="Spending Rate"
        :value="`${dashboard.spendingRate.value}%`"
        hint="Spending vs. income"
        tone="warning"
      />
      <StatTile
        label="Target Progress"
        :value="`${dashboard.targetProgress.value}%`"
        hint="Against active plan target"
        tone="positive"
      />
    </div>

    <article class="content-panel span-two">
      <div class="panel-title-row">
        <div>
          <h3>Balance History</h3>
          <p>{{ dashboard.selectedAccount.value?.name ?? 'No active account' }}</p>
        </div>
      </div>
      <TrendChart :series="dashboard.chartSeries.value" />
    </article>

    <article class="content-panel">
      <div class="panel-title-row">
        <div>
          <h3>Allocation</h3>
          <p>Enabled forecast sources</p>
        </div>
      </div>
      <AllocationDonut :items="dashboard.allocationBreakdown.value" />
    </article>

    <article class="content-panel span-two">
      <div class="panel-title-row">
        <div>
          <h3>Upcoming Window</h3>
          <p>Income opportunities before {{ dashboard.selectedBanner.value?.student ?? 'your banner' }}</p>
        </div>
      </div>
      <div class="data-list">
        <div v-for="entry in dashboard.scheduleInWindow.value" :key="entry.id" class="data-list-item">
          <div>
            <strong>{{ entry.name }}</strong>
            <span>{{ new Date(entry.startDate).toLocaleDateString() }} to {{ new Date(entry.endDate).toLocaleDateString() }}</span>
          </div>
          <strong>{{ entry.pyroxeneReward.toLocaleString() }}</strong>
        </div>
      </div>
    </article>
  </section>
</template>
