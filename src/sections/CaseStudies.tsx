import { useState } from 'react'
import { useLang } from '../i18n/LangContext'
import { Section } from '../components/Section'
import { ConsolidationFigure } from './consolidation/ConsolidationFigure'

/**
 * Finance case studies: expandable cards. Texts live in translations.ts under `cases`.
 * Each card's title is a button (aria-expanded) that opens the full story.
 */
export function CaseStudies() {
  const { t } = useLang()
  const c = t.cases
  const [open, setOpen] = useState<string[]>([])

  const toggle = (id: string) => setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]))

  return (
    <Section id="cases" index="04" label={c.label} title={c.title} intro={c.intro}>
      <ConsolidationFigure />
      <ul className={`grid gap-5 lg:grid-cols-3 ${open.length ? 'lg:items-start' : ''}`}>
        {c.items.map((item, i) => {
          const isOpen = open.includes(item.id)
          const panelId = `case-${item.id}`
          return (
            <li
              key={item.id}
              className={`flex flex-col rounded-2xl border bg-surface transition-[border-color,box-shadow] duration-300 ${
                isOpen ? 'border-gold/60 shadow-[0_30px_80px_-50px_rgb(0_0_0/0.6)]' : 'border-line hover:border-line-strong'
              }`}
            >
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                  className="group block w-full rounded-2xl p-6 text-left focus-visible:outline-offset-[-2px] sm:p-7"
                >
                  <span className="flex items-center justify-between">
                    <span className="text-sm font-medium tabular-nums text-gold-ink">{String(i + 1).padStart(2, '0')}</span>
                    <span
                      aria-hidden="true"
                      className={`grid h-8 w-8 place-items-center rounded-full border border-line-strong text-lg leading-none text-muted transition-all duration-300 group-hover:border-gold group-hover:text-ink ${
                        isOpen ? 'rotate-45 border-gold text-ink' : ''
                      }`}
                    >
                      +
                    </span>
                  </span>
                  <span className="mt-6 block text-xl font-semibold leading-snug tracking-tight text-balance">{item.title}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted">{item.context}</span>
                  {!isOpen && (
                    <span className="mt-5 block border-l-2 border-gold pl-4 text-sm leading-relaxed">
                      <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted">{c.result}</span>
                      <span className="line-clamp-3">{item.result}</span>
                    </span>
                  )}
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-ink">
                    {isOpen ? c.less : c.more}
                  </span>
                </button>
              </h3>

              {/* Expanding panel: grid-rows trick animates height smoothly */}
              <div
                id={panelId}
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                inert={!isOpen}
              >
                <div className="overflow-hidden">
                  <dl className="space-y-5 px-6 pb-2 sm:px-7">
                    {[
                      { label: c.problem, text: item.problem },
                      { label: c.built, text: item.built },
                      { label: c.result, text: item.result },
                    ].map((block, bi) => (
                      <div key={block.label} className={bi === 2 ? 'border-l-2 border-gold pl-4' : ''}>
                        <dt className="text-[11px] font-medium uppercase tracking-wider text-muted">{block.label}</dt>
                        <dd className={`mt-1.5 text-sm leading-relaxed ${bi === 2 ? 'font-medium' : ''}`}>{block.text}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <ul className="mt-auto flex flex-wrap gap-2 px-6 pb-6 pt-4 sm:px-7 sm:pb-7">
                {item.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
