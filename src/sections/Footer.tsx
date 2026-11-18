import { useLang } from '../i18n/LangContext'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} Sasho Svirski. {t.footer.rights}
        </p>
        <a href="#top" className="transition-colors hover:text-ink">
          {t.footer.top} ↑
        </a>
      </div>
    </footer>
  )
}
