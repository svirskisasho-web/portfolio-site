import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LangContext'
import type { Lang } from '../i18n/translations'
import { CloseIcon, MenuIcon, Moon, Sun } from '../components/Icons'

type Theme = 'light' | 'dark'

function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.getAttribute('data-theme') as Theme) || 'dark',
  )
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0B1A2B' : '#FAF8F4')
  }, [theme])
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* storage unavailable */
    }
  }
  return { theme, toggle }
}

export function Header() {
  const { t, lang, setLang } = useLang()
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const nav = [
    { href: '#services', label: t.nav.services },
    { href: '#demo', label: t.nav.demo },
    { href: '#work', label: t.nav.work },
    { href: '#cases', label: t.nav.cases },
    { href: '#process', label: t.nav.process },
    { href: '#background', label: t.nav.background },
  ]

  const LangSwitch = () => (
    <div role="group" aria-label={t.nav.language} className="flex items-center text-xs font-medium tracking-wide">
      {(['en', 'nl'] as Lang[]).map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span aria-hidden="true" className="px-1 text-line-strong">/</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            lang={l}
            className={`rounded px-1.5 py-1.5 uppercase transition-colors ${
              lang === l ? 'text-ink' : 'text-muted hover:text-ink'
            }`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  )

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        open
          ? 'border-b border-line bg-bg'
          : scrolled
            ? 'border-b border-line bg-bg/85 backdrop-blur-md'
            : 'border-b border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-gold focus:px-3 focus:py-2 focus:text-sm focus:text-on-gold"
      >
        {t.nav.skip}
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight" onClick={() => setOpen(false)}>
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold transition-transform duration-300 group-hover:scale-125" />
          Sasho Svirski
        </a>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-muted transition-colors hover:text-ink">
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-line-strong px-4 py-1.5 text-sm transition-colors hover:border-gold hover:text-ink"
          >
            {t.nav.contact}
          </a>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LangSwitch />
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? t.nav.themeToLight : t.nav.themeToDark}
            className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:text-ink"
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.close : t.nav.menu}
            className="grid h-10 w-10 place-items-center rounded-full text-ink lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-4">
            {[...nav, { href: '#contact', label: t.nav.contact }].map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-4 text-lg tracking-tight last:border-none"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
