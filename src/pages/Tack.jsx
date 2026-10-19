import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { consumeLeadPending, trackLead } from '../lib/tracking'

export default function Tack() {
  // Rapportera konverteringen bara när besökaren kommer direkt från formuläret,
  // så att en omladdning eller ett direktbesök inte räknas som en ny förfrågan.
  useEffect(() => {
    const tjanst = consumeLeadPending()
    if (tjanst !== null) trackLead(tjanst)
  }, [])

  return (
    <>
      <Helmet>
        <title>Tack! | STYR</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div
        style={{
          background: '#f5f0e8',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 6% 80px',
        }}
      >
        <div style={{ maxWidth: '560px', textAlign: 'center' }}>
          <h1
            className="font-heading"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', color: '#004444', fontWeight: 600, lineHeight: 1.15, margin: '0 0 24px' }}
          >
            Roligt att ni hörde av er!
          </h1>
          <p className="font-body" style={{ fontSize: '18px', color: '#3a3a3a', lineHeight: 1.7, margin: '0 0 40px' }}>
            Jag återkommer så snart jag kan. Har ni bråttom går det bra att ringa{' '}
            <a href="tel:0702277506" style={{ color: '#004444' }}>070-227 75 06</a>.
          </p>
          <Link
            to="/"
            className="font-body"
            style={{ color: '#006666', textDecoration: 'none', borderBottom: '1px solid #006666', paddingBottom: '2px' }}
          >
            Till startsidan →
          </Link>
        </div>
      </div>
    </>
  )
}
