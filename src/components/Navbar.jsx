import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isHome = pathname === '/'
  const transparent = isHome && !scrolled

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollToTjanster = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    if (pathname !== '/') {
      navigate('/#tjanster')
    } else {
      document.getElementById('tjanster')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToOm = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    if (pathname !== '/') {
      navigate('/#om')
    } else {
      document.getElementById('om')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinks = [
    { to: '/kontakt', label: 'Kontakt' },
  ]

  const linkColor = transparent ? 'rgba(255,255,255,0.9)' : '#006666'
  const linkActiveColor = transparent ? '#ffffff' : '#004444'

  const headerStyle = menuOpen
    ? {
        backgroundColor: '#004444',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        borderBottom: 'none',
      }
    : isHome
    ? {
        backgroundColor: scrolled ? 'rgba(245,240,232,0.92)' : 'rgba(245,240,232,0)',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
        borderBottom: '1px solid transparent',
        borderBottomColor: scrolled ? 'rgba(0,102,102,0.08)' : 'transparent',
        transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, border-bottom-color 0.4s ease',
      }
    : {
        backgroundColor: 'rgba(245,240,232,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,102,102,0.08)',
      }

  const mobileLinkStyle = {
    fontFamily: '"Playfair Display", Georgia, serif',
    fontSize: '2.25rem',
    fontWeight: 600,
    color: '#f5f0e8',
    textDecoration: 'none',
    cursor: 'pointer',
    lineHeight: 1.2,
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={headerStyle}>
      <div className="px-6 md:px-[8%] flex items-center justify-between h-16">

        <Link to="/" className="flex items-center" aria-label="STYR startsida">
          <img
            src="/logo-teal-trimmed.png"
            alt="STYR."
            style={{
              height: '28px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              opacity: transparent && !menuOpen ? 0 : 1,
              pointerEvents: transparent && !menuOpen ? 'none' : 'auto',
              transition: 'opacity 0.3s ease',
            }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Huvudnavigation">
          <a
            href="/#tjanster"
            onClick={scrollToTjanster}
            className="label"
            style={{ color: linkColor, fontWeight: 600, transition: 'color 0.3s ease', cursor: 'pointer', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            Tjänster
          </a>

          <a
            href="/#om"
            onClick={scrollToOm}
            className="label"
            style={{ color: linkColor, fontWeight: 600, transition: 'color 0.3s ease', cursor: 'pointer', textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            Om
          </a>

          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className="label"
              style={({ isActive }) => ({
                color: isActive ? linkActiveColor : linkColor,
                fontWeight: 600,
                transition: 'color 0.3s ease',
              })}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger / close */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer relative z-[60]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Stäng meny' : 'Öppna meny'}
          aria-expanded={menuOpen}
          style={{ background: 'none', border: 'none' }}
        >
          {[
            menuOpen ? 'rotate-45 translate-y-2' : '',
            menuOpen ? 'opacity-0' : '',
            menuOpen ? '-rotate-45 -translate-y-2' : '',
          ].map((extra, i) => (
            <span
              key={i}
              className={`block w-5 h-px transition-all duration-200 ${extra}`}
              style={{ background: menuOpen ? '#f5f0e8' : (transparent ? 'white' : '#111111') }}
            />
          ))}
        </button>
      </div>

      {/* Mobile fullscreen overlay */}
      <nav
        className="md:hidden"
        aria-label="Mobilnavigation"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#004444',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9999,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: menuOpen ? 'transform 0.5s ease, opacity 0.3s ease' : 'transform 0.5s ease, opacity 0s',
        }}
      >
        {/* Top bar — logo + close replicated inside overlay */}
        <div className="px-6 flex items-center justify-between h-16 shrink-0">
          <Link to="/" aria-label="STYR startsida" onClick={() => setMenuOpen(false)}>
            <img src="/logo-white-trimmed.png" alt="STYR." style={{ height: '28px', width: 'auto', display: 'block' }} />
          </Link>
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Stäng meny"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="2" y1="2" x2="18" y2="18" stroke="#f5f0e8" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="18" y1="2" x2="2" y2="18" stroke="#f5f0e8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Links — centered on full screen */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
          <a href="/#tjanster" onClick={scrollToTjanster} style={mobileLinkStyle}>
            Tjänster
          </a>
          <NavLink to="/kontakt" style={mobileLinkStyle} onClick={() => setMenuOpen(false)}>
            Kontakt
          </NavLink>
          <a href="/#om" onClick={scrollToOm} style={mobileLinkStyle}>
            Om
          </a>
        </div>
      </nav>
    </header>
  )
}
