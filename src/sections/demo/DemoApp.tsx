import { useRef, useState, type KeyboardEvent } from 'react'
import { useLang } from '../../i18n/LangContext'
import { Section } from '../../components/Section'
import { ResetIcon } from '../../components/Icons'
import { SalesView } from './SalesView'
import { CloseView } from './CloseView'
import { START_CLOSE, START_SALES, type CloseState } from './data'

type Tab = 'sales' | 'close'

/**
 * "From Excel to app" demo: a tiny finance app with two views.
 * State lives here, so switching tabs keeps your changes. Nothing is stored.
 */
export function DemoApp() {
  const { t } = useLang()
  const d = t.demo
  const [tab, setTab] = useState<Tab>('sales')
  const [sales, setSales] = useState<number[][]>(START_SALES)
  const [close, setClose] = useState<CloseState>(START_CLOSE)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const tabs: { id: Tab; label: string }[] = [
    { id: 'sales', label: d.tabSales },
    { id: 'close', label: d.tabClose },
  ]

  const dirty =
    tab === 'sales'
      ? sales.some((row, r) => row.some((v, c) => v !== START_SALES[r][c]))
      : close.log.length > 0 || close.done.some(Boolean)

  const reset = () => (tab === 'sales' ? setSales(START_SALES) : setClose(START_CLOSE))

  // Arrow keys move between tabs (standard tab pattern)
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length
    setTab(tabs[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <Section id="demo" index="02" tone="inverse" label={d.label} title={d.title} intro={d.intro}>
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_40px_100px_-60px_rgb(0_0_0/0.6)]">
        {/* App bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-lg bg-gold">
              <span className="h-2 w-2 rounded-full bg-on-gold" />
            </span>
            <span className="text-sm font-semibold tracking-tight">{d.appName}</span>
          </div>

          <div role="tablist" aria-label={d.appName} className="order-3 flex w-full rounded-full border border-line p-1 sm:order-none sm:w-auto">
            {tabs.map((tb, i) => (
              <button
                key={tb.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                role="tab"
                id={`demo-tab-${tb.id}`}
                aria-selected={tab === tb.id}
                aria-controls={`demo-panel-${tb.id}`}
                tabIndex={tab === tb.id ? 0 : -1}
                onClick={() => setTab(tb.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`flex-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors sm:flex-none ${
                  tab === tb.id ? 'bg-ink text-bg' : 'text-muted hover:text-ink'
                }`}
              >
                {tb.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={reset}
            disabled={!dirty}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted transition-colors enabled:hover:text-ink disabled:opacity-40"
          >
            <ResetIcon className="h-3.5 w-3.5" />
            {d.reset}
          </button>
        </div>

        <div role="tabpanel" id={`demo-panel-${tab}`} aria-labelledby={`demo-tab-${tab}`}>
          {tab === 'sales' ? <SalesView data={sales} setData={setSales} /> : <CloseView state={close} setState={setClose} />}
        </div>
      </div>
    </Section>
  )
}
