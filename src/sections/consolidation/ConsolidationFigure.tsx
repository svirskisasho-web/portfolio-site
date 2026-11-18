import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import { PauseIcon, PlayIcon } from '../../components/Icons'

// Remotion lives in its own chunk, fetched only when the figure comes near the screen.
const ConsolidationPlayer = lazy(() => import('./ConsolidationPlayer'))

const reducedQuery = '(prefers-reduced-motion: reduce)'

/** Looping "what a consolidation does" animation with caption, at the top of the case studies. */
export function ConsolidationFigure() {
  const { t, lang } = useLang()
  const a = t.cases.anim
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(() => window.matchMedia(reducedQuery).matches)

  useEffect(() => {
    const mq = window.matchMedia(reducedQuery)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <figure className="mb-14 sm:mb-16">
      <div
        ref={ref}
        role="img"
        aria-label={a.description}
        className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-line bg-tint sm:aspect-[2/1]"
      >
        {/* Faint grid, like the hero */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_50%_40%,black_20%,transparent_75%)]"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)',
            backgroundSize: '64px 32px',
          }}
        />
        <div aria-hidden="true" className="relative h-full w-full">
          {near && (
            <Suspense fallback={null}>
              <ConsolidationPlayer
                text={a.text}
                locale={lang === 'nl' ? 'nl-NL' : 'en-GB'}
                still={reduced}
                paused={paused}
              />
            </Suspense>
          )}
        </div>
      </div>
      <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm text-muted">
        <span>{a.caption}</span>
        {!reduced && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? a.play : a.pause}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:border-gold hover:text-ink"
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
        )}
      </figcaption>
    </figure>
  )
}
