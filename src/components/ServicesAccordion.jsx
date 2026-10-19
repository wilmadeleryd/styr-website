import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export const services = [
  {
    num: '01',
    title: 'Plattformar, verktyg & produkter',
    to: '/digitala-verktyg',
    body: 'Vi bygger digitala lösningar skräddarsydda för er verksamhet. Det kan vara en intern plattform för ert team, ett verktyg som löser ett specifikt problem, eller en digital produkt ni vill sälja vidare till era kunder.',
    tags: ['AI-verktyg', 'Integrationer', 'Kundportaler', 'Bokningssystem', 'Interna verktyg', 'CRM', 'Community-plattformar'],
  },
  {
    num: '02',
    title: 'Hemsidor',
    to: '/hemsidor',
    body: 'Vi bygger hemsidor som ser bra ut och driver affärer. Varje sajt är mobilanpassad och byggd för att synas, med SEO-optimering för Google och AI-optimering så att ni även hittas när kunder söker via ChatGPT, Claude, Gemini och Perplexity. Så att rätt personer hittar er, förstår vad ni gör och tar kontakt.',
    tags: ['SEO-optimering', 'AI-optimering', 'Landningssidor', 'Företagswebbar', 'E-handel', 'Bokningsflöden', 'Portfolios'],
  },
  {
    num: '03',
    title: 'Annonsering',
    to: '/annonsering',
    body: 'Vi hjälper er att nå rätt kunder med digital marknadsföring som ger resultat. Vi planerar, bygger och optimerar annonskampanjer på Google, Meta och TikTok, och följer upp löpande så att varje krona i annonsbudgeten gör nytta.',
    tags: ['Google Ads', 'Meta-annonsering', 'TikTok-annonsering', 'Kampanjstrategi', 'Annonsmaterial', 'Uppföljning'],
  },
]

export function ServicesAccordion() {
  const [openIndex, setOpenIndex] = useState(null)
  const accordionRef = useScrollAnimation()

  return (
    <div ref={accordionRef}>
      {services.map(({ num, title, to, body, tags }, index) => (
        <div
          key={num}
          className="animate-stagger"
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
          style={{
            '--stagger-index': index,
            borderTop: '1px solid rgba(255,255,255,0.2)',
            borderBottom: index === services.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none',
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr 32px',
              alignItems: 'center',
              gap: '24px',
              padding: '32px 0',
            }}
          >
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em' }}>
              {num}
            </span>
            <span className="font-heading" style={{ fontSize: '24px', color: '#ffffff', fontWeight: 500 }}>
              {title}
            </span>
            <span
              className={`accordion-icon${openIndex === index ? ' open' : ''}`}
              style={{ fontSize: '24px', color: '#ffffff', lineHeight: 1, textAlign: 'right', display: 'block' }}
            >
              +
            </span>
          </div>

          <div className={`accordion-content${openIndex === index ? ' open' : ''}`}>
            <div className="accordion-content-inner">
              <p
                className="font-body"
                style={{
                  fontSize: '17px',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.7,
                  maxWidth: '700px',
                  paddingLeft: '64px',
                }}
              >
                {body}
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  paddingLeft: '64px',
                  marginTop: '40px',
                }}
              >
                {tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: 400,
                      letterSpacing: '0.06em',
                      color: 'rgba(153,210,210,0.85)',
                      border: '1px solid rgba(153,210,210,0.35)',
                      borderRadius: '4px',
                      padding: '4px 10px',
                      background: 'transparent',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{ paddingLeft: '64px', marginTop: '32px' }}>
                <Link
                  to={to}
                  onClick={e => e.stopPropagation()}
                  className="font-body"
                  style={{ color: '#ffffff', fontSize: '1rem', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.5)', paddingBottom: '2px' }}
                >
                  Läs mer →
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
