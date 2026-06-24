import { Link, NavLink } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zm13.328 0h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z"/>
    </svg>
  )
}

const links = [
  { to: '/#tjanster', label: 'TJÄNSTER' },
  { to: '/#om', label: 'OM' },
  { to: '/kontakt', label: 'KONTAKT' },
]

const labelStyle = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.8rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#ffffff',
  textDecoration: 'none',
  transition: 'opacity 0.15s ease',
}

export default function Footer() {
  const footerRef = useScrollAnimation()

  return (
    <footer ref={footerRef} className="animate-fade" style={{ background: '#004444', padding: '64px 8% 32px' }}>

      {/* Nav links */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
        {links.map(({ to, label }) => (
          <a
            key={to}
            href={to}
            style={labelStyle}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', margin: '32px 0' }} />

      {/* Bottom row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <Link to="/" aria-label="STYR startsida">
          <img src="/logo-2-trimmed.png" alt="STYR." style={{ height: '28px', width: 'auto', display: 'block' }} />
        </Link>

        <a
          href="mailto:wilma@styrmedia.se"
          style={{ ...labelStyle, letterSpacing: '0', fontSize: '0.9rem', fontWeight: 400, textTransform: 'none' }}
          onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
        >
          wilma@styrmedia.se
        </a>

        <a
          href="https://www.linkedin.com/company/styrmedia"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          style={{ opacity: 0.8, transition: 'opacity 0.2s ease', display: 'flex', alignItems: 'center' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
        >
          <LinkedInIcon />
        </a>
      </div>

      {/* Copyright */}
      <p style={{ marginTop: '32px', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontFamily: 'Inter, sans-serif' }}>
        © 2025 STYR
      </p>

    </footer>
  )
}
