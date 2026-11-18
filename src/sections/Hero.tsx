import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LangContext'
import { tools } from '../i18n/translations'
import { ArrowRight, CheckIcon } from '../components/Icons'

/** Decorative "live" mini app: close tasks tick off one by one, next to a small sales chart. */
function HeroVisual() {
  const { t, lang } = useLang()
  const d = t.demo
  const [step, setStep] = useState(2)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setStep((s) => (s >= 5 ? 0 : s + 1)), 1400)
    return () => window.clearInterval(id)
  }, [])

  const tasks = [d.tasks[0], d.tasks[3], d.tasks[5], d.tasks[6]]
  const done = Math.min(step, tasks.length)
  const bars = [62, 70, 80, 58, 74, 92]
  const money = new Intl.NumberFormat(lang === 'nl' ? 'nl-NL' : 'en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md select-none">
      {/* Main card: month-end close */}
      <div className="float rounded-3xl border border-line-strong bg-surface p-5 shadow-[0_40px_100px_-50px_rgb(0_0_0/0.55)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gold">
              <span className="h-2 w-2 rounded-full bg-on-gold" />
            </span>
            <span className="text-sm font-semibold tracking-tight">{d.tabClose}</span>
          </div>
          <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-medium tabular-nums text-gold-ink">
            {done}/{tasks.length}
          </span>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-gold transition-[width] duration-700 ease-out" style={{ width: `${(done / tasks.length) * 100}%` }} />
        </div>
        <ul className="mt-4 space-y-1">
          {tasks.map((task, i) => (
            <li key={task} className="flex items-center gap-3 rounded-xl px-2 py-2 text-sm">
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors duration-300 ${
                  i < done ? 'border-gold bg-gold text-on-gold' : 'border-line-strong'
                }`}
              >
                {i < done && <CheckIcon />}
              </span>
              <span className={`transition-colors duration-300 ${i < done ? 'text-muted line-through decoration-line-strong' : ''}`}>{task}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Floating card: sales */}
      <div className="float float-late absolute -bottom-32 -left-6 hidden w-56 sm:block rounded-2xl border border-line-strong bg-surface p-4 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.6)] sm:-left-12">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted">{d.kpiTotal}</p>
        <p className="mt-1 text-lg font-semibold tracking-tight tabular-nums">{money.format(29600)}</p>
        <div className="mt-3 flex h-12 items-end gap-1.5">
          {bars.map((h, i) => (
            <span key={i} className={`flex-1 rounded-sm ${i === bars.length - 1 ? 'bg-gold' : 'bg-bar'}`} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const { t } = useLang()
  const h = t.hero
  return (
    <>
      <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
        {/* Quiet spreadsheet-grid backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_75%_30%,black_10%,transparent_70%)]"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)',
            backgroundSize: '88px 40px',
          }}
        />
        {/* Soft gold glow */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-gold/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 pb-16 pt-32 sm:px-8 lg:min-h-[88svh] lg:grid-cols-[1.25fr_1fr] lg:pb-24 lg:pt-36">
          <div>
            <p className="rise rise-1 mb-7 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-3 py-1 text-xs font-medium tracking-wide backdrop-blur">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
              {h.eyebrow}
            </p>
            <h1 id="hero-title" className="rise rise-2 text-[3.4rem] font-semibold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[5.6rem]">
              {h.name}
              <span className="text-gold">.</span>
            </h1>
            <p className="rise rise-3 mt-8 max-w-xl text-lg leading-relaxed text-muted text-pretty sm:text-xl">{h.headline}</p>
            <div className="rise rise-4 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#work"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-on-gold shadow-[0_12px_30px_-12px_rgb(224_176_74/0.7)] transition-transform hover:-translate-y-0.5"
              >
                {h.ctaWork}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-line-strong bg-surface/40 px-7 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:border-gold"
              >
                {h.ctaContact}
              </a>
            </div>
          </div>

          <div className="rise rise-4 -mt-4 pb-2 sm:pb-32 lg:mt-0">
            <HeroVisual />
          </div>
        </div>

        {/* Results strip */}
        <div className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-8">
          <h2 className="sr-only">{h.statsLabel}</h2>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
            {h.stats.map((s) => (
              <div key={s.label} className="flex flex-col bg-bg/90 p-5 backdrop-blur sm:p-7">
                <dt className="order-2 mt-2 text-sm leading-snug text-muted">{s.label}</dt>
                <dd className="order-1 text-3xl font-semibold tracking-[-0.03em] tabular-nums sm:text-4xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Tools strip */}
      <div className="marquee-wrap overflow-hidden border-y border-line bg-tint py-5" aria-label={h.toolsLabel} role="region">
        <ul className="sr-only">
          {tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
        <div aria-hidden="true" className="marquee flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {[...tools, ...tools].map((tool, i) => (
                <span key={`${copy}-${i}`} className="flex items-center whitespace-nowrap px-7 text-lg font-medium tracking-tight text-muted sm:text-xl">
                  {tool}
                  <span className="ml-14 h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
