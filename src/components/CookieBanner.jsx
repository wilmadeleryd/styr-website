import { useEffect, useState } from 'react'
import { CONSENT_EVENT, getConsent, hasTrackers, setConsent } from '../lib/tracking'

const buttonBase = {
  flex: '1 1 0',
  minWidth: '140px',
  borderRadius: 0,
  padding: '12px 20px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  border: '1px solid #004444',
  transition: 'opacity 0.15s ease',
}

export default function CookieBanner() {
  const [open, setOpen] = useState(() => hasTrackers() && getConsent() === null)

  useEffect(() => {
    const reopen = () => setOpen(true)
    window.addEventListener(CONSENT_EVENT, reopen)
    return () => window.removeEventListener(CONSENT_EVENT, reopen)
  }, [])

  if (!open) return null

  const choose = (value) => {
    setOpen(false)
    setConsent(value)
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie-inställningar"
      style={{
        position: 'fixed',
        left: '16px',
        right: '16px',
        bottom: '16px',
        maxWidth: '520px',
        marginLeft: 'auto',
        background: '#f5f0e8',
        color: '#004444',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        zIndex: 300,
      }}
    >
      <p className="font-body" style={{ fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 20px' }}>
        Vi använder cookies för att mäta hur våra annonser fungerar, via Meta, Google och TikTok. Inga mätcookies sätts utan ert godkännande.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => choose('denied')}
          style={{ ...buttonBase, background: 'transparent', color: '#004444' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Endast nödvändiga
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          style={{ ...buttonBase, background: '#004444', color: '#f5f0e8' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Godkänn
        </button>
      </div>
    </div>
  )
}
