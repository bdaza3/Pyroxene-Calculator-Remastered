import { computed, reactive, ref } from 'vue'
import {
  createAccount,
  createPlan,
  createSnapshot,
  createTransaction,
  loadDashboardBootstrap,
  persistLocalData,
  removePlan,
  updatePlanStatus,
} from '@/services/dashboardApi'
import type {
  Account,
  BackendMode,
  DashboardBootstrap,
  Plan,
  PlanStatus,
  ProjectionSource,
  RaidTier,
  Snapshot,
  TacticalRank,
  Transaction,
} from '@/types/dashboard'

const rankRewardMap: Record<TacticalRank, number> = {
  rank15000: 10,
  rank8000: 12,
  rank4000: 14,
  rank2000: 16,
  rank1000: 18,
  rank500: 20,
  rank200: 25,
  rank100: 30,
  rank10: 35,
  rank2: 40,
  rank1: 45,
}

const totalAssaultRewardMap: Record<RaidTier, number> = {
  bronze: 1250,
  silver: 1450,
  gold: 1650,
  platinum: 1850,
}

function diffInDays(from: Date, to: Date) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24
  return Math.max(0, Math.ceil((to.getTime() - from.getTime()) / millisecondsPerDay))
}

function sortByDateDesc<T extends { recordedAt?: string; createdAt?: string; startDate?: string }>(entries: T[]) {
  return [...entries].sort((left, right) => {
    const leftDate = left.recordedAt ?? left.createdAt ?? left.startDate ?? ''
    const rightDate = right.recordedAt ?? right.createdAt ?? right.startDate ?? ''
    return new Date(rightDate).getTime() - new Date(leftDate).getTime()
  })
}

const mode = ref<BackendMode>('loading')
const data = ref<DashboardBootstrap>({
  accounts: [],
  banners: [],
  snapshots: [],
  plans: [],
  transactions: [],
  schedule: [],
})
const isLoading = ref(true)
const hasLoaded = ref(false)
const selectedAccountId = ref('')
const selectedBannerId = ref('')

const projectionToggles = reactive({
  dailyLogin: true,
  dailyTasks: true,
  weeklyTasks: true,
  eventRewards: true,
  maintenance: true,
  tacticalChallenge: true,
  totalAssault: true,
  grandAssault: true,
  bimonthlyPack: false,
  monthlyPack: false,
})

const selectedAccount = computed(() => data.value.accounts.find((entry) => entry.id === selectedAccountId.value) ?? null)
const selectedBanner = computed(() => data.value.banners.find((entry) => entry.id === selectedBannerId.value) ?? null)

const accountSnapshots = computed(() =>
  sortByDateDesc(data.value.snapshots.filter((entry) => entry.accountId === selectedAccountId.value)),
)
const accountTransactions = computed(() =>
  sortByDateDesc(data.value.transactions.filter((entry) => entry.accountId === selectedAccountId.value)),
)
const accountPlans = computed(() =>
  sortByDateDesc(data.value.plans.filter((entry) => entry.accountId === selectedAccountId.value)),
)

const scheduleInWindow = computed(() => {
  if (!selectedBanner.value) return []
  const today = new Date()
  const bannerDate = new Date(selectedBanner.value.startDate)
  return data.value.schedule
    .filter((entry) => {
      const start = new Date(entry.startDate)
      return start >= today && start <= bannerDate
    })
    .sort((left, right) => new Date(left.startDate).getTime() - new Date(right.startDate).getTime())
})

const daysUntilBanner = computed(() => {
  if (!selectedBanner.value) return 0
  return diffInDays(new Date(), new Date(selectedBanner.value.startDate))
})

const projectionSources = computed<ProjectionSource[]>(() => {
  if (!selectedAccount.value) return []
  const days = daysUntilBanner.value
  const tacticalReward = rankRewardMap[selectedAccount.value.tacticalRank]
  const totalAssaultReward = totalAssaultRewardMap[selectedAccount.value.totalAssaultTier]
  const eventEntries = scheduleInWindow.value.filter((entry) => entry.kind === 'event')
  const maintenanceEntries = scheduleInWindow.value.filter((entry) => entry.kind === 'maintenance')
  const totalAssaultEntries = scheduleInWindow.value.filter((entry) => entry.kind === 'totalAssault')
  const grandAssaultEntries = scheduleInWindow.value.filter((entry) => entry.kind === 'grandAssault')
  const grandAssaultReward = selectedAccount.value.includeGrandTickets ? 1850 : 650

  return [
    {
      key: 'dailyLogin',
      label: 'Daily Login',
      amount: Math.floor(days / 10) * 150,
      cadence: '150 every 10 days',
      enabled: projectionToggles.dailyLogin,
    },
    {
      key: 'dailyTasks',
      label: 'Daily Tasks',
      amount: days * 20,
      cadence: '20 per day',
      enabled: projectionToggles.dailyTasks,
    },
    {
      key: 'weeklyTasks',
      label: 'Weekly Tasks',
      amount: Math.floor(days / 7) * 120,
      cadence: '120 every 7 days',
      enabled: projectionToggles.weeklyTasks,
    },
    {
      key: 'maintenance',
      label: 'Maintenance Compensation',
      amount: maintenanceEntries.length * 840,
      cadence: `${maintenanceEntries.length} estimated maintenances`,
      enabled: projectionToggles.maintenance,
    },
    {
      key: 'eventRewards',
      label: 'Event Rewards',
      amount: eventEntries.length * 1650,
      cadence: `${eventEntries.length} projected events`,
      enabled: projectionToggles.eventRewards,
    },
    {
      key: 'tacticalChallenge',
      label: 'Tactical Challenge',
      amount: days * tacticalReward,
      cadence: `${tacticalReward} per day`,
      enabled: projectionToggles.tacticalChallenge,
    },
    {
      key: 'totalAssault',
      label: 'Total Assault',
      amount: totalAssaultEntries.length * totalAssaultReward,
      cadence: `${totalAssaultReward} per raid`,
      enabled: projectionToggles.totalAssault,
    },
    {
      key: 'grandAssault',
      label: 'Grand Assault',
      amount: grandAssaultEntries.length * grandAssaultReward,
      cadence: `${grandAssaultReward} per raid`,
      enabled: projectionToggles.grandAssault,
    },
    {
      key: 'bimonthlyPack',
      label: 'Bimonthly Pack',
      amount: 176 + days * 20,
      cadence: '176 upfront + 20 per day',
      enabled: projectionToggles.bimonthlyPack,
    },
    {
      key: 'monthlyPack',
      label: 'Monthly Pack',
      amount: 392 + days * 40,
      cadence: '392 upfront + 40 per day',
      enabled: projectionToggles.monthlyPack,
    },
  ]
})

const enabledProjectionTotal = computed(() =>
  projectionSources.value
    .filter((entry) => entry.enabled)
    .reduce((sum, entry) => sum + entry.amount, 0),
)

const activePlan = computed(() => accountPlans.value[0] ?? null)

const projectionSummary = computed(() => {
  if (!selectedAccount.value) {
    return {
      daysUntilBanner: 0,
      projectedTotal: 0,
      projectedGain: 0,
      totalScheduledIncome: 0,
      goalGap: 0,
      readyByBanner: false,
    }
  }

  const goalTarget = activePlan.value?.targetPyroxene ?? 24000
  const reserve = activePlan.value?.reservedPyroxene ?? 0
  const projectedGain = enabledProjectionTotal.value
  const projectedTotal = selectedAccount.value.pyroxene + projectedGain - reserve
  const goalGap = Math.max(0, goalTarget - projectedTotal)

  return {
    daysUntilBanner: daysUntilBanner.value,
    projectedTotal,
    projectedGain,
    totalScheduledIncome: scheduleInWindow.value.reduce((sum, entry) => sum + entry.pyroxeneReward, 0),
    goalGap,
    readyByBanner: projectedTotal >= goalTarget,
  }
})

const chartSeries = computed(() =>
  [...accountSnapshots.value]
    .sort((left, right) => new Date(left.recordedAt).getTime() - new Date(right.recordedAt).getTime())
    .map((entry) => ({
      label: new Date(entry.recordedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      value: entry.pyroxene,
    })),
)

const latestDelta = computed(() => {
  if (chartSeries.value.length < 2) return 0
  const latest = chartSeries.value[chartSeries.value.length - 1]
  const previous = chartSeries.value[chartSeries.value.length - 2]
  return latest.value - previous.value
})

const totalBalanceAcrossAccounts = computed(() =>
  data.value.accounts.reduce((sum, account) => sum + account.pyroxene, 0),
)

const monthlyGain = computed(() => {
  if (chartSeries.value.length < 2) return 0
  return chartSeries.value[chartSeries.value.length - 1].value - chartSeries.value[0].value
})

const spendingRate = computed(() => {
  const spending = accountTransactions.value
    .filter((entry) => entry.type === 'spend')
    .reduce((sum, entry) => sum + Math.abs(entry.amount), 0)
  const income = accountTransactions.value
    .filter((entry) => entry.type === 'income')
    .reduce((sum, entry) => sum + entry.amount, 0)
  if (income === 0) return 0
  return Math.round((spending / income) * 100)
})

const targetProgress = computed(() => {
  const target = activePlan.value?.targetPyroxene ?? 24000
  if (!selectedAccount.value) return 0
  return Math.min(100, Math.round((selectedAccount.value.pyroxene / target) * 100))
})

const allocationBreakdown = computed(() => {
  const sources = projectionSources.value.filter((entry) => entry.enabled && entry.amount > 0)
  const palette = ['#57c7f2', '#6fd8ff', '#8f76e5', '#a88ef4', '#4da9c8']
  return sources.slice(0, 5).map((entry, index) => ({
    label: entry.label,
    value: entry.amount,
    color: palette[index % palette.length],
  }))
})

function syncLocalIfNeeded() {
  if (mode.value !== 'connected') {
    persistLocalData(data.value)
  }
}

async function load() {
  if (hasLoaded.value) return
  isLoading.value = true
  const response = await loadDashboardBootstrap()
  data.value = response.data
  mode.value = response.mode
  selectedAccountId.value = response.data.accounts[0]?.id ?? ''
  selectedBannerId.value = response.data.banners[0]?.id ?? ''
  isLoading.value = false
  hasLoaded.value = true
}

async function addAccount(payload: Omit<Account, 'id'>) {
  const account: Account = {
    id: crypto.randomUUID(),
    ...payload,
  }
  const created = await createAccount(account, mode.value)
  data.value.accounts.unshift(created)
  selectedAccountId.value = created.id
  syncLocalIfNeeded()
}

async function addSnapshot(pyroxene: number, note: string) {
  if (!selectedAccount.value) return
  const snapshot: Snapshot = {
    id: crypto.randomUUID(),
    accountId: selectedAccount.value.id,
    recordedAt: new Date().toISOString().slice(0, 10),
    pyroxene,
    note,
  }
  await createSnapshot(snapshot, pyroxene, mode.value)
  data.value.snapshots.unshift(snapshot)
  selectedAccount.value.pyroxene = pyroxene
  syncLocalIfNeeded()
}

async function addTransaction(type: Transaction['type'], amount: number, category: string, note: string) {
  if (!selectedAccount.value) return
  const signedAmount = type === 'spend' ? -Math.abs(amount) : Math.abs(amount)
  const transaction: Transaction = {
    id: crypto.randomUUID(),
    accountId: selectedAccount.value.id,
    recordedAt: new Date().toISOString().slice(0, 10),
    amount: signedAmount,
    type,
    category,
    note,
  }
  const nextPyroxene = selectedAccount.value.pyroxene + signedAmount
  await createTransaction(transaction, nextPyroxene, mode.value)
  data.value.transactions.unshift(transaction)
  selectedAccount.value.pyroxene = nextPyroxene
  syncLocalIfNeeded()
}

async function addPlan(payload: Omit<Plan, 'id' | 'accountId' | 'createdAt'>) {
  if (!selectedAccount.value) return
  const plan: Plan = {
    id: crypto.randomUUID(),
    accountId: selectedAccount.value.id,
    createdAt: new Date().toISOString().slice(0, 10),
    ...payload,
  }
  const created = await createPlan(plan, mode.value)
  data.value.plans.unshift(created)
  syncLocalIfNeeded()
}

async function setPlanStatus(planId: string, status: PlanStatus) {
  const updated = await updatePlanStatus(planId, status, mode.value)
  const target = data.value.plans.find((entry) => entry.id === planId)
  if (target) target.status = updated.status
  syncLocalIfNeeded()
}

async function deletePlan(planId: string) {
  await removePlan(planId, mode.value)
  data.value.plans = data.value.plans.filter((entry) => entry.id !== planId)
  syncLocalIfNeeded()
}

export function usePyroDashboard() {
  return {
    mode,
    data,
    isLoading,
    selectedAccountId,
    selectedBannerId,
    selectedAccount,
    selectedBanner,
    projectionToggles,
    accountSnapshots,
    accountTransactions,
    accountPlans,
    scheduleInWindow,
    projectionSources,
    projectionSummary,
    chartSeries,
    latestDelta,
    totalBalanceAcrossAccounts,
    monthlyGain,
    spendingRate,
    targetProgress,
    allocationBreakdown,
    load,
    addAccount,
    addSnapshot,
    addTransaction,
    addPlan,
    setPlanStatus,
    deletePlan,
  }
}
