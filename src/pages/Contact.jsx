import { Helmet } from 'react-helmet-async'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import ContactForm from '../components/ContactForm'
import profilbild from '../assets/Profilbild-Wilma-Deleryd.jpg'

export default function Contact() {
  const leftRef = useScrollAnimation()

  return (
    <>
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 42% 1fr;
          gap: 80px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 56px;
          }
        }
      `}</style>

      <Helmet>
        <title>Kontakt | STYR</title>
        <meta name="description" content="Hör av er så pratar vi om vad ni behöver. Vi skräddarsyr varje projekt efter er verksamhet." />
        <link rel="canonical" href="https://styrmedia.se/kontakt" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kontakt | STYR" />
        <meta property="og:description" content="Hör av er så pratar vi om vad ni behöver. Vi skräddarsyr varje projekt efter er verksamhet." />
        <meta property="og:url" content="https://styrmedia.se/kontakt" />
        <meta property="og:image" content="https://styrmedia.se/styr-og-image.jpg?v=2" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kontakt | STYR" />
        <meta name="twitter:description" content="Hör av er så pratar vi om vad ni behöver. Vi skräddarsyr varje projekt efter er verksamhet." />
        <meta name="twitter:image" content="https://styrmedia.se/styr-og-image.jpg?v=2" />
      </Helmet>

      <div style={{ background: '#004444', minHeight: '100vh' }}>
        <section
          className="contact-grid"
          style={{ paddingTop: '120px', paddingBottom: '100px', paddingLeft: '8%', paddingRight: '8%' }}
        >
          {/* Vänster: rubrik + intro */}
          <div ref={leftRef}>
            <p
              className="label animate"
              style={{ color: 'rgba(153,210,210,0.8)', marginBottom: '32px' }}
            >
              KONTAKT
            </p>
            <h1
              className="font-heading animate-heading"
              style={{
                fontSize: 'clamp(52px, 8vw, 120px)',
                fontWeight: 600,
                color: '#ffffff',
                lineHeight: 1,
                margin: '0 0 32px 0',
              }}
            >
              Kontakt.
            </h1>
            <p
              className="font-body animate-fade"
              style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', lineHeight: 1.7, maxWidth: '440px', margin: 0, transitionDelay: '0.2s' }}
            >
              Berätta vad ni behöver hjälp med, så hör jag av mig. Det första samtalet är alltid kostnadsfritt.
            </p>
            <div
              className="animate-fade"
              style={{
                marginTop: '48px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(153,210,210,0.2)',
                transitionDelay: '0.35s',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <img
                src={profilbild}
                alt="Wilma Deleryd"
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  objectPosition: 'center 10%',
                  borderRadius: '8px',
                  flexShrink: 0,
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '8px' }}>
                <span className="font-body" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', fontWeight: 500 }}>
                  Wilma Deleryd
                </span>
                <a
                  href="mailto:wilma@styrmedia.se"
                  className="font-body"
                  style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'white' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
                >
                  wilma@styrmedia.se
                </a>
                <a
                  href="tel:0702277506"
                  className="font-body"
                  style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'white' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
                >
                  070-227 75 06
                </a>
              </div>
            </div>
          </div>

          {/* Höger: formulär */}
          <div style={{ paddingTop: '8px' }}>
            <ContactForm />
          </div>
        </section>
      </div>
    </>
  )
}
