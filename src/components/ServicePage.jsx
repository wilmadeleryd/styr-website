import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ContactForm from './ContactForm'
import CalBooking from './CalBooking'
import profilbild from '../assets/Profilbild-Wilma-Deleryd.jpg'

// Mall för tjänstesidorna (/hemsidor, /digitala-verktyg). Redaktionell stil: tunna
// linjer, Playfair och luft – inga kort eller ikonrutor. Rosa bara i strecket
// ovanför bokningsrubriken.

const BASE = 'https://styrmedia.se'
const OG_IMAGE = `${BASE}/styr-og-image.jpg?v=2`

const TEAL = '#004444'
const CREAM = '#f5f0e8'
const SAND = '#ede6da'
const PINK = '#fdc6be'
const LINE = 'rgba(0,68,68,0.16)'

const sectionLabel = { marginBottom: '20px' }

const h2Style = {
  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
  fontWeight: 500,
  lineHeight: 1.1,
  letterSpacing: '-0.015em',
  color: TEAL,
  margin: '0 0 64px 0',
}

const h3Style = {
  fontSize: 'clamp(1.35rem, 1.9vw, 1.6rem)',
  fontWeight: 500,
  lineHeight: 1.25,
  color: TEAL,
  margin: '0 0 12px',
}

const bodyText = { color: '#4a5552', fontSize: '16px', lineHeight: 1.7, margin: 0 }

function scrollToBooking(e) {
  e?.preventDefault()
  document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })
}

// Fyrkantig knapp med kantlinje, som på resten av sajten.
function CtaButton({ children, tone = 'light', solid = false }) {
  return (
    <a href="#kontakt" onClick={scrollToBooking} className={`font-body sp-cta sp-cta-${tone}${solid ? ' sp-cta-solid' : ''}`}>
      {children}
    </a>
  )
}

// ─── Sektioner ───

function Includes({ page, bg }) {
  const ref = useScrollAnimation()
  return (
    <section ref={ref} className="sp-section" style={{ background: bg }}>
      <p className="label animate" style={sectionLabel}>VAD INGÅR</p>
      <h2 className="font-heading animate-heading" style={h2Style}>{page.includesHeading}</h2>
      <div className="sp-includes">
        {page.includes.map(({ title, body, icon: Icon }, index) => (
          <div key={title} className="sp-include animate-stagger" style={{ '--stagger-index': index }}>
            {Icon && <Icon size={30} strokeWidth={1.1} color={TEAL} aria-hidden="true" style={{ display: 'block', marginBottom: '28px' }} />}
            <h3 className="font-heading" style={h3Style}>{title}</h3>
            <p className="font-body" style={bodyText}>{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Steps({ page, bg }) {
  const ref = useScrollAnimation()
  return (
    <section ref={ref} className="sp-section" style={{ background: bg }}>
      <p className="label animate" style={sectionLabel}>SÅ GÅR DET TILL</p>
      <h2 className="font-heading animate-heading" style={h2Style}>{page.stepsHeading}</h2>
      <ol className="sp-steps">
        {page.steps.map(({ title, body }, index) => (
          <li key={title} className="sp-step animate-stagger" style={{ '--stagger-index': index }}>
            <span className="font-heading sp-step-num" aria-hidden="true">0{index + 1}</span>
            <h3 className="font-heading" style={h3Style}>{title}</h3>
            <p className="font-body" style={bodyText}>{body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Why({ page, bg }) {
  const ref = useScrollAnimation()
  return (
    <section ref={ref} className="sp-section" style={{ background: bg }}>
      <div className="sp-why">
        <figure className="animate-scale" style={{ margin: 0 }}>
          <img
            src={profilbild}
            alt="Wilma Deleryd, grundare av STYR"
            style={{
              width: '100%',
              maxWidth: '400px',
              aspectRatio: '3/4',
              objectFit: 'cover',
              objectPosition: 'center 15%',
              borderRadius: '20px',
              display: 'block',
            }}
          />
          <figcaption className="font-body" style={{ marginTop: '14px', fontSize: '14px', color: '#5a6563' }}>
            Wilma Deleryd, grundare av STYR
          </figcaption>
        </figure>
        <div>
          <p className="label animate" style={sectionLabel}>VARFÖR STYR</p>
          <h2 className="font-heading animate-heading" style={{ ...h2Style, marginBottom: '28px' }}>
            {page.whyHeading}
          </h2>
          <div className="font-body animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px', transitionDelay: '0.15s' }}>
            {page.why.map(text => (
              <p key={text} style={{ color: '#2b3634', fontSize: '18px', lineHeight: 1.7, margin: 0 }}>{text}</p>
            ))}
          </div>
          <div className="animate-fade" style={{ marginTop: '44px', transitionDelay: '0.25s' }}>
            <CtaButton tone="dark">{page.cta}</CtaButton>
          </div>
        </div>
      </div>
    </section>
  )
}

function Case({ bg }) {
  const ref = useScrollAnimation()
  return (
    <section ref={ref} className="sp-section" style={{ background: bg }}>
      <p className="label animate" style={{ marginBottom: '40px' }}>EXEMPEL</p>
      <div className="sp-case">
        <div className="animate-scale" style={{ aspectRatio: '4/3', borderRadius: '12px', overflow: 'hidden' }}>
          <img
            src="/mila-case.png"
            alt="Mila Workspace – community-plattform"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '0% 8%', display: 'block' }}
          />
        </div>
        <div className="animate" style={{ transitionDelay: '0.15s' }}>
          <h2 className="font-heading" style={{ ...h2Style, fontSize: 'clamp(2rem, 3.5vw, 3rem)', margin: '0 0 20px' }}>
            Mila Workspace
          </h2>
          <p className="font-body" style={bodyText}>
            Ett coworking-space i Göteborg behövde en hel community-plattform för sina medlemmar, med inloggning, bokningar, nyhetsbrev och app-känsla på mobilen. På några veckor.
          </p>
          <Link
            to="/case/mila"
            className="font-body"
            style={{ display: 'inline-block', marginTop: '28px', color: TEAL, textDecoration: 'none', borderBottom: `1px solid ${TEAL}`, paddingBottom: '2px' }}
          >
            Se caset →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Sidan ───

export default function ServicePage({ page }) {
  const heroRef = useScrollAnimation()
  const formRef = useScrollAnimation()
  const [showSticky, setShowSticky] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const visibility = useRef({ hero: true, form: false })

  // Mobil: visa en fast boka-knapp när heron har scrollats förbi, dölj den vid bokningen.
  useEffect(() => {
    const hero = heroRef.current
    const form = formRef.current
    if (!hero || !form) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        visibility.current[entry.target === hero ? 'hero' : 'form'] = entry.isIntersecting
      })
      setShowSticky(!visibility.current.hero && !visibility.current.form)
    })
    observer.observe(hero)
    observer.observe(form)
    return () => observer.disconnect()
  }, [heroRef, formRef])

  const url = `${BASE}${page.path}`

  // Sektionerna mellan hero och bokning växlar mellan beige och mörkare beige.
  const sections = [Includes, Steps, Why, page.showCase && Case].filter(Boolean)

  return (
    <>
      <style>{`
        .sp-section { padding: 120px 8%; }
        .sp-includes { display: grid; grid-template-columns: 1fr 1fr; gap: 0 96px; }
        .sp-include { border-top: 1px solid ${LINE}; padding: 40px 0 56px; }
        .sp-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 64px; list-style: none; margin: 0; padding: 0; }
        .sp-step { border-top: 1px solid ${LINE}; padding-top: 32px; }
        .sp-step-num {
          display: block; font-size: clamp(2.6rem, 4vw, 3.6rem); font-weight: 400; line-height: 1;
          color: ${TEAL}; margin-bottom: 32px; letter-spacing: -0.02em;
        }
        .sp-why { display: grid; grid-template-columns: 1fr 1.3fr; gap: 96px; align-items: center; }
        .sp-case { display: grid; grid-template-columns: 55fr 45fr; gap: 72px; align-items: center; }
        .sp-form { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 80px; align-items: start; }

        .sp-cta {
          display: inline-block; padding: 16px 32px; border-radius: 0;
          font-size: 0.8rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none;
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .sp-cta-light { color: #ffffff; border: 1px solid rgba(255,255,255,0.7); }
        .sp-cta-light:hover { background: #ffffff; color: ${TEAL}; border-color: #ffffff; }
        .sp-cta-dark { color: ${TEAL}; border: 1px solid ${TEAL}; }
        .sp-cta-dark:hover { background: ${TEAL}; color: ${CREAM}; }
        .sp-cta-solid { background: ${TEAL}; color: ${CREAM}; border-color: ${TEAL}; }
        .sp-cta:focus-visible { outline: 2px solid #99d2d2; outline-offset: 3px; }
        .sp-link {
          background: none; border: none; padding: 0; cursor: pointer; font: inherit; color: #ffffff;
          text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 1px;
        }

        .sp-sticky {
          display: none; position: fixed; left: 12px; right: 12px; bottom: 12px; z-index: 40;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        @media (max-width: 1024px) {
          .sp-includes { gap: 0 56px; }
          .sp-steps { gap: 40px; }
        }
        @media (max-width: 768px) {
          .sp-section { padding: 72px 6%; }
          .sp-hero { padding-top: 128px !important; padding-bottom: 80px !important; min-height: auto !important; }
          .sp-includes, .sp-steps, .sp-why, .sp-case, .sp-form { grid-template-columns: 1fr; gap: 0; }
          .sp-why, .sp-case, .sp-form { gap: 40px; }
          .sp-include { padding: 32px 0 40px; }
          .sp-step { padding: 28px 0 36px; }
          .sp-step-num { margin-bottom: 20px; }
          .sp-why figure img { max-width: 280px !important; }
          .sp-hero-cta .sp-cta { display: block; text-align: center; }
          .sp-sticky { display: block; }
          .sp-sticky .sp-cta { display: block; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.22); }
          .sp-sticky[data-visible="false"] { transform: translateY(140%); opacity: 0; pointer-events: none; }
        }
      `}</style>

      <Helmet>
        <title>{page.meta.title}</title>
        <meta name="description" content={page.meta.description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.meta.title} />
        <meta property="og:description" content={page.meta.description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.meta.title} />
        <meta name="twitter:description" content={page.meta.description} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      {/* Hero – samma havstextur som startsidan */}
      <section
        ref={heroRef}
        className="sp-section sp-hero"
        style={{
          minHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingTop: '160px',
          paddingBottom: '104px',
          backgroundColor: TEAL,
          backgroundImage: 'linear-gradient(to right, rgba(0,30,30,0.72) 0%, rgba(0,30,30,0.45) 60%, rgba(0,30,30,0.3) 100%), url(/hero-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <p className="label hero-animate hero-d0" style={{ color: 'rgba(255,255,255,0.75)', ...sectionLabel }}>
          {page.label}
        </p>
        <h1
          className="font-heading hero-animate hero-d1"
          style={{
            fontSize: 'clamp(2.6rem, 6vw, 5.2rem)',
            fontWeight: 500,
            color: '#ffffff',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            maxWidth: '980px',
            margin: '0 0 28px 0',
          }}
        >
          {page.heading}
        </h1>
        <p
          className="font-body hero-animate hero-d2"
          style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(17px, 1.4vw, 19px)', lineHeight: 1.65, maxWidth: '620px', margin: '0 0 44px 0' }}
        >
          {page.intro}
        </p>
        <div className="hero-animate hero-d3 sp-hero-cta">
          <CtaButton>{page.cta}</CtaButton>
          <p className="font-body" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', margin: '18px 0 0' }}>
            {page.ctaNote}
          </p>
        </div>
      </section>

      {sections.map((Section, index) => (
        <Section key={index} page={page} bg={index % 2 === 0 ? CREAM : SAND} />
      ))}

      {/* Bokning */}
      <section id="kontakt" ref={formRef} className="sp-section" style={{ background: TEAL, scrollMarginTop: '64px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="sp-form">
          <div>
            <span aria-hidden="true" className="animate" style={{ display: 'block', width: '40px', height: '2px', background: PINK, marginBottom: '28px' }} />
            <h2 className="font-heading animate-heading" style={{ ...h2Style, color: '#ffffff', marginBottom: '24px' }}>
              {page.formHeading}
            </h2>
            <p className="font-body animate-fade" style={{ color: 'rgba(255,255,255,0.82)', fontSize: '18px', lineHeight: 1.7, margin: '0 0 44px', transitionDelay: '0.15s' }}>
              {page.formIntro}
            </p>
            <div className="animate-fade" style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.14)', transitionDelay: '0.25s' }}>
              <img
                src={profilbild}
                alt=""
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 12%', flexShrink: 0 }}
              />
              <div className="font-body" style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '15px' }}>
                <span style={{ color: '#ffffff', fontWeight: 500 }}>Wilma Deleryd</span>
                <a href="mailto:wilma@styrmedia.se" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>wilma@styrmedia.se</a>
                <a href="tel:0702277506" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>070-227 75 06</a>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: '8px' }}>
            <div style={{ background: '#ffffff', borderRadius: '20px', padding: '12px' }}>
              <CalBooking tjanst={page.tjanst} />
            </div>
            <p className="font-body" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', margin: '24px 0 0', textAlign: 'center' }}>
              {showForm ? 'Lämna era uppgifter så hör jag av mig.' : 'Vill ni hellre bli kontaktade? '}
              {!showForm && (
                <button type="button" className="sp-link" onClick={() => setShowForm(true)} aria-expanded={showForm}>
                  Lämna era uppgifter
                </button>
              )}
            </p>
            {showForm && (
              <div style={{ marginTop: '32px' }}>
                <ContactForm defaultTjanst={page.tjanst} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fast boka-knapp på mobil */}
      <div className="sp-sticky" data-visible={showSticky} inert={!showSticky}>
        <CtaButton tone="dark" solid>{page.cta}</CtaButton>
      </div>
    </>
  )
}
