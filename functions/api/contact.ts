type ContactPayload = {
  name?: string
  firm?: string
  role?: string
  email?: string
  phone?: string
  location?: string
  sector?: string
  package?: string
  schedule?: string
  message?: string
  files?: string[]
  website?: string
}

type Env = {
  BREVO_API_KEY?: string
  CONTACT_TO?: string
  CONTACT_FROM?: string
}

const MAX = {
  name: 120,
  firm: 160,
  role: 120,
  email: 200,
  phone: 60,
  location: 160,
  sector: 80,
  package: 80,
  schedule: 120,
  message: 6000,
}

function clean(value: unknown, limit: number) {
  return typeof value === 'string' ? value.trim().slice(0, limit) : ''
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context

  let data: ContactPayload
  try {
    data = (await request.json()) as ContactPayload
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400)
  }

  // Honeypot: bots fill it, humans never see it.
  if (clean(data.website, 200)) {
    return json({ ok: true })
  }

  const name = clean(data.name, MAX.name)
  const email = clean(data.email, MAX.email)
  const message = clean(data.message, MAX.message)
  const firm = clean(data.firm, MAX.firm)
  const role = clean(data.role, MAX.role)
  const phone = clean(data.phone, MAX.phone)
  const location = clean(data.location, MAX.location)
  const sector = clean(data.sector, MAX.sector)
  const preferredPackage = clean(data.package, MAX.package)
  const schedule = clean(data.schedule, MAX.schedule)
  const files = Array.isArray(data.files)
    ? data.files.map((file) => clean(file, 240)).filter(Boolean).slice(0, 20)
    : []

  if (!name || !email || !message) {
    return json({ ok: false, error: 'Name, email, and project notes are required.' }, 400)
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'Please provide a valid email address.' }, 400)
  }

  if (!env.BREVO_API_KEY) {
    return json(
      { ok: false, error: 'Email service is not configured yet. Please email info@croixlighting.com.ph.' },
      503,
    )
  }

  const rows: Array<[string, string]> = [
    ['Name', name],
    ['Firm', firm],
    ['Role', role],
    ['Email', email],
    ['Phone', phone],
    ['Project location', location],
    ['Sector', sector],
    ['Preferred package', preferredPackage],
    ['Target schedule', schedule],
  ].filter(([, value]) => value) as Array<[string, string]>

  const htmlContent = `
    <div style="font-family:Arial,sans-serif;color:#1D1E20;line-height:1.6">
      <h2 style="margin:0 0 4px">New project enquiry</h2>
      <p style="margin:0 0 20px;color:#6E6C67">CROIX Lighting Design Studio website</p>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding:8px 12px 8px 0;border-bottom:1px solid #ECEAE3;color:#6E6C67;font-size:12px;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap">${escapeHtml(label)}</td>
                <td style="padding:8px 0;border-bottom:1px solid #ECEAE3;font-size:14px">${escapeHtml(value)}</td>
              </tr>`,
          )
          .join('')}
      </table>
      <h3 style="margin:24px 0 8px;font-size:14px">Project notes</h3>
      <p style="margin:0;white-space:pre-wrap;font-size:14px">${escapeHtml(message)}</p>
      ${
        files.length
          ? `<h3 style="margin:24px 0 8px;font-size:14px">Files named by the sender</h3>
             <ul style="margin:0;padding-left:18px;font-size:14px">${files
               .map((file) => `<li>${escapeHtml(file)}</li>`)
               .join('')}</ul>
             <p style="color:#6E6C67;font-size:12px">Ask the sender to reply with the actual drawings attached.</p>`
          : ''
      }
    </div>
  `

  const textContent = [
    'New project enquiry — CROIX website',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Project notes:',
    message,
    files.length ? `\nFiles named by the sender: ${files.join(', ')}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': env.BREVO_API_KEY,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'CROIX Website',
          email: env.CONTACT_FROM || 'website@croixlighting.com.ph',
        },
        to: [{ email: env.CONTACT_TO || 'info@croixlighting.com.ph' }],
        replyTo: { email, name },
        subject: `New project enquiry — ${firm || name}`,
        htmlContent,
        textContent,
      }),
    })

    if (!response.ok) {
      const detail = await response.text()
      console.error('Brevo error', response.status, detail.slice(0, 500))
      return json({ ok: false, error: 'The email service rejected the message. Please try again.' }, 502)
    }

    return json({ ok: true })
  } catch (error) {
    console.error('Brevo request failed', String(error).slice(0, 300))
    return json({ ok: false, error: 'The email service is unavailable. Please email info@croixlighting.com.ph.' }, 502)
  }
}
