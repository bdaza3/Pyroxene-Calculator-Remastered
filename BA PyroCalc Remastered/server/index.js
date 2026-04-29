import express from 'express'
import cors from 'cors'
import { readDatabase, writeDatabase } from './storage.js'

const app = express()
const port = Number(process.env.PORT ?? 5000)

app.use(cors())
app.use(express.json())

app.get('/api/bootstrap', async (_request, response) => {
  const data = await readDatabase()
  response.json(data)
})

app.post('/api/accounts', async (request, response) => {
  const data = await readDatabase()
  data.accounts.unshift(request.body)
  await writeDatabase(data)
  response.status(201).json(request.body)
})

app.post('/api/accounts/:accountId/snapshots', async (request, response) => {
  const data = await readDatabase()
  const { snapshot, accountPyroxene } = request.body
  data.snapshots.unshift(snapshot)
  const account = data.accounts.find((entry) => entry.id === request.params.accountId)
  if (account) account.pyroxene = accountPyroxene
  await writeDatabase(data)
  response.status(201).json(snapshot)
})

app.post('/api/accounts/:accountId/transactions', async (request, response) => {
  const data = await readDatabase()
  const { transaction, accountPyroxene } = request.body
  data.transactions.unshift(transaction)
  const account = data.accounts.find((entry) => entry.id === request.params.accountId)
  if (account) account.pyroxene = accountPyroxene
  await writeDatabase(data)
  response.status(201).json(transaction)
})

app.post('/api/accounts/:accountId/plans', async (request, response) => {
  const data = await readDatabase()
  data.plans.unshift(request.body)
  await writeDatabase(data)
  response.status(201).json(request.body)
})

app.patch('/api/plans/:planId', async (request, response) => {
  const data = await readDatabase()
  const plan = data.plans.find((entry) => entry.id === request.params.planId)
  if (!plan) {
    response.status(404).json({ message: 'Plan not found' })
    return
  }
  Object.assign(plan, request.body)
  await writeDatabase(data)
  response.json(plan)
})

app.delete('/api/plans/:planId', async (request, response) => {
  const data = await readDatabase()
  data.plans = data.plans.filter((entry) => entry.id !== request.params.planId)
  await writeDatabase(data)
  response.status(204).send()
})

app.listen(port, () => {
  console.log(`Pyro dashboard API listening on ${port}`)
})
