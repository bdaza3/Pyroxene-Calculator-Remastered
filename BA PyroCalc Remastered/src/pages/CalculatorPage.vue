<script setup lang="ts">
import { reactive, watch } from 'vue'
import { usePyroDashboard } from '@/composables/usePyroDashboard'
import type { PlanStatus, ProjectionKey } from '@/types/dashboard'

const dashboard = usePyroDashboard()

const planForm = reactive({
  title: '',
  bannerId: '',
  targetPyroxene: 24000,
  reservedPyroxene: 0,
  status: 'draft' as PlanStatus,
  notes: '',
})

function toggleProjection(key: ProjectionKey, enabled: boolean) {
  dashboard.projectionToggles[key] = enabled
}

async function submitPlan() {
  await dashboard.addPlan({
    title: planForm.title,
    bannerId: planForm.bannerId || dashboard.selectedBannerId.value,
    targetPyroxene: planForm.targetPyroxene,
    reservedPyroxene: planForm.reservedPyroxene,
    status: planForm.status,
    notes: planForm.notes,
  })
  planForm.title = ''
  planForm.notes = ''
  planForm.reservedPyroxene = 0
}

watch(//Watch for changes in the selected banner ID
  () => dashboard.selectedBannerId.value,
  (value) => {
    if (!planForm.bannerId) {
      planForm.bannerId = value
    }
  },
  { immediate: true },
)
</script>

<template>
  <section class="page-grid">
    <article class="content-panel">
      <div class="panel-title-row">
        <div>
          <h3>Forecast Controls</h3>
          <p>Select the active account and target banner</p>
        </div>
      </div>

      <div class="form-grid two-columns">
        <label>
          Active account
          <select v-model="dashboard.selectedAccountId.value">
            <option v-for="account in dashboard.data.value.accounts" :key="account.id" :value="account.id">
              {{ account.name }} - {{ account.region }}
            </option>
          </select>
        </label>
        <label>
          Forecast banner
          <select v-model="dashboard.selectedBannerId.value">
            <option v-for="banner in dashboard.data.value.banners" :key="banner.id" :value="banner.id">
              {{ banner.student }} - {{ new Date(banner.startDate).toLocaleDateString() }}
            </option>
          </select>
        </label>
      </div>

      <div class="projection-stack">
        <label v-for="source in dashboard.projectionSources.value" :key="source.key" class="projection-entry">
          <div>
            <strong>{{ source.label }}</strong>
            <span>{{ source.cadence }}</span>
          </div>
          <div class="projection-meta">
            <input
              :checked="dashboard.projectionToggles[source.key]"
              type="checkbox"
              @change="toggleProjection(source.key, ($event.target as HTMLInputElement).checked)"
            />
            <strong>{{ source.amount.toLocaleString() }}</strong>
          </div>
        </label>
      </div>
    </article>

    <article class="content-panel">
      <div class="panel-title-row">
        <div>
          <h3>Projection Summary</h3>
          <p>Outcome before the selected banner begins</p>
        </div>
      </div>

      <div class="metric-stack">
        <div class="metric-row">
          <span>Days until banner</span>
          <strong>{{ dashboard.projectionSummary.value.daysUntilBanner }}</strong>
        </div>
        <div class="metric-row">
          <span>Projected gain</span>
          <strong>{{ dashboard.projectionSummary.value.projectedGain.toLocaleString() }}</strong>
        </div>
        <div class="metric-row">
          <span>Projected total</span>
          <strong>{{ dashboard.projectionSummary.value.projectedTotal.toLocaleString() }}</strong>
        </div>
        <div class="metric-row">
          <span>Goal gap</span>
          <strong>{{ dashboard.projectionSummary.value.goalGap.toLocaleString() }}</strong>
        </div>
      </div>

      <div class="readiness-banner" :data-ready="dashboard.projectionSummary.value.readyByBanner">
        {{ dashboard.projectionSummary.value.readyByBanner ? 'Ready to spark by banner launch' : 'Still short of target by launch window' }}
      </div>
    </article>

    <article class="content-panel span-two">
      <div class="panel-title-row">
        <div>
          <h3>Create Plan</h3>
          <p>Store a recruit target tied to a banner</p>
        </div>
      </div>

      <form class="form-grid" @submit.prevent="submitPlan">
        <div class="form-grid two-columns">
          <label>
            Plan title
            <input v-model="planForm.title" required placeholder="Mika spark reserve" />
          </label>
          <label>
            Banner
            <select v-model="planForm.bannerId">
              <option v-for="banner in dashboard.data.value.banners" :key="banner.id" :value="banner.id">
                {{ banner.student }}
              </option>
            </select>
          </label>
        </div>

        <div class="form-grid three-columns">
          <label>
            Target Pyroxene
            <input v-model.number="planForm.targetPyroxene" type="number" min="0" />
          </label>
          <label>
            Reserved Pyroxene
            <input v-model.number="planForm.reservedPyroxene" type="number" min="0" />
          </label>
          <label>
            Status
            <select v-model="planForm.status">
              <option value="draft">Draft</option>
              <option value="watching">Watching</option>
              <option value="ready">Ready</option>
            </select>
          </label>
        </div>

        <label>
          Notes
          <input v-model="planForm.notes" placeholder="Reserve rules, assumptions, or desired pull strategy" />
        </label>

        <button class="primary-button" type="submit">Save Plan</button>
      </form>

      <div class="data-list">
        <div v-for="plan in dashboard.accountPlans.value" :key="plan.id" class="data-list-item">
          <div>
            <strong>{{ plan.title }}</strong>
            <span>Target {{ plan.targetPyroxene.toLocaleString() }} - Reserve {{ plan.reservedPyroxene.toLocaleString() }}</span>
          </div>
          <div class="inline-actions">
            <select
              :value="plan.status"
              @change="dashboard.setPlanStatus(plan.id, ($event.target as HTMLSelectElement).value as PlanStatus)"
            >
              <option value="draft">Draft</option>
              <option value="watching">Watching</option>
              <option value="ready">Ready</option>
            </select>
            <button class="ghost-button" type="button" @click="dashboard.deletePlan(plan.id)">Delete</button>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>
