<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue'
import DashboardHeader from './DashboardHeader.vue'
import StatTile from './StatTile.vue'
import TrendChart from './TrendChart.vue'
import { usePyroDashboard } from '@/composables/usePyroDashboard'
import type { PlanStatus, ProjectionKey } from '@/types/dashboard'

const dashboard = usePyroDashboard()

const accountForm = reactive({
  name: '',
  region: 'Global' as const,
  level: 85,
  joinedAt: '2026-04-28',
  pyroxene: 12000,
  monthlyBudget: 0,
  goalLabel: '',
  tacticalRank: 'rank1000' as const,
  totalAssaultTier: 'silver' as const,
  includeGrandTickets: false,
})

const snapshotForm = reactive({
  pyroxene: 0,
  note: '',
})

const transactionForm = reactive({
  type: 'income' as const,
  amount: 1650,
  category: 'Event',
  note: '',
})

const planForm = reactive({
  title: '',
  bannerId: '',
  targetPyroxene: 24000,
  reservedPyroxene: 0,
  status: 'draft' as const,
  notes: '',
})

const backendLabel = computed(() => {
  if (dashboard.mode.value === 'loading') return 'Loading data'
  return dashboard.mode.value === 'connected'
    ? 'API connected with persistent storage'
    : 'Running in local demo persistence mode'
})

const goalReadout = computed(() => {
  const account = dashboard.selectedAccount.value
  if (!account) return 'No account selected'
  return `${account.name} is saving for ${account.goalLabel || 'the next spark'}`
})

function toggleProjection(key: ProjectionKey, enabled: boolean) {
  dashboard.projectionToggles[key] = enabled
}

async function handleCreateAccount() {
  await dashboard.addAccount({ ...accountForm })
  accountForm.name = ''
  accountForm.goalLabel = ''
}

async function handleSnapshot() {
  await dashboard.addSnapshot(snapshotForm.pyroxene, snapshotForm.note)
  snapshotForm.note = ''
}

async function handleTransaction() {
  await dashboard.addTransaction(
    transactionForm.type,
    transactionForm.amount,
    transactionForm.category,
    transactionForm.note,
  )
  transactionForm.note = ''
}

async function handlePlan() {
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

onMounted(async () => {
  await dashboard.load()
  snapshotForm.pyroxene = dashboard.selectedAccount.value?.pyroxene ?? 0
  planForm.bannerId = dashboard.selectedBannerId.value
})

watch(
  () => dashboard.selectedAccount.value?.id,
  () => {
    snapshotForm.pyroxene = dashboard.selectedAccount.value?.pyroxene ?? 0
  },
)

watch(
  () => dashboard.selectedBannerId.value,
  (bannerId) => {
    if (!planForm.bannerId) {
      planForm.bannerId = bannerId
    }
  },
)
</script>

<template>
  <main class="dashboard-page">
    <section class="hero-band">
      <DashboardHeader
        title="From single-page calculator to full-stack planning workspace"
        subtitle="Track accounts, store historical balances, compare banner timelines, and turn pyroxene planning into something you can actually manage over time."
        :mode-label="backendLabel"
      />
    </section>

    <section v-if="dashboard.isLoading.value" class="loading-state">
      <p>Loading dashboard data...</p>
    </section>

    <template v-else>
      <section class="control-band">
        <div class="control-cluster">
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

        <div class="control-summary">
          <p class="eyebrow">Current workspace</p>
          <strong>{{ goalReadout }}</strong>
          <span v-if="dashboard.selectedBanner.value">
            Forecasting through {{ dashboard.selectedBanner.value.student }} on
            {{ new Date(dashboard.selectedBanner.value.startDate).toLocaleDateString() }}
          </span>
        </div>
      </section>

      <section class="stats-band">
        <StatTile
          label="Current balance"
          :value="`${dashboard.selectedAccount.value?.pyroxene.toLocaleString() ?? 0} pyro`"
          hint="Persisted per account"
        />
        <StatTile
          label="Projected total"
          :value="`${dashboard.projectionSummary.value.projectedTotal.toLocaleString()} pyro`"
          :hint="`${dashboard.projectionSummary.value.daysUntilBanner} days to banner`"
          tone="positive"
        />
        <StatTile
          label="Net trend"
          :value="`${dashboard.latestDelta.value >= 0 ? '+' : ''}${dashboard.latestDelta.value.toLocaleString()} pyro`"
          hint="Latest snapshot delta"
        />
        <StatTile
          label="Goal gap"
          :value="`${dashboard.projectionSummary.value.goalGap.toLocaleString()} pyro`"
          :hint="dashboard.projectionSummary.value.readyByBanner ? 'On pace to spark' : 'Additional savings needed'"
          :tone="dashboard.projectionSummary.value.readyByBanner ? 'positive' : 'warning'"
        />
      </section>

      <section class="workspace-band">
        <div class="workspace-grid">
          <article class="panel">
            <div class="panel-header">
              <div>
                <p class="eyebrow">Accounts</p>
                <h2>Profile and quick capture</h2>
              </div>
            </div>

            <div v-if="dashboard.selectedAccount.value" class="account-overview">
              <div>
                <strong>{{ dashboard.selectedAccount.value.name }}</strong>
                <p>
                  Level {{ dashboard.selectedAccount.value.level }} - {{ dashboard.selectedAccount.value.region }} -
                  Joined {{ new Date(dashboard.selectedAccount.value.joinedAt).toLocaleDateString() }}
                </p>
              </div>
              <div>
                <strong>${{ dashboard.selectedAccount.value.monthlyBudget }}/month</strong>
                <p>{{ dashboard.selectedAccount.value.goalLabel }}</p>
              </div>
            </div>

            <form class="stack-form" @submit.prevent="handleCreateAccount">
              <h3>Create account</h3>
              <div class="two-up">
                <label>
                  Name
                  <input v-model="accountForm.name" required placeholder="Guild account name" />
                </label>
                <label>
                  Region
                  <select v-model="accountForm.region">
                    <option>Global</option>
                    <option>NA</option>
                    <option>EU</option>
                    <option>APAC</option>
                  </select>
                </label>
              </div>

              <div class="two-up">
                <label>
                  Level
                  <input v-model.number="accountForm.level" type="number" min="1" max="100" />
                </label>
                <label>
                  Starting pyroxene
                  <input v-model.number="accountForm.pyroxene" type="number" min="0" />
                </label>
              </div>

              <div class="two-up">
                <label>
                  Monthly budget
                  <input v-model.number="accountForm.monthlyBudget" type="number" min="0" />
                </label>
                <label>
                  Goal label
                  <input v-model="accountForm.goalLabel" placeholder="What are we saving for?" />
                </label>
              </div>

              <button class="primary-button" type="submit">Add account</button>
            </form>

            <form class="stack-form" @submit.prevent="handleSnapshot">
              <h3>Log snapshot</h3>
              <div class="two-up">
                <label>
                  Current pyroxene
                  <input v-model.number="snapshotForm.pyroxene" type="number" min="0" />
                </label>
                <label>
                  Note
                  <input v-model="snapshotForm.note" placeholder="Raid reset, event clear, pull reset..." />
                </label>
              </div>
              <button class="secondary-button" type="submit">Save snapshot</button>
            </form>

            <form class="stack-form" @submit.prevent="handleTransaction">
              <h3>Log transaction</h3>
              <div class="three-up">
                <label>
                  Type
                  <select v-model="transactionForm.type">
                    <option value="income">Income</option>
                    <option value="spend">Spend</option>
                  </select>
                </label>
                <label>
                  Amount
                  <input v-model.number="transactionForm.amount" type="number" min="0" />
                </label>
                <label>
                  Category
                  <input v-model="transactionForm.category" placeholder="Event, Banner, Shop..." />
                </label>
              </div>
              <label>
                Note
                <input v-model="transactionForm.note" placeholder="Optional context" />
              </label>
              <button class="secondary-button" type="submit">Add transaction</button>
            </form>
          </article>

          <article class="panel panel-wide">
            <div class="panel-header">
              <div>
                <p class="eyebrow">Analytics</p>
                <h2>Historical balance trend</h2>
              </div>
            </div>
            <TrendChart :series="dashboard.chartSeries.value" />

            <div class="history-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Snapshot</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="entry in dashboard.accountSnapshots.value" :key="entry.id">
                    <td>{{ new Date(entry.recordedAt).toLocaleDateString() }}</td>
                    <td>{{ entry.pyroxene.toLocaleString() }}</td>
                    <td>{{ entry.note }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div>
                <p class="eyebrow">Forecast</p>
                <h2>Banner planning model</h2>
              </div>
            </div>

            <div class="projection-list">
              <label v-for="source in dashboard.projectionSources.value" :key="source.key" class="projection-row">
                <span>
                  <strong>{{ source.label }}</strong>
                  <small>{{ source.cadence }}</small>
                </span>
                <span class="projection-controls">
                  <input
                    :checked="dashboard.projectionToggles[source.key]"
                    type="checkbox"
                    @change="toggleProjection(source.key, ($event.target as HTMLInputElement).checked)"
                  />
                  <strong>{{ source.amount.toLocaleString() }}</strong>
                </span>
              </label>
            </div>

            <div class="forecast-summary">
              <p>
                Scheduled income in window:
                <strong>{{ dashboard.projectionSummary.value.totalScheduledIncome.toLocaleString() }}</strong>
              </p>
              <p>
                Projection gain:
                <strong>{{ dashboard.projectionSummary.value.projectedGain.toLocaleString() }}</strong>
              </p>
              <p>
                Status:
                <strong>{{ dashboard.projectionSummary.value.readyByBanner ? 'Ready to spark' : 'Still short' }}</strong>
              </p>
            </div>
          </article>

          <article class="panel">
            <div class="panel-header">
              <div>
                <p class="eyebrow">Plans</p>
                <h2>CRUD recruitment goals</h2>
              </div>
            </div>

            <form class="stack-form" @submit.prevent="handlePlan">
              <div class="two-up">
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
              <div class="three-up">
                <label>
                  Target pyroxene
                  <input v-model.number="planForm.targetPyroxene" type="number" min="0" />
                </label>
                <label>
                  Reserved pyroxene
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
                <input v-model="planForm.notes" placeholder="Risk, assumptions, or pull strategy" />
              </label>
              <button class="primary-button" type="submit">Create plan</button>
            </form>

            <div class="plan-list">
              <article v-for="plan in dashboard.accountPlans.value" :key="plan.id" class="plan-item">
                <div>
                  <strong>{{ plan.title }}</strong>
                  <p>
                    Target {{ plan.targetPyroxene.toLocaleString() }} - Reserve
                    {{ plan.reservedPyroxene.toLocaleString() }}
                  </p>
                </div>
                <div class="plan-actions">
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
              </article>
            </div>
          </article>

          <article class="panel panel-wide">
            <div class="panel-header">
              <div>
                <p class="eyebrow">Schedule and activity</p>
                <h2>Upcoming earning windows and account ledger</h2>
              </div>
            </div>

            <div class="schedule-grid">
              <div class="mini-panel">
                <h3>Projected schedule</h3>
                <ul class="schedule-list">
                  <li v-for="entry in dashboard.scheduleInWindow.value" :key="entry.id">
                    <strong>{{ entry.name }}</strong>
                    <span>
                      {{ new Date(entry.startDate).toLocaleDateString() }} -
                      {{ entry.pyroxeneReward.toLocaleString() }} pyro
                    </span>
                  </li>
                </ul>
              </div>

              <div class="mini-panel">
                <h3>Recent transactions</h3>
                <ul class="transaction-list">
                  <li v-for="transaction in dashboard.accountTransactions.value" :key="transaction.id">
                    <strong :class="transaction.amount >= 0 ? 'positive-text' : 'negative-text'">
                      {{ transaction.amount >= 0 ? '+' : '' }}{{ transaction.amount.toLocaleString() }}
                    </strong>
                    <span>
                      {{ transaction.category }} - {{ new Date(transaction.recordedAt).toLocaleDateString() }}
                    </span>
                    <small>{{ transaction.note }}</small>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>
    </template>
  </main>
</template>
