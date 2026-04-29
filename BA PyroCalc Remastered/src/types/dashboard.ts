export type TacticalRank =
  | 'rank15000'
  | 'rank8000'
  | 'rank4000'
  | 'rank2000'
  | 'rank1000'
  | 'rank500'
  | 'rank200'
  | 'rank100'
  | 'rank10'
  | 'rank2'
  | 'rank1'

export type RaidTier = 'bronze' | 'silver' | 'gold' | 'platinum'
export type ScheduleKind = 'event' | 'totalAssault' | 'grandAssault' | 'maintenance'
export type PlanStatus = 'draft' | 'watching' | 'ready'
export type TransactionType = 'income' | 'spend'
export type BackendMode = 'loading' | 'connected' | 'local-fallback'
export type ProjectionKey =
  | 'dailyLogin'
  | 'dailyTasks'
  | 'weeklyTasks'
  | 'eventRewards'
  | 'maintenance'
  | 'tacticalChallenge'
  | 'totalAssault'
  | 'grandAssault'
  | 'bimonthlyPack'
  | 'monthlyPack'

export interface Account {
  id: string
  name: string
  region: 'Global' | 'NA' | 'EU' | 'APAC'
  level: number
  joinedAt: string
  pyroxene: number
  monthlyBudget: number
  goalLabel: string
  tacticalRank: TacticalRank
  totalAssaultTier: RaidTier
  includeGrandTickets: boolean
}

export interface Banner {
  id: string
  name: string
  student: string
  startDate: string
  endDate: string
  limited: boolean
  featuredType: 'Fes' | 'Limited' | 'Standard'
  forecastConfidence: 'High' | 'Medium'
}

export interface Snapshot {
  id: string
  accountId: string
  recordedAt: string
  pyroxene: number
  note: string
}

export interface Plan {
  id: string
  accountId: string
  bannerId: string
  title: string
  targetPyroxene: number
  reservedPyroxene: number
  status: PlanStatus
  notes: string
  createdAt: string
}

export interface Transaction {
  id: string
  accountId: string
  recordedAt: string
  amount: number
  type: TransactionType
  category: string
  note: string
}

export interface ScheduleEntry {
  id: string
  kind: ScheduleKind
  name: string
  startDate: string
  endDate: string
  pyroxeneReward: number
  note: string
}

export interface DashboardBootstrap {
  accounts: Account[]
  banners: Banner[]
  snapshots: Snapshot[]
  plans: Plan[]
  transactions: Transaction[]
  schedule: ScheduleEntry[]
}

export interface ProjectionSource {
  key: ProjectionKey
  label: string
  amount: number
  cadence: string
  enabled: boolean
}

export interface ProjectionSummary {
  daysUntilBanner: number
  projectedTotal: number
  projectedGain: number
  totalScheduledIncome: number
  goalGap: number
  readyByBanner: boolean
}
