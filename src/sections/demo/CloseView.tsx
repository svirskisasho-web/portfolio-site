import type { Dispatch, SetStateAction } from 'react'
import { useLang } from '../../i18n/LangContext'
import { CheckIcon, LockIcon } from '../../components/Icons'
import { TASKS, isUnlocked, toggleTask, type CloseState, type LogEntry } from './data'

type Props = { state: CloseState; setState: Dispatch<SetStateAction<CloseState>> }

export function CloseView({ state, setState }: Props) {
  const { t, lang } = useLang()
  const d = t.demo
  const locale = lang === 'nl' ? 'nl-NL' : 'en-GB'
  const { done, log } = state

  const doneCount = done.filter(Boolean).length
  const ready = TASKS.map((_, i) => i).filter((i) => !done[i] && isUnlocked(i, done))
  const days = [...new Set(TASKS.map((x) => x.day))]
  const allDone = doneCount === TASKS.length

  const logText = (e: LogEntry) => {
    const name = d.tasks[e.task]
    if (e.kind === 'done') return d.logDone(name)
    if (e.kind === 'reopened') return d.logReopened(name)
    if (e.kind === 'unlocked') return d.logUnlocked(name)
    return d.logCascade(name, d.tasks[e.cause ?? 0])
  }
  const time = (date: Date) => date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  return (
    <div className="grid lg:grid-cols-[1.25fr_1fr]">
      {/* ---------- Task list ---------- */}
      <div className="border-b border-line p-4 sm:p-6 lg:border-b-0 lg:border-r">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted">{d.closeIntro}</h3>
        <div className="mt-4 space-y-6">
          {days.map((day) => (
            <fieldset key={day}>
              <legend className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-ink">{d.day(day)}</legend>
              <ul className="divide-y divide-line rounded-xl border border-line">
                {TASKS.map((task, i) => {
                  if (task.day !== day) return null
                  const locked = !done[i] && !isUnlocked(i, done)
                  const waiting = task.deps.filter((dep) => !done[dep]).map((dep) => d.tasks[dep])
                  return (
                    <li key={i}>
                      <label
                        className={`flex items-start gap-3 px-3 py-3 transition-colors sm:px-4 ${
                          locked ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-bg/60'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={done[i]}
                          disabled={locked}
                          onChange={() => setState((s) => toggleTask(s, i))}
                          aria-describedby={locked ? `wait-${i}` : undefined}
                        />
                        <span
                          aria-hidden="true"
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold ${
                            done[i]
                              ? 'border-gold bg-gold text-on-gold'
                              : locked
                                ? 'border-line text-muted'
                                : 'border-line-strong'
                          }`}
                        >
                          {done[i] ? <CheckIcon /> : locked ? <LockIcon className="h-3 w-3" /> : null}
                        </span>
                        <span className="min-w-0">
                          <span
                            className={`block text-sm font-medium transition-colors ${
                              done[i] ? 'text-muted line-through decoration-line-strong' : locked ? 'text-muted' : ''
                            }`}
                          >
                            {d.tasks[i]}
                          </span>
                          {locked && (
                            <span id={`wait-${i}`} className="mt-0.5 block text-xs text-muted">
                              {d.waitingFor(waiting.join(', '))}
                            </span>
                          )}
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </fieldset>
          ))}
        </div>
      </div>

      {/* ---------- Status + log ---------- */}
      <div className="p-4 sm:p-6">
        <div aria-live="polite">
          <p className="flex items-baseline justify-between text-sm">
            <span className="font-semibold">{d.progress(doneCount, TASKS.length)}</span>
            <span className="tabular-nums text-muted">{Math.round((doneCount / TASKS.length) * 100)}%</span>
          </p>
          <div className="mt-2 flex gap-1" aria-hidden="true">
            {TASKS.map((_, i) => (
              <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${done[i] ? 'bg-gold' : 'bg-line'}`} />
            ))}
          </div>
          {allDone && <p className="mt-3 rounded-lg bg-positive/12 px-3 py-2 text-sm font-medium text-positive">{d.closeDone}</p>}
        </div>

        {!allDone && (
          <>
            <h4 className="mt-7 text-xs font-medium uppercase tracking-wider text-muted">{d.readyTitle}</h4>
            {ready.length ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {ready.map((i) => (
                  <li key={i} className="rounded-full border border-gold/50 px-3 py-1 text-xs font-medium">
                    {d.tasks[i]}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted">{d.readyNone}</p>
            )}
          </>
        )}

        <h4 className="mt-7 text-xs font-medium uppercase tracking-wider text-muted">{d.logTitle}</h4>
        {log.length === 0 ? (
          <p className="mt-3 text-sm text-muted">{d.logEmpty}</p>
        ) : (
          <ol className="mt-3 max-h-64 space-y-2.5 overflow-y-auto pr-1">
            {log.map((e) => (
              <li key={e.id} className="flex gap-3 text-sm leading-snug">
                <span className="shrink-0 pt-px font-mono text-[11px] tabular-nums text-muted">{time(e.time)}</span>
                <span
                  className={
                    e.kind === 'done'
                      ? ''
                      : e.kind === 'unlocked'
                        ? 'text-gold-ink'
                        : 'text-negative'
                  }
                >
                  {logText(e)}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
