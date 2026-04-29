import { demoData } from '@/mock/demoData'
import type {
  Account,
  BackendMode,
  DashboardBootstrap,
  Plan,
  PlanStatus,
  Snapshot,
  Transaction,
} from '@/types/dashboard'

const STORAGE_KEY = 'pyro-dashboard-local'

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function loadLocalBootstrap(): DashboardBootstrap {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    const seeded = clone(demoData)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
    return seeded
  }

  try {
    return JSON.parse(raw) as DashboardBootstrap
  } catch {
    const seeded = clone(demoData)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
    return seeded
  }
}

function saveLocalBootstrap(data: DashboardBootstrap) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!response.ok) {
    throw new Error(`Request failed for ${path}`)
  }

  return (await response.json()) as T
}

export async function loadDashboardBootstrap(): Promise<{ data: DashboardBootstrap; mode: BackendMode }> {
  try {
    const data = await request<DashboardBootstrap>('/api/bootstrap')
    return { data, mode: 'connected' }
  } catch {
    return { data: loadLocalBootstrap(), mode: 'local-fallback' }
  }
}

export function persistLocalData(data: DashboardBootstrap) {
  saveLocalBootstrap(data)
}

export async function createAccount(account: Account, mode: BackendMode) {
  if (mode === 'connected') {
    return request<Account>('/api/accounts', {
      method: 'POST',
      body: JSON.stringify(account),
    })
  }

  const data = loadLocalBootstrap()
  data.accounts.unshift(account)
  saveLocalBootstrap(data)
  return account
}

export async function createSnapshot(snapshot: Snapshot, accountPyroxene: number, mode: BackendMode) {
  if (mode === 'connected') {
    return request<Snapshot>(`/api/accounts/${snapshot.accountId}/snapshots`, {
      method: 'POST',
      body: JSON.stringify({ snapshot, accountPyroxene }),
    })
  }

  const data = loadLocalBootstrap()
  data.snapshots.unshift(snapshot)
  const account = data.accounts.find((entry) => entry.id === snapshot.accountId)
  if (account) account.pyroxene = accountPyroxene
  saveLocalBootstrap(data)
  return snapshot
}

export async function createTransaction(transaction: Transaction, accountPyroxene: number, mode: BackendMode) {
  if (mode === 'connected') {
    return request<Transaction>(`/api/accounts/${transaction.accountId}/transactions`, {
      method: 'POST',
      body: JSON.stringify({ transaction, accountPyroxene }),
    })
  }

  const data = loadLocalBootstrap()
  data.transactions.unshift(transaction)
  const account = data.accounts.find((entry) => entry.id === transaction.accountId)
  if (account) account.pyroxene = accountPyroxene
  saveLocalBootstrap(data)
  return transaction
}

export async function createPlan(plan: Plan, mode: BackendMode) {
  if (mode === 'connected') {
    return request<Plan>(`/api/accounts/${plan.accountId}/plans`, {
      method: 'POST',
      body: JSON.stringify(plan),
    })
  }

  const data = loadLocalBootstrap()
  data.plans.unshift(plan)
  saveLocalBootstrap(data)
  return plan
}

export async function updatePlanStatus(planId: string, status: PlanStatus, mode: BackendMode) {
  if (mode === 'connected') {
    return request<Plan>(`/api/plans/${planId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
  }

  const data = loadLocalBootstrap()
  const plan = data.plans.find((entry) => entry.id === planId)
  if (!plan) {
    throw new Error('Plan not found')
  }
  plan.status = status
  saveLocalBootstrap(data)
  return plan
}

export async function removePlan(planId: string, mode: BackendMode) {
  if (mode === 'connected') {
    await request<void>(`/api/plans/${planId}`, { method: 'DELETE' })
    return
  }

  const data = loadLocalBootstrap()
  data.plans = data.plans.filter((entry) => entry.id !== planId)
  saveLocalBootstrap(data)
}
