import type { ReactNode } from 'react'
import { useReveal } from './useReveal'

/**
 * plain   – page background
 * tint    – soft warm band
 * inverse – full navy band (always dark, also in light mode)
 */
export type Tone = 'plain' | 'tint' | 'inverse'

type Props = {
  id: string
  index: string
  label: string
  title: string
  intro?: string
  tone?: Tone
  children: ReactNode
}

/** Shared section layout: pill label, large display heading, intro beside it on desktop, then content. */
export function Section({ id, index, label, title, intro, tone = 'plain', children }: Props) {
  const ref = useReveal<HTMLDivElement>()
  const toneProps =
    tone === 'inverse'
      ? { 'data-theme': 'dark', 'data-band': 'inverse', className: 'bg-bg text-ink' }
      : tone === 'tint'
        ? { className: 'bg-tint text-ink' }
        : { className: 'bg-bg text-ink' }

  return (
    <section id={id} aria-labelledby={`${id}-title`} {...toneProps}>
      <div ref={ref} className="reveal relative mx-auto max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
        {/* Large faint section number */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-10 select-none text-[7rem] font-semibold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_var(--line-strong)] sm:right-8 sm:top-14 sm:text-[11rem]"
        >
          {index}
        </span>

        <div className="relative grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-3 py-1 text-xs font-medium tracking-wide backdrop-blur">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
              {label}
            </p>
            <h2
              id={`${id}-title`}
              className="text-[2.15rem] font-semibold leading-[1.08] tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.4rem]"
            >
              {title}
            </h2>
          </div>
          {intro && (
            <p className="text-base leading-relaxed text-muted sm:text-lg lg:col-span-5 lg:pb-1.5">{intro}</p>
          )}
        </div>

        <div className="relative mt-14 sm:mt-20">{children}</div>
      </div>
    </section>
  )
}
