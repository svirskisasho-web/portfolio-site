import { useMemo, type Dispatch, type SetStateAction } from 'react'
import { useLang } from '../../i18n/LangContext'
import { SparkIcon } from '../../components/Icons'
import { TARGETS } from './data'

type Props = { data: number[][]; setData: Dispatch<SetStateAction<number[][]>> }

const MAX = 99999

export function SalesView({ data, setData }: Props) {
  const { t, lang } = useLang()
  const d = t.demo
  const locale = lang === 'nl' ? 'nl-NL' : 'en-GB'

  const fmt = useMemo(
    () => ({
      money: new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
      num: new Intl.NumberFormat(locale),
      pct: new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0 }),
      signed: new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 0, signDisplay: 'exceptZero' }),
    }),
    [locale],
  )

  // ---- The "rules" of the app ----
  const rowTotals = data.map((r) => r.reduce((a, b) => a + b, 0))
  const colTotals = d.months.map((_, c) => data.reduce((a, r) => a + r[c], 0))
  const total = rowTotals.reduce((a, b) => a + b, 0)
  const targetTotal = TARGETS.reduce((a, b) => a + b, 0)
  const ratios = rowTotals.map((v, i) => v / TARGETS[i])
  const status = ratios.map((r) => (r >= 1 ? 'on' : r >= 0.9 ? 'close' : 'below'))
  const alerts = status.filter((s) => s === 'below').length
  const change = colTotals[1] > 0 ? (colTotals[2] - colTotals[1]) / colTotals[1] : null

  // Notes the app writes itself
  const notes: string[] = []
  const diff = total / targetTotal - 1
  notes.push(Math.abs(diff) < 0.005 ? d.noteTotalExact : d.noteTotal(fmt.pct.format(Math.abs(diff)), diff > 0))
  let mover = -1
  let moverChange = 0
  data.forEach((row, i) => {
    if (row[1] <= 0) return
    const c = (row[2] - row[1]) / row[1]
    if (Math.abs(c) > Math.abs(moverChange)) {
      mover = i
      moverChange = c
    }
  })
  if (mover >= 0 && Math.abs(moverChange) >= 0.01) {
    notes.push(d.noteMover(d.products[mover], fmt.pct.format(Math.abs(moverChange)), moverChange > 0, d.monthLong[2]))
  }
  const weakest = ratios.indexOf(Math.min(...ratios))
  notes.push(ratios[weakest] < 1 ? d.noteWeakest(d.products[weakest], fmt.pct.format(1 - ratios[weakest])) : d.noteAllOn)

  const setCell = (r: number, c: number, raw: string) => {
    const digits = raw.replace(/[^\d]/g, '').slice(0, 5)
    const value = Math.min(MAX, digits === '' ? 0 : parseInt(digits, 10))
    setData((prev) => prev.map((row, ri) => (ri === r ? row.map((v, ci) => (ci === c ? value : v)) : row)))
  }

  const pill = {
    on: { label: d.statusOn, cls: 'bg-positive/12 text-positive' },
    close: { label: d.statusClose, cls: 'bg-gold/18 text-gold-ink' },
    below: { label: d.statusBelow, cls: 'bg-negative/12 text-negative' },
  } as const
  const barColor = { on: 'bg-positive', close: 'bg-gold', below: 'bg-negative' } as const

  return (
    <div className="grid lg:grid-cols-[1fr_1.15fr]">
      {/* ---------- Input: the spreadsheet ---------- */}
      <div className="border-b border-line p-4 sm:p-6 lg:border-b-0 lg:border-r">
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted">{d.inputTitle}</h3>
          <span className="hidden text-xs text-muted sm:inline">{d.inputHint}</span>
        </div>
        <table className="w-full table-fixed border-collapse text-sm tabular-nums">
          <caption className="sr-only">{d.inputTitle}</caption>
          <colgroup>
            <col className="w-[37%]" />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr className="text-left text-xs font-medium uppercase tracking-wider text-muted">
              <th scope="col" className="pb-2 pr-2 font-medium">{d.product}</th>
              {d.months.map((m) => (
                <th key={m} scope="col" className="pb-2 pr-1.5 text-right font-medium">{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, r) => (
              <tr key={r} className="border-t border-line">
                <th scope="row" className="py-1 pr-1 text-left text-[13px] font-medium sm:text-sm">{d.products[r]}</th>
                {row.map((v, c) => (
                  <td key={c} className="py-1 pl-1">
                    <input
                      className="w-full rounded-md border border-line bg-bg/60 px-1.5 py-1.5 text-right outline-none transition-colors hover:border-line-strong focus:border-gold focus:bg-bg focus-visible:outline-none"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      aria-label={d.cellLabel(d.products[r], d.months[c])}
                      value={String(v)}
                      onChange={(e) => setCell(r, c, e.target.value)}
                      onFocus={(e) => e.target.select()}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-line-strong text-muted">
              <th scope="row" className="pt-3 pr-2 text-left text-xs font-medium uppercase tracking-wider">{d.total}</th>
              {colTotals.map((v, i) => (
                <td key={i} className="pt-3 pr-2 text-right text-xs sm:text-sm">{fmt.num.format(v)}</td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      {/* ---------- Output: the app ---------- */}
      <div className="p-4 sm:p-6" aria-live="polite">
        <h3 className="sr-only">{d.outputTitle}</h3>
        <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
          <div className="bg-surface p-3 sm:p-4">
            <dt className="text-[11px] font-medium uppercase leading-tight tracking-wider text-muted">{d.kpiTotal}</dt>
            <dd className="mt-2 text-base font-semibold tracking-tight tabular-nums sm:text-xl">{fmt.money.format(total)}</dd>
            <dd className="text-xs tabular-nums text-muted">{d.kpiVsTarget(fmt.pct.format(total / targetTotal))}</dd>
          </div>
          <div className="bg-surface p-3 sm:p-4">
            <dt className="text-[11px] font-medium uppercase leading-tight tracking-wider text-muted">{d.kpiChange}</dt>
            <dd
              className={`mt-2 text-base font-semibold tracking-tight tabular-nums sm:text-xl ${
                change === null ? '' : change > 0 ? 'text-positive' : change < 0 ? 'text-negative' : ''
              }`}
            >
              {change === null ? '–' : `${change > 0 ? '↑ ' : change < 0 ? '↓ ' : ''}${fmt.signed.format(change)}`}
            </dd>
          </div>
          <div className="bg-surface p-3 sm:p-4">
            <dt className="text-[11px] font-medium uppercase leading-tight tracking-wider text-muted">{d.kpiAlerts}</dt>
            <dd className={`mt-2 text-base font-semibold tracking-tight tabular-nums sm:text-xl ${alerts ? 'text-negative' : ''}`}>
              {alerts ? alerts : d.kpiAlertsNone}
            </dd>
          </div>
        </dl>

        <h4 className="mt-7 text-xs font-medium uppercase tracking-wider text-muted">{d.targetsTitle}</h4>
        <ul className="mt-4 space-y-4">
          {rowTotals.map((v, i) => {
            const s = status[i]
            // Bar scale: the target sits at 80% of the width, so over-performance stays visible.
            const width = Math.min(ratios[i] / 1.25, 1) * 100
            return (
              <li key={i}>
                <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
                  <span className="truncate font-medium">{d.products[i]}</span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${pill[s].cls}`}>{pill[s].label}</span>
                </div>
                <div className="relative h-1.5 rounded-full bg-line">
                  <div
                    className={`h-full rounded-full transition-[width,background-color] duration-500 ease-out ${barColor[s]}`}
                    style={{ width: `${width}%` }}
                  />
                  <span aria-hidden="true" className="absolute -top-1 bottom-[-4px] left-[80%] w-px bg-ink/50" />
                </div>
                <p className="mt-1 text-xs tabular-nums text-muted">
                  {fmt.money.format(v)} · {d.targetOf(fmt.money.format(TARGETS[i]))}
                </p>
              </li>
            )
          })}
        </ul>

        <div className="mt-7 rounded-xl border border-line bg-bg/50 p-4">
          <h4 className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
            <SparkIcon className="h-3.5 w-3.5 text-gold-ink" />
            {d.notesTitle}
          </h4>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            {notes.map((n) => (
              <li key={n} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-gold" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
