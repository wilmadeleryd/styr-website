import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, Plus, Sparkles } from 'lucide-react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ContactForm from './ContactForm'
import profilbild from '../assets/Profilbild-Wilma-Deleryd.jpg'

const BASE = 'https://styrmedia.se'
const OG_IMAGE = `${BASE}/styr-og-image.jpg?v=2`

const CREAM = '#f5f0e8'
const WHITE = '#ffffff'
const TEAL = '#004444'

const sectionLabel = { marginBottom: '20px' }

const h2Style = {
  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
  fontWeight: 600,
  lineHeight: 1.12,
  color: TEAL,
  margin: '0 0 48px 0',
}

const bodyText = { color: '#3a3a3a', fontSize: '16px', lineHeight: 1.7, margin: 0 }

function scrollToForm(e) {
  e?.preventDefault()
  document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })
}

function CtaButton({ children, variant = 'light' }) {
  const light = variant === 'light'
  return (
    <a
      href="#kontakt"
      onClick={scrollToForm}
      className="font-body sp-cta"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        background: light ? CREAM : TEAL,
        color: light ? TEAL : CREAM,
        padding: '18px 32px',
        fontSize: '0.85rem',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        textDecoration: 'none',
      }}
    >
      {children}
      <ArrowRight size={16} strokeWidth={2} aria-hidden="true" className="sp-cta-arrow" />
    </a>
  )
}

// ─── Sektioner ───

function Problems({ page, bg }) {
  const ref = useScrollAnimation()
  return (
    <section ref={ref} className="sp-section" style={{ background: bg }}>
      <div className="sp-split">
        <div>
          <p className="label animate" style={sectionLabel}>KÄNNS DET IGEN?</p>
          <h2 className="font-heading animate-heading" style={{ ...h2Style, marginBottom: '24px' }}>
            {page.problemsHeading}
          </h2>
        </div>
        <div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {page.problems.map((text, index) => (
              <li
                key={text}
                className="animate-stagger font-heading"
                style={{
                  '--stagger-index': index,
                  borderTop: '1px solid rgba(0,68,68,0.15)',
                  padding: '26px 0',
                  fontSize: 'clamp(1.2rem, 2vw, 1.45rem)',
                  lineHeight: 1.4,
                  color: '#1f2a2a',
                }}
              >
                ”{text}”
              </li>
            ))}
          </ul>
          <p
            className="font-body animate-fade"
            style={{ borderTop: '1px solid rgba(0,68,68,0.15)', paddingTop: '28px', margin: 0, fontSize: '18px', lineHeight: 1.7, color: TEAL, fontWeight: 500 }}
          >
            {page.problemsAnswer}
          </p>
        </div>
      </div>
    </section>
  )
}

function Includes({ page, bg }) {
  const ref = useScrollAnimation()
  const cardBg = bg === WHITE ? CREAM : WHITE
  return (
    <section ref={ref} className="sp-section" style={{ background: bg }}>
      <p className="label animate" style={sectionLabel}>VAD INGÅR</p>
      <h2 className="font-heading animate-heading" style={{ ...h2Style, marginBottom: page.includesIntro ? '20px' : '48px' }}>
        {page.includesHeading}
      </h2>
      {page.includesIntro && (
        <p className="font-body animate-fade" style={{ ...bodyText, fontSize: '18px', maxWidth: '640px', margin: '0 0 48px', transitionDelay: '0.1s' }}>
          {page.includesIntro}
        </p>
      )}
      <div className="sp-includes">
        {page.includes.map(({ title, body, icon: Icon, ai }, index) => (
          <div
            key={title}
            className="animate-stagger sp-include"
            style={{ '--stagger-index': index, background: cardBg }}
          >
            {Icon && (
              <span className="sp-include-icon" aria-hidden="true">
                <Icon size={22} strokeWidth={1.75} />
              </span>
            )}
            <h3 className="font-heading" style={{ fontSize: '1.45rem', fontWeight: 500, color: TEAL, lineHeight: 1.25, margin: '0 0 12px' }}>
              {title}
            </h3>
            <p className="font-body" style={{ ...bodyText, marginBottom: ai ? '24px' : 0 }}>{body}</p>
            {ai && (
              <p className="font-body sp-ai">
                <Sparkles size={15} strokeWidth={1.75} aria-hidden="true" />
                <span><strong>Med AI:</strong> {ai}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function Steps({ page, bg }) {
  const ref = useScrollAnimation()
  const cardBg = bg === WHITE ? CREAM : WHITE
  return (
    <section ref={ref} className="sp-section" style={{ background: bg }}>
      <p className="label animate" style={sectionLabel}>SÅ GÅR DET TILL</p>
      <h2 className="font-heading animate-heading" style={h2Style}>{page.stepsHeading}</h2>
      <ol className="sp-steps">
        {page.steps.map(({ title, body }, index) => (
          <li key={title} className="sp-step animate-stagger" style={{ '--stagger-index': index }}>
            <div className="sp-step-head" aria-hidden="true">
              <span className="sp-step-num">{index + 1}</span>
              <span className="sp-step-line" />
            </div>
            <div className="sp-step-card" style={{ background: cardBg }}>
              <h3 className="font-heading" style={{ fontSize: '1.5rem', fontWeight: 500, color: TEAL, lineHeight: 1.25, margin: '0 0 12px' }}>
                {title}
              </h3>
              <p className="font-body" style={bodyText}>{body}</p>
            </div>
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
              aspectRatio: '4/5',
              objectFit: 'cover',
              objectPosition: 'center 15%',
              borderRadius: '20px',
              display: 'block',
            }}
          />
          <figcaption className="font-body" style={{ marginTop: '14px', fontSize: '14px', color: '#555555' }}>
            <span style={{ color: '#111111', fontWeight: 500 }}>Wilma Deleryd</span> · Grundare av STYR
          </figcaption>
        </figure>
        <div>
          <p className="label animate" style={sectionLabel}>VARFÖR STYR</p>
          <h2 className="font-heading animate-heading" style={{ ...h2Style, marginBottom: '28px' }}>
            {page.whyHeading}
          </h2>
          <div className="font-body animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '20px', transitionDelay: '0.15s' }}>
            {page.why.map(text => (
              <p key={text} style={{ color: '#111111', fontSize: '18px', lineHeight: 1.7, margin: 0 }}>{text}</p>
            ))}
          </div>
          <div className="animate-fade" style={{ marginTop: '40px', transitionDelay: '0.25s' }}>
            <CtaButton variant="dark">{page.cta}</CtaButton>
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
        <div className="animate-scale" style={{ aspectRatio: '4/3', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <img
            src="/mila-case.png"
            alt="Mila Workspace – community-plattform"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '0% 8%', display: 'block' }}
          />
        </div>
        <div className="animate" style={{ transitionDelay: '0.15s' }}>
          <h2 className="font-heading" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 600, color: '#111111', margin: '0 0 20px' }}>
            Mila Workspace
          </h2>
          <p className="font-body" style={{ ...bodyText, color: '#555555' }}>
            Ett coworking-space i Göteborg behövde en hel community-plattform för sina medlemmar, med inloggning, bokningar, nyhetsbrev och app-känsla på mobilen. På några veckor.
          </p>
          <Link
            to="/case/mila"
            className="font-body"
            style={{ display: 'inline-block', marginTop: '24px', color: '#006666', textDecoration: 'none', borderBottom: '1px solid #006666', paddingBottom: '2px' }}
          >
            Se caset →
          </Link>
        </div>
      </div>
    </section>
  )
}

function Faq({ page, bg }) {
  const ref = useScrollAnimation()
  return (
    <section ref={ref} className="sp-section" style={{ background: bg }}>
      <div className="sp-split">
        <div>
          <p className="label animate" style={sectionLabel}>VANLIGA FRÅGOR</p>
          <h2 className="font-heading animate-heading" style={{ ...h2Style, marginBottom: '24px' }}>
            Bra att veta.
          </h2>
        </div>
        <div className="animate-fade">
          {page.faq.map(({ q, a }) => (
            <details key={q} className="sp-faq">
              <summary>
                <span className="font-heading">{q}</span>
                <Plus size={22} strokeWidth={1.5} aria-hidden="true" className="sp-faq-icon" />
              </summary>
              <p className="font-body" style={{ ...bodyText, padding: '0 48px 28px 0' }}>{a}</p>
            </details>
          ))}
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
  const visibility = useRef({ hero: true, form: false })

  // Mobil: visa en fast boka-knapp när heron har scrollats förbi, dölj den vid formuläret.
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

  // Sektionerna mellan hero och formulär växlar bakgrund automatiskt.
  const sections = [
    page.problems && Problems,
    Includes,
    Steps,
    Why,
    page.showCase && Case,
    page.faq && Faq,
  ].filter(Boolean)

  return (
    <>
      <style>{`
        .sp-section { padding: 112px 8%; }
        .sp-split { display: grid; grid-template-columns: 1fr 1.3fr; gap: 80px; align-items: start; }
        .sp-includes { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .sp-include { border-radius: 16px; padding: 36px; }
        .sp-include-icon {
          display: inline-flex; align-items: center; justify-content: center;
          width: 48px; height: 48px; border-radius: 12px; margin-bottom: 24px;
          background: ${TEAL}; color: ${CREAM};
        }
        .sp-include { display: flex; flex-direction: column; }
        .sp-ai {
          display: flex; gap: 10px; align-items: flex-start;
          margin: auto 0 0; padding-top: 18px; border-top: 1px solid rgba(0,68,68,0.12);
          font-size: 14px; line-height: 1.55; color: #006666;
        }
        .sp-ai svg { flex-shrink: 0; margin-top: 3px; }
        .sp-ai strong { font-weight: 600; color: ${TEAL}; }
        .sp-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; list-style: none; margin: 0; padding: 0; }
        .sp-step-head { display: flex; align-items: center; gap: 20px; margin-bottom: 32px; }
        .sp-step-num {
          width: 64px; height: 64px; flex-shrink: 0; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: ${TEAL}; color: ${CREAM};
          font-family: "Playfair Display", Georgia, serif; font-size: 1.5rem; font-weight: 500;
        }
        .sp-step-line { flex: 1; height: 1px; margin-right: -48px; background: linear-gradient(to right, rgba(0,68,68,0.35), rgba(0,68,68,0.08)); }
        .sp-step:last-child .sp-step-line { display: none; }
        .sp-step { display: flex; flex-direction: column; }
        .sp-step-card { border-radius: 16px; padding: 32px; flex: 1; }
        .sp-why { display: grid; grid-template-columns: 1fr 1.3fr; gap: 80px; align-items: center; }
        .sp-case { display: grid; grid-template-columns: 55fr 45fr; gap: 64px; align-items: center; }
        .sp-form { display: grid; grid-template-columns: 42% 1fr; gap: 80px; align-items: start; }

        .sp-cta { transition: opacity 0.15s ease; }
        .sp-cta:hover { opacity: 0.88; }
        .sp-cta-arrow { transition: transform 0.2s ease; }
        .sp-cta:hover .sp-cta-arrow { transform: translateX(4px); }
        .sp-cta:focus-visible, .sp-faq summary:focus-visible { outline: 2px solid #99d2d2; outline-offset: 3px; }

        .sp-faq { border-top: 1px solid rgba(0,68,68,0.15); }
        .sp-faq:last-child { border-bottom: 1px solid rgba(0,68,68,0.15); }
        .sp-faq summary {
          list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 24px;
          padding: 26px 0; font-size: clamp(1.15rem, 1.8vw, 1.35rem); color: ${TEAL}; line-height: 1.35;
        }
        .sp-faq summary::-webkit-details-marker { display: none; }
        .sp-faq-icon { flex-shrink: 0; color: ${TEAL}; transition: transform 0.3s ease; }
        .sp-faq[open] .sp-faq-icon { transform: rotate(45deg); }

        .sp-sticky {
          display: none; position: fixed; left: 12px; right: 12px; bottom: 12px; z-index: 40;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .sp-sticky a { width: 100%; justify-content: center; box-shadow: 0 8px 24px rgba(0,0,0,0.22); }

        @media (max-width: 1024px) {
          .sp-steps { gap: 24px; }
          .sp-step-line { margin-right: -24px; }
          .sp-step-card { padding: 24px; }
          .sp-include { padding: 28px; }
        }
        @media (max-width: 768px) {
          .sp-section { padding: 72px 6%; }
          .sp-hero { padding-top: 128px !important; padding-bottom: 80px !important; min-height: auto !important; }
          .sp-split, .sp-includes, .sp-steps, .sp-why, .sp-case, .sp-form { grid-template-columns: 1fr; gap: 32px; }
          .sp-split { gap: 8px; }
          .sp-includes { gap: 12px; }
          .sp-include { padding: 24px; }
          .sp-steps { gap: 24px; }
          .sp-step { position: relative; padding-left: 76px; }
          .sp-step-head { position: absolute; left: 0; top: 0; margin: 0; }
          .sp-step-num { width: 56px; height: 56px; font-size: 1.3rem; }
          .sp-step-line { display: none; }
          .sp-step:not(:last-child)::before {
            content: ''; position: absolute; left: 27px; top: 64px; bottom: -16px; width: 1px;
            background: rgba(0,68,68,0.2);
          }
          .sp-step-card { padding: 24px; }
          .sp-why figure img { max-width: 260px !important; }
          .sp-hero-cta a { width: 100%; justify-content: center; }
          .sp-hero-cta a, .sp-sticky a { letter-spacing: 0.03em; padding: 18px 16px !important; font-size: 0.8rem !important; }
          .sp-sticky { display: block; }
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

      {/* Hero – samma textur som startsidan */}
      <section
        ref={heroRef}
        className="sp-section sp-hero"
        style={{
          position: 'relative',
          minHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingTop: '160px',
          paddingBottom: '96px',
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
            fontSize: 'clamp(2.6rem, 6.4vw, 5.5rem)',
            fontWeight: 600,
            color: '#ffffff',
            lineHeight: 1.04,
            letterSpacing: '-0.01em',
            maxWidth: '980px',
            margin: '0 0 28px 0',
          }}
        >
          {page.heading}
        </h1>
        <p
          className="font-body hero-animate hero-d2"
          style={{ color: 'rgba(255,255,255,0.88)', fontSize: 'clamp(17px, 1.5vw, 20px)', lineHeight: 1.65, maxWidth: '620px', margin: '0 0 40px 0' }}
        >
          {page.intro}
        </p>
        <div className="hero-animate hero-d3 sp-hero-cta">
          <CtaButton>{page.cta}</CtaButton>
          <p className="font-body" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', margin: '16px 0 0' }}>
            {page.ctaNote}
          </p>
        </div>
      </section>

      {sections.map((Section, index) => (
        <Section key={index} page={page} bg={index % 2 === 0 ? CREAM : WHITE} />
      ))}

      {/* Formulär */}
      <section id="kontakt" ref={formRef} className="sp-section" style={{ background: TEAL, scrollMarginTop: '64px' }}>
        <div className="sp-form">
          <div>
            <p className="label animate" style={{ color: 'rgba(153,210,210,0.85)', ...sectionLabel }}>KONTAKT</p>
            <h2 className="font-heading animate-heading" style={{ ...h2Style, color: '#ffffff', marginBottom: '24px' }}>
              {page.formHeading}
            </h2>
            <p className="font-body animate-fade" style={{ color: 'rgba(255,255,255,0.82)', fontSize: '18px', lineHeight: 1.7, margin: '0 0 40px', transitionDelay: '0.15s' }}>
              {page.formIntro}
            </p>
            <div className="animate-fade" style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '28px', borderTop: '1px solid rgba(153,210,210,0.2)', transitionDelay: '0.25s' }}>
              <img
                src={profilbild}
                alt=""
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 12%', flexShrink: 0 }}
              />
              <div className="font-body" style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '15px' }}>
                <span style={{ color: '#ffffff', fontWeight: 500 }}>Wilma Deleryd</span>
                <a href="mailto:wilma@styrmedia.se" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>wilma@styrmedia.se</a>
                <a href="tel:0702277506" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>070-227 75 06</a>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: '8px' }}>
            <ContactForm defaultTjanst={page.tjanst} />
          </div>
        </div>
      </section>

      {/* Fast boka-knapp på mobil */}
      <div className="sp-sticky" data-visible={showSticky} inert={!showSticky}>
        <CtaButton variant="dark">{page.cta}</CtaButton>
      </div>
    </>
  )
}
