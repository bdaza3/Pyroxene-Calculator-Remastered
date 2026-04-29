import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defaultData } from './defaultData.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const databasePath = resolve(__dirname, './data/pyrocalc-db.json')

async function ensureDatabase() {
  await mkdir(dirname(databasePath), { recursive: true })
  try {
    await readFile(databasePath, 'utf8')
  } catch {
    await writeFile(databasePath, JSON.stringify(defaultData, null, 2), 'utf8')
  }
}

export async function readDatabase() {
  await ensureDatabase()
  const raw = await readFile(databasePath, 'utf8')
  return JSON.parse(raw)
}

export async function writeDatabase(nextData) {
  await ensureDatabase()
  await writeFile(databasePath, JSON.stringify(nextData, null, 2), 'utf8')
}
