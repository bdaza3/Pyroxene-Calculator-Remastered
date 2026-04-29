import { createRouter, createWebHistory } from 'vue-router'
import AppShell from '@/layouts/AppShell.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import CalculatorPage from '@/pages/CalculatorPage.vue'
import HistoryPage from '@/pages/HistoryPage.vue'
import AnalyticsPage from '@/pages/AnalyticsPage.vue'
import DatabasePage from '@/pages/DatabasePage.vue'
import SettingsPage from '@/pages/SettingsPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppShell,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: DashboardPage,
          meta: {
            title: 'Dashboard',
            subtitle: 'Welcome back to Pyroxene Finance',
          },
        },
        {
          path: 'calculator',
          component: CalculatorPage,
          meta: {
            title: 'Calculator',
            subtitle: 'Model banner income, reserve plans, and spark readiness',
          },
        },
        {
          path: 'history',
          component: HistoryPage,
          meta: {
            title: 'History',
            subtitle: 'Track snapshots, transactions, and recent account movement',
          },
        },
        {
          path: 'analytics',
          component: AnalyticsPage,
          meta: {
            title: 'Analytics',
            subtitle: 'Compare growth, allocation, and schedule-derived trends',
          },
        },
        {
          path: 'database',
          component: DatabasePage,
          meta: {
            title: 'Database',
            subtitle: 'Manage accounts, banner records, and stored planning data',
          },
        },
        {
          path: 'settings',
          component: SettingsPage,
          meta: {
            title: 'Settings',
            subtitle: 'Workspace preferences, backend mode, and project health',
          },
        },
      ],
    },
  ],
})

export default router
