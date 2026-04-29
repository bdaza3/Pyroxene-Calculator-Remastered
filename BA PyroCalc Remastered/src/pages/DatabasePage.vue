<script setup lang="ts">
import { reactive } from 'vue'
import { usePyroDashboard } from '@/composables/usePyroDashboard'

const dashboard = usePyroDashboard()

const accountForm = reactive({
  name: '',
  region: 'Global' as const,
  level: 85,
  joinedAt: new Date().toISOString().slice(0, 10),
  pyroxene: 12000,
  monthlyBudget: 0,
  goalLabel: '',
  tacticalRank: 'rank1000' as const,
  totalAssaultTier: 'silver' as const,
  includeGrandTickets: false,
})

async function submitAccount() {
  await dashboard.addAccount({ ...accountForm })
  accountForm.name = ''
  accountForm.goalLabel = ''
}
</script>

<template>
  <section class="page-grid">
    <article class="content-panel">
      <div class="panel-title-row">
        <div>
          <h3>Account Records</h3>
          <p>Create and manage tracked Blue Archive accounts</p>
        </div>
      </div>
      <form class="form-grid" @submit.prevent="submitAccount">
        <div class="form-grid two-columns">
          <label>
            Name
            <input v-model="accountForm.name" required placeholder="Sensei Main" />
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
        <div class="form-grid three-columns">
          <label>
            Level
            <input v-model.number="accountForm.level" type="number" min="1" max="100" />
          </label>
          <label>
            Pyroxene
            <input v-model.number="accountForm.pyroxene" type="number" min="0" />
          </label>
          <label>
            Monthly budget
            <input v-model.number="accountForm.monthlyBudget" type="number" min="0" />
          </label>
        </div>
        <label>
          Goal label
          <input v-model="accountForm.goalLabel" placeholder="Summer Fes reserve" />
        </label>
        <button class="primary-button" type="submit">Create Account</button>
      </form>
    </article>

    <article class="content-panel span-two">
      <div class="panel-title-row">
        <div>
          <h3>Stored Accounts</h3>
          <p>Current persistent records from the active storage mode</p>
        </div>
      </div>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Region</th>
              <th>Level</th>
              <th>Pyroxene</th>
              <th>Budget</th>
              <th>Goal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in dashboard.data.value.accounts" :key="account.id">
              <td>{{ account.name }}</td>
              <td>{{ account.region }}</td>
              <td>{{ account.level }}</td>
              <td>{{ account.pyroxene.toLocaleString() }}</td>
              <td>${{ account.monthlyBudget }}</td>
              <td>{{ account.goalLabel }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <article class="content-panel">
      <div class="panel-title-row">
        <div>
          <h3>Banner Records</h3>
          <p>Seeded banner metadata available for planning</p>
        </div>
      </div>
      <div class="data-list compact">
        <div v-for="banner in dashboard.data.value.banners" :key="banner.id" class="data-list-item">
          <div>
            <strong>{{ banner.student }}</strong>
            <span>{{ banner.featuredType }} - {{ banner.forecastConfidence }} confidence</span>
          </div>
          <strong>{{ new Date(banner.startDate).toLocaleDateString() }}</strong>
        </div>
      </div>
    </article>
  </section>
</template>
