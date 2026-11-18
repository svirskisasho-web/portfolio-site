import { useLang } from '../i18n/LangContext'
import { Section } from '../components/Section'
import { ArrowRight } from '../components/Icons'

const icons = [
  // Finance systems: chart with rising bars
  <svg key="fin" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
    <path d="M4 20h16" />
    <path d="M7 16v-4M12 16V8M17 16V5" />
  </svg>,
  // Websites: browser window
  <svg key="web" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
  </svg>,
]

export function Services() {
  const { t } = useLang()
  return (
    <Section id="services" index="01" label={t.services.label} title={t.services.title}>
      <div className="grid gap-5 md:grid-cols-2">
        {t.services.items.map((s, i) => (
          <article
            key={s.title}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_30px_80px_-50px_rgb(0_0_0/0.5)] sm:p-10"
          >
            {/* Gold line that grows on hover */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line-strong text-gold-ink">{icons[i]}</span>
            <h3 className="mt-8 text-2xl font-semibold tracking-tight sm:text-[1.7rem]">{s.title}</h3>
            <p className="mt-3 text-muted">{s.intro}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {s.points.map((p) => (
                <li key={p} className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm">
                  {p}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-10 inline-flex items-center gap-2 self-start pt-2 text-sm font-semibold text-gold-ink"
            >
              {s.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </article>
        ))}
      </div>
    </Section>
  )
}
