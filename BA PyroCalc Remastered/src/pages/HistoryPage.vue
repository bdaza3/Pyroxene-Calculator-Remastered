<script setup lang="ts">
import { reactive, watch } from 'vue'
import { usePyroDashboard } from '@/composables/usePyroDashboard'

const dashboard = usePyroDashboard()

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

async function submitSnapshot() {
  await dashboard.addSnapshot(snapshotForm.pyroxene, snapshotForm.note)
  snapshotForm.note = ''
}

async function submitTransaction() {
  await dashboard.addTransaction(
    transactionForm.type,
    transactionForm.amount,
    transactionForm.category,
    transactionForm.note,
  )
  transactionForm.note = ''
}

watch(
  () => dashboard.selectedAccount.value?.id,
  () => {
    snapshotForm.pyroxene = dashboard.selectedAccount.value?.pyroxene ?? 0
  },
  { immediate: true },
)
</script>

<template>
  <section class="page-grid">
    <article class="content-panel">
      <div class="panel-title-row">
        <div>
          <h3>Log Snapshot</h3>
          <p>Capture the current balance for historical tracking</p>
        </div>
      </div>
      <form class="form-grid" @submit.prevent="submitSnapshot">
        <label>
          Current pyroxene
          <input v-model.number="snapshotForm.pyroxene" type="number" min="0" />
        </label>
        <label>
          Note
          <input v-model="snapshotForm.note" placeholder="Raid season reset, event clear, pack renewal..." />
        </label>
        <button class="primary-button" type="submit">Save Snapshot</button>
      </form>
    </article>

    <article class="content-panel">
      <div class="panel-title-row">
        <div>
          <h3>Log Transaction</h3>
          <p>Record spending or income against the active account</p>
        </div>
      </div>
      <form class="form-grid" @submit.prevent="submitTransaction">
        <div class="form-grid three-columns">
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
            <input v-model="transactionForm.category" placeholder="Event, banner, shop..." />
          </label>
        </div>
        <label>
          Note
          <input v-model="transactionForm.note" placeholder="Optional context" />
        </label>
        <button class="primary-button" type="submit">Save Transaction</button>
      </form>
    </article>

    <article class="content-panel span-two">
      <div class="panel-title-row">
        <div>
          <h3>Snapshot History</h3>
          <p>Most recent entries for the active account</p>
        </div>
      </div>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Balance</th>
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

    <article class="content-panel span-two">
      <div class="panel-title-row">
        <div>
          <h3>Transaction Ledger</h3>
          <p>Income and spending records tied to the active account</p>
        </div>
      </div>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in dashboard.accountTransactions.value" :key="entry.id">
              <td>{{ new Date(entry.recordedAt).toLocaleDateString() }}</td>
              <td>{{ entry.category }}</td>
              <td :class="entry.amount >= 0 ? 'positive-text' : 'negative-text'">
                {{ entry.amount >= 0 ? '+' : '' }}{{ entry.amount.toLocaleString() }}
              </td>
              <td>{{ entry.note }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </section>
</template>
