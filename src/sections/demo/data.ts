/** Made-up example data for the demo app. Texts (product and task names) live in translations.ts. */

/** Monthly sales: rows = products, columns = Jan, Feb, Mar. */
export const START_SALES: number[][] = [
  [4200, 4650, 5100],
  [2100, 1950, 2300],
  [1500, 1700, 1600],
  [900, 1200, 2400],
]

/** Q1 target per product (same order as the rows above). */
export const TARGETS = [13500, 7000, 4500, 4000]

/** Month-end close tasks: working day and which tasks (by index) must be done first. */
export const TASKS: { day: number; deps: number[] }[] = [
  { day: 1, deps: [] }, // Bank reconciliation
  { day: 1, deps: [] }, // Sales cut-off and invoicing
  { day: 1, deps: [] }, // Fixed assets and depreciation
  { day: 2, deps: [0, 1] }, // Accruals and prepayments
  { day: 2, deps: [0] }, // Intercompany matching
  { day: 3, deps: [2, 3, 4] }, // Trial balance review
  { day: 3, deps: [5] }, // Group consolidation
  { day: 4, deps: [6] }, // Management reporting pack
]

export type LogEntry = {
  id: number
  time: Date
  kind: 'done' | 'reopened' | 'cascade' | 'unlocked'
  task: number
  cause?: number
}

export type CloseState = { done: boolean[]; log: LogEntry[] }

export const START_CLOSE: CloseState = { done: TASKS.map(() => false), log: [] }

export const isUnlocked = (i: number, done: boolean[]) => TASKS[i].deps.every((d) => done[d])

/** All tasks that (directly or indirectly) depend on task i. */
function dependentsOf(i: number): number[] {
  const out: number[] = []
  const visit = (t: number) => {
    TASKS.forEach((task, j) => {
      if (task.deps.includes(t) && !out.includes(j)) {
        out.push(j)
        visit(j)
      }
    })
  }
  visit(i)
  return out.sort((a, b) => a - b)
}

let nextId = 1

/** Tick or untick a task, applying the dependency rules and writing to the log. */
export function toggleTask(state: CloseState, i: number): CloseState {
  const time = new Date()
  const done = [...state.done]
  const entries: LogEntry[] = []

  if (!done[i]) {
    if (!isUnlocked(i, done)) return state
    const before = TASKS.map((_, j) => isUnlocked(j, done))
    done[i] = true
    entries.push({ id: nextId++, time, kind: 'done', task: i })
    TASKS.forEach((_, j) => {
      if (!done[j] && !before[j] && isUnlocked(j, done)) entries.push({ id: nextId++, time, kind: 'unlocked', task: j })
    })
  } else {
    done[i] = false
    entries.push({ id: nextId++, time, kind: 'reopened', task: i })
    for (const j of dependentsOf(i)) {
      if (done[j]) {
        done[j] = false
        entries.push({ id: nextId++, time, kind: 'cascade', task: j, cause: i })
      }
    }
  }
  return { done, log: [...entries.reverse(), ...state.log].slice(0, 30) }
}
