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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { namn, telefon, foretag, mail, meddelande } = req.body ?? {}

  if (!namn?.trim() || !telefon?.trim()) {
    return res.status(400).json({ error: 'Namn och telefon krävs' })
  }

  // RESEND_API_KEY hämtas från miljövariabler – lägg aldrig in nyckeln direkt här.
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY saknas i miljövariabler')
    return res.status(500).json({ error: 'Serverkonfigurationsfel' })
  }

  const rows = [
    `Namn: ${namn}`,
    `Telefon: ${telefon}`,
    foretag ? `Företag: ${foretag}` : null,
    mail ? `Mail: ${mail}` : null,
    meddelande ? `\nMeddelande:\n${meddelande}` : null,
  ].filter(Boolean)

  const textBody = rows.join('\n')
  const htmlBody = rows
    .map(r => `<p style="margin:0 0 8px;font-family:sans-serif;line-height:1.6">${r.replace(/\n/g, '<br>')}</p>`)
    .join('')

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
        reply_to: mail?.trim() || undefined,
        subject: `Ny förfrågan från ${namn}`,
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
