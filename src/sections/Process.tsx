import { useLang } from '../i18n/LangContext'
import { Section } from '../components/Section'

/** Four steps on a connected timeline: horizontal on desktop, vertical on phones. */
export function Process() {
  const { t } = useLang()
  return (
    <Section id="process" index="05" label={t.process.label} title={t.process.title} tone="tint">
      <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
        {/* Connecting line */}
        <span aria-hidden="true" className="absolute left-5 top-5 bottom-5 w-px bg-line-strong lg:left-5 lg:right-5 lg:top-5 lg:bottom-auto lg:h-px lg:w-auto" />
        {t.process.steps.map((s, i) => (
          <li key={s.title} className="relative grid grid-cols-[2.5rem_1fr] gap-5 lg:block">
            <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-gold bg-tint text-sm font-semibold tabular-nums text-gold-ink">
              {i + 1}
            </span>
            <div className="lg:mt-8">
              <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-16 max-w-2xl rounded-2xl border border-line bg-surface p-6 leading-relaxed text-muted">
        <span aria-hidden="true" className="mr-2 inline-block h-2 w-2 rounded-full bg-gold align-middle" />
        {t.process.note}
      </p>
    </Section>
  )
}
