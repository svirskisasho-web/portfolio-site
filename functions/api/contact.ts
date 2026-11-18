/**
 * Cloudflare Pages Function: POST /api/contact
 *
 * 1. Validates the form input and the honeypot field.
 * 2. Verifies the Cloudflare Turnstile token (spam protection).
 * 3. Sends the full message to you, and a confirmation to the visitor, via Resend.
 *
 * Secrets are NEVER in the code. Set them in Cloudflare Pages > Settings > Variables and Secrets
 * (and in a local .dev.vars file for testing; see .dev.vars.example and the README).
 */

interface Env {
  RESEND_API_KEY: string
  CONTACT_TO_EMAIL: string
  CONTACT_FROM_EMAIL: string
  TURNSTILE_SECRET_KEY: string
}

type Body = {
  name?: unknown
  email?: unknown
  company?: unknown
  message?: unknown
  website?: unknown
  token?: unknown
  lang?: unknown
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function verifyTurnstile(secret: string, token: string, ip: string | null) {
  const form = new FormData()
  form.append('secret', secret)
  form.append('response', token)
  if (ip) form.append('remoteip', ip)
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form })
  const out = (await res.json()) as { success?: boolean }
  return out.success === true
}

async function sendEmail(env: Env, msg: { to: string; subject: string; html: string; text: string; reply_to?: string }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: env.CONTACT_FROM_EMAIL, ...msg }),
  })
  if (!res.ok) {
    console.error('Resend error', res.status, await res.text())
    return false
  }
  return true
}

const confirmation = {
  en: {
    subject: 'Thanks for your message',
    body: (name: string) =>
      `Hi ${name},\n\nThanks for getting in touch. I have received your message and will reply personally.\n\nBest regards,\nSasho Svirski`,
  },
  nl: {
    subject: 'Bedankt voor je bericht',
    body: (name: string) =>
      `Hoi ${name},\n\nBedankt voor je bericht. Ik heb het ontvangen en reageer persoonlijk.\n\nMet vriendelijke groet,\nSasho Svirski`,
  },
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL || !env.TURNSTILE_SECRET_KEY) {
    console.error('Contact form is not configured: missing environment variables')
    return json({ ok: false, error: 'not_configured' }, 500)
  }

  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400)
  }

  // Honeypot filled in → pretend success, send nothing.
  if (str(body.website, 200)) return json({ ok: true, confirmation: false })

  const name = str(body.name, 100)
  const email = str(body.email, 200)
  const company = str(body.company, 150)
  const message = str(body.message, 5000)
  const token = str(body.token, 2048)
  const lang = body.lang === 'nl' ? 'nl' : 'en'

  if (!name || !EMAIL_RE.test(email) || !message) return json({ ok: false, error: 'invalid' }, 400)
  if (!token) return json({ ok: false, error: 'captcha' }, 400)

  const human = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, request.headers.get('CF-Connecting-IP'))
  if (!human) return json({ ok: false, error: 'captcha' }, 400)

  // 1) Full message to you. Reply-To is the visitor, so you can just hit "Reply".
  const toYou = await sendEmail(env, {
    to: env.CONTACT_TO_EMAIL,
    reply_to: email,
    subject: `New portfolio enquiry from ${name}${company ? ` (${company})` : ''}`,
    text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || '-'}\nLanguage: ${lang}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${esc(name)}<br><strong>Email:</strong> ${esc(email)}<br><strong>Company:</strong> ${esc(company || '-')}<br><strong>Language:</strong> ${lang}</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
  })
  if (!toYou) return json({ ok: false, error: 'send_failed' }, 502)

  // 2) Confirmation to the visitor. Only works once your domain is verified in Resend.
  const c = confirmation[lang]
  const confirmed = await sendEmail(env, {
    to: email,
    subject: c.subject,
    // The visitor's message is deliberately NOT echoed back, so the form can't be abused to send
    // arbitrary content to other people's inboxes from your domain.
    text: c.body(name),
    html: `<div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0B1A2B"><p style="white-space:pre-wrap">${esc(c.body(name))}</p></div>`,
  })

  return json({ ok: true, confirmation: confirmed })
}

