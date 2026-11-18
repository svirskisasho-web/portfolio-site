import { useLang } from '../i18n/LangContext'
import { Section } from '../components/Section'
import { ArrowUpRight } from '../components/Icons'

/**
 * The FIRST project in translations.ts is shown as the large "featured" card.
 * The others follow as regular cards (image and text side by side on desktop).
 */
export function Work() {
  const { t } = useLang()
  return (
    <Section id="work" index="03" tone="tint" label={t.work.label} title={t.work.title}>
      <div className="space-y-20 sm:space-y-28">
        {t.work.projects.map((p, i) => {
          const featured = i === 0
          return (
            <article
              key={p.id}
              className={`group grid items-center gap-8 lg:gap-14 ${
                featured ? 'lg:grid-cols-[1.45fr_1fr]' : 'lg:grid-cols-[1fr_1.1fr]'
              }`}
            >
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative block overflow-hidden rounded-2xl border border-line bg-surface ${
                  featured ? 'shadow-[0_30px_80px_-40px_rgb(0_0_0/0.55)]' : 'lg:order-2'
                }`}
              >
                <img
                  src={p.image}
                  alt={p.alt}
                  width={1280}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <span className="sr-only">
                  {t.work.viewLive}: {p.name}
                </span>
              </a>

              <div className={featured ? '' : 'lg:order-1'}>
                {featured && (
                  <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/60 px-3 py-1 text-xs font-medium tracking-wide text-gold-ink">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {t.work.featured}
                  </p>
                )}
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{p.tag}</p>
                <h3 className={`mt-2 font-semibold tracking-tight ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
                  {p.name}
                </h3>
                <p className={`mt-4 leading-relaxed text-muted ${featured ? 'text-lg' : ''}`}>{p.summary}</p>
                <ul className="mt-6 space-y-2.5 text-sm leading-relaxed">
                  {p.details.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-gold" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      featured
                        ? 'inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-on-gold transition-transform hover:-translate-y-0.5'
                        : 'inline-flex items-center gap-1.5 border-b border-gold pb-0.5 transition-colors hover:text-gold-ink'
                    }
                  >
                    {t.work.viewLive} <span className="sr-only">: {p.name}</span>
                    <ArrowUpRight />
                  </a>
                  {p.code && (
                    <a
                      href={p.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border-b border-line-strong pb-0.5 text-muted transition-colors hover:text-ink"
                    >
                      {t.work.viewCode} <span className="sr-only">: {p.name}</span>
                      <ArrowUpRight />
                    </a>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
