import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useLang } from '../i18n/LangContext'
import { links } from '../i18n/translations'
import { Section } from '../components/Section'
import { ArrowUpRight } from '../components/Icons'

/**
 * Turnstile site key (public, safe in client code). Set VITE_TURNSTILE_SITE_KEY in Cloudflare Pages
 * build settings. Falls back to Cloudflare's official "always passes" test key for local development.
 */
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'

type Status = 'idle' | 'sending' | 'success' | 'success-no-confirm' | 'error' | 'invalid'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id?: string) => void
    }
  }
}

/** Loads the Turnstile script only when the contact section gets close to the viewport. */
function useTurnstile(container: React.RefObject<HTMLDivElement | null>, lang: string) {
  const [token, setToken] = useState('')
  const widgetId = useRef<string | null>(null)

  useEffect(() => {
    const el = container.current
    if (!el) return
    let cancelled = false

    const render = () => {
      if (cancelled || !window.turnstile || widgetId.current) return
      widgetId.current = window.turnstile.render(el, {
        sitekey: SITE_KEY,
        theme: el.closest('[data-theme]')?.getAttribute('data-theme') === 'light' ? 'light' : 'dark',
        language: lang,
        size: 'flexible',
        callback: (t: string) => setToken(t),
        'expired-callback': () => setToken(''),
        'error-callback': () => setToken(''),
      })
    }

    const load = () => {
      if (window.turnstile) return render()
      if (document.getElementById('cf-turnstile')) return
      const s = document.createElement('script')
      s.id = 'cf-turnstile'
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      s.async = true
      s.defer = true
      s.onload = render
      document.head.appendChild(s)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load()
          io.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
    }
  }, [container, lang])

  const reset = () => {
    setToken('')
    if (window.turnstile && widgetId.current) window.turnstile.reset(widgetId.current)
  }
  return { token, reset }
}

const field =
  'w-full rounded-xl border border-line-strong bg-transparent px-4 py-3 text-base transition-colors placeholder:text-muted/60 focus:border-gold focus:outline-none focus-visible:outline-none'

export function Contact() {
  const { t, lang } = useLang()
  const c = t.contact
  const [status, setStatus] = useState<Status>('idle')
  const tsRef = useRef<HTMLDivElement>(null)
  const { token, reset } = useTurnstile(tsRef, lang)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      name: String(fd.get('name') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      company: String(fd.get('company') || '').trim(),
      message: String(fd.get('message') || '').trim(),
      website: String(fd.get('website') || ''), // honeypot
      token,
      lang,
    }
    if (!payload.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || !payload.message) {
      setStatus('invalid')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; confirmation?: boolean }
      if (!res.ok || !data.ok) throw new Error('send failed')
      setStatus(data.confirmation ? 'success' : 'success-no-confirm')
      form.reset()
    } catch {
      setStatus('error')
    } finally {
      reset()
    }
  }

  const sent = status === 'success' || status === 'success-no-confirm'

  return (
    <Section id="contact" index="07" tone="inverse" label={c.label} title={c.title} intro={c.intro}>
      <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="order-2 lg:order-1">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted">{c.elsewhere}</p>
          <ul className="mt-5 border-t border-line">
            {[
              { label: 'LinkedIn', href: links.linkedin },
              { label: 'GitHub', href: links.github },
              { label: 'Twine', href: links.twine },
            ].map((l) => (
              <li key={l.label} className="border-b border-line">
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 text-lg tracking-tight transition-colors hover:text-gold-ink"
                >
                  {l.label}
                  <ArrowUpRight className="h-5 w-5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-ink" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} noValidate className="order-1 space-y-5 lg:order-2" aria-describedby="privacy-note">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="cf-name" className="mb-2 block text-sm font-medium">{c.name}</label>
              <input id="cf-name" name="name" type="text" autoComplete="name" required maxLength={100} className={field} />
            </div>
            <div>
              <label htmlFor="cf-email" className="mb-2 block text-sm font-medium">{c.email}</label>
              <input id="cf-email" name="email" type="email" autoComplete="email" required maxLength={200} className={field} />
            </div>
          </div>
          <div>
            <label htmlFor="cf-company" className="mb-2 block text-sm font-medium">{c.company}</label>
            <input id="cf-company" name="company" type="text" autoComplete="organization" maxLength={150} className={field} />
          </div>
          <div>
            <label htmlFor="cf-message" className="mb-2 block text-sm font-medium">{c.message}</label>
            <textarea id="cf-message" name="message" required rows={6} maxLength={5000} className={`${field} resize-y`} />
          </div>

          {/* Honeypot: hidden from people, bots fill it in */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
            <label htmlFor="cf-website">Website</label>
            <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div ref={tsRef} className="min-h-[65px]" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-on-gold transition-transform enabled:hover:-translate-y-0.5 disabled:opacity-60"
            >
              {status === 'sending' ? c.sending : c.send}
            </button>
            <p role="status" aria-live="polite" className="text-sm">
              {sent && <span className="text-positive">{status === 'success' ? c.success : c.successNoConfirm}</span>}
              {status === 'error' && <span className="text-negative">{c.error}</span>}
              {status === 'invalid' && <span className="text-negative">{c.invalid}</span>}
            </p>
          </div>

          <p id="privacy-note" className="max-w-xl pt-2 text-xs leading-relaxed text-muted">{c.privacy}</p>
        </form>
      </div>
    </Section>
  )
}
