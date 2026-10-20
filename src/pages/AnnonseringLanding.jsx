import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import CalBooking from '../components/CalBooking'
import ContactForm from '../components/ContactForm'
import profilbild from '../assets/Profilbild-Wilma-Deleryd.jpg'

// Landningssida för Meta-annonserna ("Fler kunder. Mindre krångel.").
// Samma gröna som startsidan. Rosa (från annonserna) används bara på tre ställen:
// andra raden i rubriken, boka-knapparna och strecket ovanför bokningsrubriken.

const URL = 'https://styrmedia.se/annonsering'
const TITLE = 'Annonsering på Google och Meta | STYR'
const DESCRIPTION = 'Fler kunder. Mindre krångel. Vi sköter er annonsering på Google och Meta. Boka ett gratis möte på 30 minuter.'
const OG_IMAGE = 'https://styrmedia.se/styr-og-image.jpg?v=2'

const GREEN = '#004444'
const CREAM = '#f5f0e8'
const SAND = '#ede6da' // lite mörkare beige för bokningsdelen
const PINK = '#fdc6be'

const benefits = [
  {
    title: 'Strategi före budget.',
    body: 'Vi analyserar er marknad, målgrupp och konkurrenter och bygger en plan innan första annonsen går live.',
  },
  {
    title: 'Annonser som säljer.',
    body: 'Anpassade för varje kanal och format, skapade för att stoppa scrollen och driva handling.',
  },
  {
    title: 'Resultat ni kan mäta.',
    body: 'Full spårning från klick till förfrågan, med löpande optimering och tydlig rapportering.',
  },
]

function scrollToBooking(e) {
  e?.preventDefault()
  document.getElementById('boka')?.scrollIntoView({ behavior: 'smooth' })
}

function BookButton({ className = '' }) {
  return (
    <a href="#boka" onClick={scrollToBooking} className={`al-cta font-body ${className}`}>
      Boka ett gratis möte
    </a>
  )
}

export default function AnnonseringLanding() {
  const heroRef = useScrollAnimation()
  const benefitsRef = useScrollAnimation()
  const bookingRef = useScrollAnimation()
  const [showForm, setShowForm] = useState(false)
  const [showSticky, setShowSticky] = useState(false)
  const visibility = useRef({ hero: true, booking: false })

  // Mobil: fast boka-knapp efter heron, dold när bokningen syns.
  useEffect(() => {
    const hero = heroRef.current
    const booking = bookingRef.current
    if (!hero || !booking) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        visibility.current[entry.target === hero ? 'hero' : 'booking'] = entry.isIntersecting
      })
      setShowSticky(!visibility.current.hero && !visibility.current.booking)
    })
    observer.observe(hero)
    observer.observe(booking)
    return () => observer.disconnect()
  }, [heroRef, bookingRef])

  return (
    <>
      <style>{`
        .al-wrap { padding-left: 8%; padding-right: 8%; }
        .al-cta {
          display: inline-block; background: transparent; color: ${PINK};
          border: 1px solid ${PINK}; border-radius: 0; padding: 16px 32px;
          font-size: 0.8rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .al-cta:hover { background: ${PINK}; color: ${GREEN}; }
        .al-cta:focus-visible { outline: 2px solid #ffffff; outline-offset: 3px; }

        .al-hero {
          background: ${GREEN}; color: #ffffff; min-height: 92vh;
          display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 64px; align-items: center;
          padding-top: 128px; padding-bottom: 96px;
        }
        .al-h1 {
          font-family: "Playfair Display", Georgia, serif; font-weight: 500;
          font-size: clamp(2.8rem, 5.6vw, 5.6rem); line-height: 1.04; letter-spacing: -0.02em; margin: 0 0 32px;
        }
        .al-h1 em { display: block; font-style: italic; color: ${PINK}; }
        .al-portrait {
          width: 100%; max-width: 420px; aspect-ratio: 3 / 4; border-radius: 20px;
          object-fit: cover; object-position: center 15%; display: block;
        }
        .al-avatar { display: none; }

        .al-benefits { display: grid; grid-template-columns: repeat(3, 1fr); gap: 56px; }
        .al-benefit { border-top: 1px solid rgba(2,49,40,0.18); padding-top: 28px; }

        .al-booking { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 72px; align-items: start; }
        .al-cal-card { background: #ffffff; border-radius: 20px; padding: 12px; box-shadow: 0 1px 2px rgba(2,49,40,0.06), 0 20px 50px -24px rgba(2,49,40,0.25); }
        .al-link {
          background: none; border: none; padding: 0; cursor: pointer; font: inherit; color: ${GREEN};
          text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 1px;
        }


        .al-sticky { display: none; }

        @media (max-width: 900px) {
          .al-hero { grid-template-columns: 1fr; min-height: auto; padding-top: 120px; padding-bottom: 72px; gap: 0; }
          .al-figure { display: none !important; }
          .al-avatar { display: flex; }
          .al-benefits, .al-booking { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 768px) {
          .al-wrap { padding-left: 6%; padding-right: 6%; }
          .al-section { padding-top: 72px !important; padding-bottom: 72px !important; }
          .al-cal-card { padding: 4px; border-radius: 16px; }
          .al-hero .al-cta { display: block; text-align: center; }
          .al-sticky {
            display: block; position: fixed; left: 12px; right: 12px; bottom: 12px; z-index: 40;
            transition: transform 0.3s ease, opacity 0.3s ease;
          }
          .al-sticky .al-cta { display: block; text-align: center; background: ${GREEN}; box-shadow: 0 10px 30px rgba(0,0,0,0.25); }
          .al-sticky[data-visible="false"] { transform: translateY(140%); opacity: 0; pointer-events: none; }
        }
      `}</style>

      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      {/* Hero */}
      <section ref={heroRef} className="al-hero al-wrap">
        <div>
          <h1 className="al-h1 hero-animate hero-d0">
            Fler kunder.
            <em>Mindre krångel.</em>
          </h1>
          <p
            className="font-body hero-animate hero-d1"
            style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', lineHeight: 1.6, color: 'rgba(255,255,255,0.82)', maxWidth: '520px', margin: '0 0 44px' }}
          >
            Vi sköter er annonsering på Google och Meta, så kan ni fokusera på verksamheten.
          </p>
          <div className="hero-animate hero-d2">
            <BookButton />
            <p className="font-body" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', margin: '18px 0 0', letterSpacing: '0.01em' }}>
              30 minuter · Inga förpliktelser
            </p>
          </div>
          <div className="al-avatar hero-animate hero-d3" style={{ alignItems: 'center', gap: '14px', marginTop: '40px' }}>
            <img src={profilbild} alt="" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 12%' }} />
            <span className="font-body" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}>
              Wilma Deleryd, grundare av STYR
            </span>
          </div>
        </div>
        <figure className="al-figure hero-animate hero-d2" style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <img src={profilbild} alt="Wilma Deleryd, grundare av STYR" className="al-portrait" />
          <figcaption className="font-body" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '16px' }}>
            Wilma Deleryd, grundare av STYR
          </figcaption>
        </figure>
      </section>

      {/* Vad ni får */}
      <section ref={benefitsRef} className="al-wrap al-section" style={{ background: CREAM, paddingTop: '120px', paddingBottom: '120px' }}>
        <div className="al-benefits">
          {benefits.map(({ title, body }, index) => (
            <div key={title} className="al-benefit animate-stagger" style={{ '--stagger-index': index }}>
              <span className="font-heading" style={{ fontSize: '1rem', color: GREEN, opacity: 0.55 }}>
                0{index + 1}
              </span>
              <h2 className="font-heading" style={{ fontSize: 'clamp(1.45rem, 2.2vw, 1.85rem)', fontWeight: 500, lineHeight: 1.25, color: GREEN, margin: '18px 0 12px' }}>
                {title}
              </h2>
              <p className="font-body" style={{ fontSize: '16px', lineHeight: 1.65, color: '#4a5552', margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
        <p
          className="font-heading animate-fade"
          style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.45rem)', lineHeight: 1.5, color: GREEN, maxWidth: '760px', margin: '64px 0 0', transitionDelay: '0.3s' }}
        >
          Vi är er partner genom hela processen, från rådgivning och strategi till färdiga kampanjer och löpande optimering.
        </p>
      </section>

      {/* Boka */}
      <section
        id="boka"
        ref={bookingRef}
        className="al-wrap al-section"
        style={{ background: SAND, paddingTop: '120px', paddingBottom: '120px', scrollMarginTop: '40px' }}
      >
        <div className="al-booking">
          <div>
            <span aria-hidden="true" style={{ display: 'block', width: '40px', height: '2px', background: PINK, marginBottom: '28px' }} className="animate" />
            <h2 className="font-heading animate-heading" style={{ fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)', fontWeight: 500, lineHeight: 1.08, letterSpacing: '-0.015em', color: GREEN, margin: '0 0 40px' }}>
              Välj en tid som passar er.
            </h2>

            <div className="font-body animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '440px', transitionDelay: '0.15s' }}>
              <p style={{ fontSize: '18px', lineHeight: 1.7, color: '#2b3634', margin: 0 }}>
                Ett intromöte på 30 minuter där vi lär känna ert företag och ser hur vi kan hjälpa er att få fler kunder genom digital marknadsföring.
              </p>
              <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#5a6563', margin: 0 }}>
                Ingen förberedelse krävs från er sida.
              </p>
            </div>
          </div>

          <div className="animate-fade" style={{ transitionDelay: '0.1s' }}>
            <div className="al-cal-card">
              <CalBooking />
            </div>
            <p className="font-body" style={{ fontSize: '15px', color: '#3a4542', margin: '24px 0 0', textAlign: 'center' }}>
              {showForm ? 'Lämna era uppgifter så hör jag av mig.' : 'Vill ni hellre bli kontaktade? '}
              {!showForm && (
                <button type="button" className="al-link" onClick={() => setShowForm(true)} aria-expanded={showForm}>
                  Lämna era uppgifter
                </button>
              )}
            </p>
            {showForm && (
              <div style={{ background: GREEN, borderRadius: '20px', padding: 'clamp(28px, 4vw, 48px)', marginTop: '20px' }}>
                <ContactForm defaultTjanst="Annonsering" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fast boka-knapp på mobil */}
      <div className="al-sticky" data-visible={showSticky} inert={!showSticky}>
        <BookButton />
      </div>
    </>
  )
}
