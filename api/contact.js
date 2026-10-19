// Vercel serverless function – körs på servern, aldrig i webbläsaren.
//
// Miljövariabel du behöver sätta:
//   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
//
// Lokalt (med `vercel dev`):
//   Skapa filen .env.local i projektets root och klistra in nyckeln där.
//
// Produktion (Vercel):
//   Gå till ditt projekt i Vercel Dashboard → Settings → Environment Variables
//   och lägg till RESEND_API_KEY med värdet från resend.com/api-keys

const ATTRIBUTION_LABELS = {
  landningssida: 'Landningssida',
  utm_source: 'Källa',
  utm_medium: 'Medium',
  utm_campaign: 'Kampanj',
  utm_content: 'Annons',
  utm_term: 'Sökord',
  gclid: 'Google klick-id',
  fbclid: 'Meta klick-id',
  ttclid: 'TikTok klick-id',
}

const str = (v, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body ?? {}
  const namn = str(body.namn, 200)
  const telefon = str(body.telefon, 100)
  const mail = str(body.mail, 200)
  const foretag = str(body.foretag, 200)
  const tjanst = str(body.tjanst, 100)
  const meddelande = str(body.meddelande, 5000)
  const sida = str(body.sida, 200)

  if (!namn || (!telefon && !mail)) {
    return res.status(400).json({ error: 'Namn och telefon eller mail krävs' })
  }

  // RESEND_API_KEY hämtas från miljövariabler – lägg aldrig in nyckeln direkt här.
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY saknas i miljövariabler')
    return res.status(500).json({ error: 'Serverkonfigurationsfel' })
  }

  const attribution = body.attribution && typeof body.attribution === 'object' ? body.attribution : {}
  const attributionRows = Object.entries(ATTRIBUTION_LABELS)
    .map(([key, label]) => (str(attribution[key], 200) ? `${label}: ${str(attribution[key], 200)}` : null))
    .filter(Boolean)

  const rows = [
    tjanst ? `Tjänst: ${tjanst}` : null,
    `Namn: ${namn}`,
    telefon ? `Telefon: ${telefon}` : null,
    mail ? `Mail: ${mail}` : null,
    foretag ? `Företag: ${foretag}` : null,
    meddelande ? `\nMeddelande:\n${meddelande}` : null,
    sida ? `\nSkickat från: ${sida}` : null,
    ...attributionRows,
  ].filter(Boolean)

  const textBody = rows.join('\n')
  const htmlBody = rows
    .map(r => `<p style="margin:0 0 8px;font-family:sans-serif;line-height:1.6">${escapeHtml(r).replace(/\n/g, '<br>')}</p>`)
    .join('')

  const subject = ['Ny förfrågan', tjanst, namn].filter(Boolean).join(' – ').replace(/[\r\n]+/g, ' ')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Byt ut from-adressen mot er verifierade avsändare när ni lagt till styrmedia.se
        // i Resend Dashboard → Domains. Tills dess fungerar onboarding@resend.dev för test.
        from: 'STYR Kontaktformulär <onboarding@resend.dev>',
        to: ['wilma@styrmedia.se'],
        reply_to: mail || undefined,
        subject,
        text: textBody,
        html: htmlBody,
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      console.error('Resend API-fel:', err)
      return res.status(500).json({ error: 'Utskick misslyckades' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Serverfel:', err)
    return res.status(500).json({ error: 'Serverfel' })
  }
}
