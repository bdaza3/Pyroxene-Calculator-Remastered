<script setup lang="ts">
import { computed } from 'vue'
import { usePyroDashboard } from '@/composables/usePyroDashboard'

const dashboard = usePyroDashboard()

const modeLabel = computed(() =>
  dashboard.mode.value === 'connected'
    ? 'Connected to local API persistence'
    : dashboard.mode.value === 'local-fallback'
      ? 'Using browser local fallback storage'
      : 'Loading data source',
)
</script>

<template>
  <section class="page-grid">
    <article class="content-panel">
      <div class="panel-title-row">
        <div>
          <h3>Workspace Status</h3>
          <p>Current environment and storage mode</p>
        </div>
      </div>
      <div class="metric-stack">
        <div class="metric-row">
          <span>Data source</span>
          <strong>{{ modeLabel }}</strong>
        </div>
        <div class="metric-row">
          <span>Accounts loaded</span>
          <strong>{{ dashboard.data.value.accounts.length }}</strong>
        </div>
        <div class="metric-row">
          <span>Plans loaded</span>
          <strong>{{ dashboard.data.value.plans.length }}</strong>
        </div>
        <div class="metric-row">
          <span>Schedule entries</span>
          <strong>{{ dashboard.data.value.schedule.length }}</strong>
        </div>
      </div>
    </article>

    <article class="content-panel">
      <div class="panel-title-row">
        <div>
          <h3>Preferences</h3>
          <p>Placeholder controls for the next backend pass</p>
        </div>
      </div>
      <div class="settings-list">
        <label class="toggle-row">
          <span>Include Grand Assault ticket value</span>
          <input :checked="dashboard.selectedAccount.value?.includeGrandTickets ?? false" type="checkbox" disabled />
        </label>
        <label class="toggle-row">
          <span>Forecast based on active banner window</span>
          <input checked type="checkbox" disabled />
        </label>
        <label class="toggle-row">
          <span>Enable API-backed persistence</span>
          <input :checked="dashboard.mode.value === 'connected'" type="checkbox" disabled />
        </label>
      </div>
    </article>

    <article class="content-panel span-two">
      <div class="panel-title-row">
        <div>
          <h3>Project Notes</h3>
          <p>What this refactor now supports</p>
        </div>
      </div>
      <div class="notes-block">
        <p>This version is now organized as a route-based multi-page dashboard with a shared sidebar shell.</p>
        <p>Each page maps directly to the sidebar: Dashboard, Calculator, History, Analytics, Database, and Settings.</p>
        <p>The backend remains lightweight and file-backed for now, but the data shapes are ready for a future PostgreSQL migration.</p>
      </div>
    </article>
  </section>
</template>
