import { useLang } from '../i18n/LangContext'
import { Section } from '../components/Section'

/** Experience as a vertical timeline with dots. */
export function Background() {
  const { t } = useLang()
  const b = t.background
  return (
    <Section id="background" index="06" label={b.label} title={b.title}>
      <ol className="relative ml-1.5 border-l border-line-strong">
        {b.items.map((it, i) => (
          <li key={it.role + it.org} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
            <span
              aria-hidden="true"
              className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-bg ${i === 0 ? 'bg-gold' : 'bg-line-strong'}`}
            />
            <div className="grid gap-2 md:grid-cols-[12rem_1fr] md:gap-10">
              <p className="text-sm font-medium tabular-nums text-gold-ink md:pt-0.5">{it.period}</p>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{it.role}</h3>
                <p className="mt-0.5 text-muted">{it.org}</p>
                <ul className="mt-4 space-y-2.5 leading-relaxed">
                  {it.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-gold" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-16 rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{b.educationTitle}</h3>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {b.education.map((e) => (
            <li key={e.name}>
              <p className="text-lg font-semibold tracking-tight">{e.name}</p>
              <p className="text-muted">
                {e.org}
                {e.period && ` · ${e.period}`}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
