<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { usePyroDashboard } from '@/composables/usePyroDashboard'
import { HomeIcon, CalculatorIcon, Calendar, ChartColumn , Database, LogOut } from "lucide-react";

const route = useRoute()
const dashboard = usePyroDashboard()
const isLightMode = ref(false)

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: HomeIcon },
  { to: '/calculator', label: 'Calculator', icon: CalculatorIcon },
  { to: '/history', label: 'History', icon: Calendar },
  { to: '/analytics', label: 'Analytics', icon: ChartColumn },
  { to: '/database', label: 'Database', icon: Database },
  { to: '/settings', label: 'Settings', icon: LogOut },
]

const pageTitle = computed(() => String(route.meta.title ?? 'Dashboard'))
const pageSubtitle = computed(() => String(route.meta.subtitle ?? 'Pyroxene planning workspace'))
const canExport = computed(() => route.path === '/dashboard' || route.path === '/analytics')

function applyTheme(light: boolean) {
  document.documentElement.dataset.theme = light ? 'light' : 'dark'
}

function exportReport() {
  window.print()
}

onMounted(async () => {
  await dashboard.load()
  applyTheme(isLightMode.value)
})

watch(isLightMode, (value) => {
  applyTheme(value)
})
</script>

<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand-block">
        <h1><span>Pyroxene</span> Finance</h1>
      </div>

      <nav class="sidebar-nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="sidebar-link"
          active-class="is-active"
        >
          <span class="sidebar-icon">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <button class="sidebar-utility" type="button" @click="isLightMode = !isLightMode">
          <span class="sidebar-icon">{{ isLightMode ? 'D' : 'L' }}</span>
          <span>{{ isLightMode ? 'Dark Mode' : 'Light Mode' }}</span>
        </button>
        <button class="sidebar-utility signout" type="button">
          <span class="sidebar-icon">{{ LogOut }}</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>

    <div class="shell-main">
      <header class="topbar">
        <div>
          <h2>{{ pageTitle }}</h2>
          <p>{{ pageSubtitle }}</p>
        </div>
        <button v-if="canExport" class="export-button" type="button" @click="exportReport">
          Export Report
        </button>
      </header>

      <section v-if="dashboard.isLoading.value" class="page-loading">
        <p>Loading workspace data...</p>
      </section>

      <main v-else class="page-content">
        <RouterView />
      </main>
    </div>
  </div>
</template>
