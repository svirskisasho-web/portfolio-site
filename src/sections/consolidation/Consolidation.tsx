import type { CSSProperties } from 'react'
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'

/*
 * "What a group consolidation does" – a calm 11-second loop at 30 fps.
 * Made-up example figures (in € thousands). They must add up:
 *   revenue 420 + 280 + 190 + 110 = 1,000   costs 310 + 205 + 150 + 85 = 750   result 250
 *   NL invoiced DE 50 → eliminate 50 from revenue and 50 from costs → 950 / 700 / result still 250
 */
export const FPS = 30
export const DURATION = 330
export const STILL_FRAME = 290

export const ENTITIES = [
  { code: 'NL', revenue: 420, costs: 310 },
  { code: 'DE', revenue: 280, costs: 205 },
  { code: 'UK', revenue: 190, costs: 150 },
  { code: 'BG', revenue: 110, costs: 85 },
] as const
export const IC = 50 // NL → DE intercompany invoice

const SUM_REV = ENTITIES.reduce((s, e) => s + e.revenue, 0) // 1000
const SUM_COST = ENTITIES.reduce((s, e) => s + e.costs, 0) // 750

export type ConsolidationText = {
  entity: string
  revenue: string
  costs: string
  result: string
  consolidated: string
  example: string
  icTo: string
  icFrom: string
  intercompany: string
  elimination: string
  ties: string
}

export type ConsolidationProps = { text: ConsolidationText; locale: string }

// Calm ease-out, no overshoot
const ease = Easing.bezier(0.22, 1, 0.36, 1)
const inOut = Easing.bezier(0.65, 0, 0.35, 1)
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const
const tween = (f: number, a: number, b: number, e = ease) => interpolate(f, [a, b], [0, 1], { ...clamp, easing: e })

/** Two layouts: wide (1280×640) for tablet/desktop, tall (720×960) for phones. */
function getLayout(wide: boolean) {
  if (wide) {
    const cardW = 280
    const gap = 26
    const x0 = (1280 - (cardW * 4 + gap * 3)) / 2
    return {
      cards: ENTITIES.map((_, i) => ({ x: x0 + i * (cardW + gap), y: 28, w: cardW, h: 206 })),
      bracketY: 280,
      panel: { x: 300, y: 326, w: 680, h: 288 },
      f: { title: 19, label: 16, value: 22, ic: 15, pTitle: 22, pLabel: 19, pValue: 28, chip: 15, pad: 22 },
    }
  }
  const cardW = 316
  const gap = 24
  const x0 = (720 - (cardW * 2 + gap)) / 2
  return {
    cards: ENTITIES.map((_, i) => ({ x: x0 + (i % 2) * (cardW + gap), y: 28 + Math.floor(i / 2) * 292, w: cardW, h: 224 })),
    bracketY: 286,
    panel: { x: x0, y: 572, w: cardW * 2 + gap, h: 356 },
    f: { title: 27, label: 25, value: 30, ic: 22, pTitle: 30, pLabel: 28, pValue: 40, chip: 22, pad: 24 },
  }
}

export function Consolidation({ text, locale }: ConsolidationProps) {
  const frame = useCurrentFrame()
  const { width, height } = useVideoConfig()
  const L = getLayout(width > height)
  const { f } = L
  const num = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 })
  const k = (n: number) => `€${num.format(Math.round(n))}k`

  // ---- Timeline (frames) ----
  // 0–3 s  cards slide in
  const cardIn = (i: number) => tween(frame, 6 + i * 10, 34 + i * 10)
  const panelIn = tween(frame, 70, 96)
  // 3–6 s  figures flow into the panel and count up
  const flowStart = (i: number) => 92 + i * 10
  const flow = (i: number) => tween(frame, flowStart(i), flowStart(i) + 34, inOut)
  const arrived = (i: number) => tween(frame, flowStart(i) + 22, flowStart(i) + 40)
  // 6–8 s  intercompany highlight, then elimination
  const icIn = tween(frame, 182, 198)
  const bracket = tween(frame, 186, 206)
  const strike = tween(frame, 210, 226)
  const elimIn = tween(frame, 214, 230)
  const drop = tween(frame, 218, 240)
  // 8–10 s check, hold, then fade out for a seamless loop
  const checkIn = tween(frame, 246, 266)
  const fadeOut = interpolate(frame, [302, 326], [1, 0], { ...clamp, easing: inOut })

  const revenue = ENTITIES.reduce((s, e, i) => s + e.revenue * arrived(i), 0) - IC * drop
  const costs = ENTITIES.reduce((s, e, i) => s + e.costs * arrived(i), 0) - IC * drop

  const card: CSSProperties = {
    position: 'absolute',
    boxSizing: 'border-box',
    borderRadius: 20,
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderColor: 'var(--line-strong)',
    background: 'var(--surface)',
    padding: f.pad,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 24px 60px -40px rgb(0 0 0 / 0.45)',
  }
  const row: CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }
  const muted: CSSProperties = { color: 'var(--muted)', fontSize: f.label }
  const value: CSSProperties = { fontSize: f.value, fontWeight: 600, letterSpacing: '-0.02em' }

  const panelCx = L.panel.x + L.panel.w / 2
  const nl = L.cards[0]
  const de = L.cards[1]
  const bracketL = nl.x + nl.w / 2
  const bracketR = de.x + de.w / 2
  const cardBottom = nl.y + nl.h

  return (
    <AbsoluteFill
      style={{ fontFamily: 'inherit', color: 'var(--ink)', fontVariantNumeric: 'tabular-nums', opacity: fadeOut }}
    >
      {/* Flow lines from each card into the panel */}
      <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
        {L.cards.map((c, i) => {
          const x1 = c.x + c.w / 2
          const y1 = c.y + c.h
          const x2 = panelCx + (i - 1.5) * 40
          const y2 = L.panel.y
          const d = `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`
          const p = flow(i)
          return (
            <path
              key={c.x + '-' + c.y}
              d={d}
              fill="none"
              stroke="var(--gold)"
              strokeWidth={2}
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1 - p}
              opacity={0.55 * (1 - tween(frame, 176, 196))}
            />
          )
        })}

        {/* Intercompany bracket between NL and DE */}
        <path
          d={`M ${bracketL} ${cardBottom} V ${L.bracketY} H ${bracketR} V ${cardBottom}`}
          fill="none"
          stroke="var(--gold)"
          strokeWidth={2}
          pathLength={1}
          strokeDasharray="1 1"
          strokeDashoffset={1 - bracket}
        />
      </svg>

      {/* Entity cards */}
      {ENTITIES.map((e, i) => {
        const c = L.cards[i]
        const p = cardIn(i)
        const isNL = i === 0
        const isDE = i === 1
        const hasIC = isNL || isDE
        const hl = hasIC ? icIn : 0
        return (
          <div
            key={e.code}
            style={{
              ...card,
              left: c.x,
              top: c.y,
              width: c.w,
              height: c.h,
              opacity: p,
              transform: `translateY(${(1 - p) * 28}px)`,
              borderColor: hl > 0 ? `color-mix(in srgb, var(--gold) ${hl * 70}%, var(--line-strong))` : 'var(--line-strong)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: f.title, fontWeight: 600, letterSpacing: '-0.01em' }}>
              <span style={{ width: f.title * 0.42, height: f.title * 0.42, borderRadius: 99, background: 'var(--gold)' }} />
              {text.entity} {e.code}
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div
                style={{
                  ...row,
                  margin: '0 -8px',
                  padding: '2px 8px',
                  borderRadius: 8,
                  background: isNL ? `color-mix(in srgb, var(--gold) ${hl * 18}%, transparent)` : undefined,
                }}
              >
                <span style={muted}>{text.revenue}</span>
                <span style={value}>{k(e.revenue)}</span>
              </div>
              <div
                style={{
                  ...row,
                  margin: '0 -8px',
                  padding: '2px 8px',
                  borderRadius: 8,
                  background: isDE ? `color-mix(in srgb, var(--gold) ${hl * 18}%, transparent)` : undefined,
                }}
              >
                <span style={muted}>{text.costs}</span>
                <span style={value}>{k(e.costs)}</span>
              </div>
              {/* Intercompany line (NL and DE only); reserves space on all cards */}
              <div style={{ ...row, position: 'relative', fontSize: f.ic, minHeight: f.ic * 1.5, opacity: hasIC ? hl : 0, color: 'var(--gold-ink)', fontWeight: 500 }}>
                <span>{isNL ? text.icTo : text.icFrom}</span>
                <span>{k(IC)}</span>
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '52%',
                    height: 2,
                    width: `${strike * 100}%`,
                    background: 'var(--gold-ink)',
                  }}
                />
              </div>
            </div>
          </div>
        )
      })}

      {/* Intercompany → Elimination pill on the bracket */}
      {(() => {
        const x = (bracketL + bracketR) / 2
        const op = tween(frame, 196, 210)
        return (
          <div
            style={{
              position: 'absolute',
              left: x,
              top: L.bracketY,
              transform: `translate(-50%, -50%) translateY(${(1 - op) * 6}px)`,
              opacity: op,
              padding: `${f.chip * 0.35}px ${f.chip * 0.9}px`,
              borderRadius: 999,
              border: '1.5px solid var(--gold)',
              background: 'var(--surface)',
              fontSize: f.chip,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              display: 'grid',
            }}
          >
            <span style={{ gridArea: '1/1', opacity: 1 - elimIn, color: 'var(--gold-ink)' }}>
              {text.intercompany} {k(IC)}
            </span>
            <span style={{ gridArea: '1/1', opacity: elimIn, color: 'var(--gold-ink)', textAlign: 'center' }}>
              {text.elimination} −{k(IC)}
            </span>
          </div>
        )
      })()}

      {/* Consolidated panel */}
      <div
        style={{
          ...card,
          left: L.panel.x,
          top: L.panel.y,
          width: L.panel.w,
          height: L.panel.h,
          padding: `${f.pad}px ${f.pad * 1.3}px`,
          opacity: panelIn,
          transform: `translateY(${(1 - panelIn) * 20}px)`,
          borderColor: 'var(--gold)',
          gap: f.pad * 0.45,
        }}
      >
        <div style={{ ...row, alignItems: 'center' }}>
          <span style={{ fontSize: f.pTitle, fontWeight: 600, letterSpacing: '-0.01em' }}>{text.consolidated}</span>
          <span
            style={{
              fontSize: f.chip,
              color: 'var(--muted)',
              border: '1px solid var(--line-strong)',
              borderRadius: 999,
              padding: `${f.chip * 0.15}px ${f.chip * 0.7}px`,
            }}
          >
            {text.example}
          </span>
        </div>

        {[
          { label: text.revenue, v: revenue },
          { label: text.costs, v: costs },
        ].map((r) => (
          <div key={r.label} style={{ ...row, alignItems: 'center' }}>
            <span style={{ color: 'var(--muted)', fontSize: f.pLabel }}>{r.label}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: f.pad * 0.6 }}>
              <span
                style={{
                  fontSize: f.chip,
                  fontWeight: 600,
                  color: 'var(--gold-ink)',
                  background: 'color-mix(in srgb, var(--gold) 16%, transparent)',
                  borderRadius: 999,
                  padding: `${f.chip * 0.15}px ${f.chip * 0.6}px`,
                  opacity: elimIn,
                  transform: `translateX(${(1 - elimIn) * 10}px)`,
                }}
              >
                −{k(IC)}
              </span>
              <span style={{ fontSize: f.pValue, fontWeight: 600, letterSpacing: '-0.02em', minWidth: f.pValue * 3.6, textAlign: 'right' }}>
                {k(r.v)}
              </span>
            </span>
          </div>
        ))}

        <div style={{ ...row, alignItems: 'center', borderTop: '1.5px solid var(--line-strong)', paddingTop: f.pad * 0.45 }}>
          <span style={{ fontSize: f.pLabel, fontWeight: 600 }}>{text.result}</span>
          <span style={{ fontSize: f.pValue, fontWeight: 700, letterSpacing: '-0.02em' }}>{k(revenue - costs)}</span>
        </div>

        {/* Ties back to balance */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: f.pLabel * 0.85,
            fontWeight: 600,
            color: 'var(--positive)',
            opacity: checkIn,
            transform: `translateY(${(1 - checkIn) * 8}px)`,
          }}
        >
          <svg width={f.pLabel * 1.15} height={f.pLabel * 1.15} viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="11" fill="var(--positive)" />
            <path
              d="M7 12.5l3.2 3.2L17 9"
              fill="none"
              stroke="var(--surface)"
              strokeWidth={2.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1 - tween(frame, 252, 270)}
            />
          </svg>
          {text.ties}
        </div>
      </div>
      {/* Moving dots along the flow lines (on top, so they pass over the second row on phones) */}
      {L.cards.map((c, i) => {
        const p = flow(i)
        if (p <= 0 || p >= 1) return null
        const x1 = c.x + c.w / 2
        const y1 = c.y + c.h
        const x2 = panelCx + (i - 1.5) * 40
        const y2 = L.panel.y
        // cubic bezier point, same curve as the path above
        const my = (y1 + y2) / 2
        const t = p
        const bx = (1 - t) ** 3 * x1 + 3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3 * x2
        const by = (1 - t) ** 3 * y1 + 3 * (1 - t) ** 2 * t * my + 3 * (1 - t) * t ** 2 * my + t ** 3 * y2
        const size = f.chip * 1.9
        return (
          <div
            key={'dot' + i}
            style={{
              position: 'absolute',
              left: bx - size,
              top: by - size / 2,
              width: size * 2,
              height: size,
              borderRadius: 999,
              background: 'var(--gold)',
              color: 'var(--on-gold)',
              fontSize: f.chip,
              fontWeight: 600,
              display: 'grid',
              placeItems: 'center',
              opacity: interpolate(p, [0, 0.1, 0.85, 1], [0, 1, 1, 0]),
            }}
          >
            {ENTITIES[i].code}
          </div>
        )
      })}

    </AbsoluteFill>
  )
}

// Sanity check on the example figures (runs once when the chunk loads, dev only)
if (import.meta.env.DEV) {
  console.assert(SUM_REV === 1000 && SUM_COST === 750, 'Consolidation example: entity figures no longer add up')
}
