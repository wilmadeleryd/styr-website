import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import profilbild from '../assets/Profilbild-Wilma-Deleryd.jpg'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { ServicesAccordion } from '../components/ServicesAccordion'

export default function Home() {
  const heroRef = useRef(null)
  const omRef = useScrollAnimation()
  const servicesTitleRef = useScrollAnimation()
  const servicesBodyRef = useScrollAnimation()
  const caseRef = useScrollAnimation()

  useEffect(() => {
    const hero = heroRef.current
    let rafId
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const vh = window.innerHeight
        const progress = Math.min(scrollY / (vh * 0.8), 1)
        hero.style.setProperty('--scroll-progress', progress)
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <style>{`
        .hero-scroll {
          transform-origin: top center;
          transform: scale(calc(1 - var(--scroll-progress, 0) * 0.15));
          border-radius: calc(var(--scroll-progress, 0) * 24px);
          will-change: transform;
        }

        .underline-link {
          position: relative;
          display: inline-block;
          text-decoration: none;
          cursor: pointer;
        }

        .underline-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          right: 0;
          height: 1px;
          background: currentColor;
          opacity: 0.55;
          clip-path: inset(0 0% 0 0);
          transition: clip-path 250ms ease;
        }

        .underline-link:hover::after {
          clip-path: inset(0 0% 0 100%);
        }
      `}</style>
      <Helmet>
        <title>STYR – Digital Partner</title>
        <meta name="description" content="STYR hjälper små och medelstora företag med digitala verktyg, hemsidor och marknadsföring. Snabbare än en byrå, utan att du behöver anställa en utvecklare." />
        <link rel="canonical" href="https://styrmedia.se/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="STYR – Digital Partner" />
        <meta property="og:description" content="STYR hjälper små och medelstora företag med digitala verktyg, hemsidor och marknadsföring." />
        <meta property="og:url" content="https://styrmedia.se/" />
        <meta property="og:image" content="https://styrmedia.se/hero-bg.jpg" />
      </Helmet>

      {/* Scroll driver: 200vh = 100vh hero + 100vh sticky window (80vh shrink + 20vh hold at min scale before Om enters) */}
      <div style={{ height: '200vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 10 }}>

          {/* hero-wrapper: cream bg shows around the scaled hero card */}
          <div
            style={{
              background: '#f5f0e8',
              width: '100vw',
              height: '100vh',
            }}
          >
          {/* hero-image: background image, margin/radius/opacity animate via CSS custom property */}
          <div
            ref={heroRef}
            className="hero-scroll"
            style={{
              position: 'relative',
              height: '100%',
              backgroundImage: 'url(/hero-bg.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              overflow: 'hidden',
            }}
          >
            {/* Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.1) 100%)',
              }}
            />

            {/* hero-content: absolutely positioned inside the image */}
            <div
              style={{
                position: 'absolute',
                bottom: '8%',
                left: '8%',
                right: '8%',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <p
                className="label mb-6 hero-animate hero-d0"
                style={{ color: 'rgba(255,255,255,0.75)' }}
              >
                PLATTFORMAR · HEMSIDOR · MARKNADSFÖRING
              </p>
              <h1
                className="font-heading font-medium leading-tight mb-4 hero-animate hero-d1"
                style={{
                  fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                  color: 'white',
                  margin: '0 0 16px 0',
                }}
              >
                Din digitala partner
              </h1>
              <img
                src="/logo-2-trimmed.png"
                alt="STYR."
                className="hero-animate hero-d2"
                style={{
                  width: '62vw',
                  maxWidth: '900px',
                  height: 'auto',
                  display: 'block',
                  marginBottom: '32px',
                }}
              />
              <Link
                to="/kontakt"
                className="font-body hero-animate hero-d3 underline-link"
                style={{ color: 'white', fontSize: '1rem' }}
              >
                Låt oss prata →
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Content below hero */}
      <div className="relative" style={{ zIndex: 1, background: '#f5f0e8' }}>

        {/* Om-sektion */}
        <section
          id="om"
          ref={omRef}
          style={{
            background: '#f5f0e8',
            display: 'grid',
            gridTemplateColumns: '50% 50%',
            alignItems: 'stretch',
            paddingLeft: '8%',
            paddingRight: '8%',
            paddingTop: '80px',
            paddingBottom: '80px',
          }}
        >
          {/* Vänster textkolumn */}
          <div
            style={{
              paddingRight: '6%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h2
              className="font-heading animate-heading"
              style={{
                fontSize: '120px',
                fontWeight: 600,
                color: '#004444',
                lineHeight: 1,
                margin: '0 0 64px 0',
              }}
            >
              om.
            </h2>
            <div
              className="font-body animate-fade"
              style={{
                fontSize: '18px',
                color: '#111111',
                lineHeight: 1.7,
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                transitionDelay: '0.15s',
              }}
            >
              <p>
                STYR hjälper små och medelstora företag med digitala verktyg, hemsidor och marknadsföring.
              </p>
              <p>
                STYR drivs av Wilma Deleryd, med bakgrund från Handelshögskolan i Göteborg och erfarenhet av att arbeta med tillväxtbolag och entreprenörer.
              </p>
            </div>
            <Link
              to="/kontakt"
              className="font-body animate-fade underline-link"
              style={{
                color: '#004444',
                fontSize: '1rem',
                marginTop: '40px',
                alignSelf: 'flex-start',
                transitionDelay: '0.3s',
              }}
            >
              Kontakt →
            </Link>
          </div>

          {/* Höger kolumn – profilbild med padding och rundade hörn */}
          <div className="animate-scale" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 48px 48px 24px' }}>
            <img
              src={profilbild}
              alt="Wilma Deleryd, grundare av STYR"
              style={{
                width: '100%',
                maxWidth: '420px',
                height: 'auto',
                aspectRatio: '3/4',
                objectFit: 'cover',
                objectPosition: 'center 15%',
                display: 'block',
                borderRadius: '20px',
              }}
            />
          </div>
        </section>

        {/* Cream block for the remaining sections */}
        <div style={{ background: '#f5f0e8' }}>

        {/* Teal block: accordion + löpande + signatur */}
        <section id="tjanster" style={{ background: '#004444', paddingLeft: '8%', paddingRight: '8%', paddingTop: '80px', paddingBottom: '80px' }}>
          <h2
            ref={servicesTitleRef}
            className="font-heading animate-heading"
            style={{
              fontSize: '120px',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: 1,
              margin: '0 0 64px 0',
            }}
          >
            Tjänster.
          </h2>

          {/* Accordion */}
          <ServicesAccordion />

        </section>

        {/* Case preview */}
        <section ref={caseRef} style={{ padding: '120px 8%' }}>
          <p className="label mb-10 animate">SENASTE PROJEKTET</p>
          <div style={{ display: 'grid', gridTemplateColumns: '55fr 45fr', gap: '64px', alignItems: 'center' }}>
            <div
              className="animate-scale"
              style={{
                width: '100%',
                aspectRatio: '4/3',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                transitionDelay: '0.1s',
              }}
            >
              <img
                src="/mila-case.png"
                alt="Mila Workspace – community-plattform"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '0% 8%', display: 'block' }}
              />
            </div>
            <div className="animate" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', transitionDelay: '0.2s' }}>
              <h2 className="font-heading font-semibold text-brand-text leading-tight" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '20px' }}>
                Mila Workspace
              </h2>
              <p className="text-brand-muted leading-relaxed font-body">
                Ett coworking-space i Göteborg behövde en hel community-plattform för sina medlemmar – med inloggning, bokningar, nyhetsbrev och app-känsla på mobilen. På några veckor.
              </p>
              <Link
                to="/case/mila"
                className="font-body"
                style={{
                  marginTop: '24px',
                  color: '#006666',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  borderBottom: '1px solid #006666',
                  paddingBottom: '2px',
                  display: 'inline-block',
                  alignSelf: 'flex-start',
                  transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.65'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Se caset →
              </Link>
            </div>
          </div>
        </section>
        </div>{/* end white block */}
      </div>
    </>
  )
}
