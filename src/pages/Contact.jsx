import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const labelBase = {
  display: 'block',
  fontFamily: 'Inter, sans-serif',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: '10px',
}

function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} style={{ ...labelBase, color: error ? 'rgba(255,120,120,0.9)' : 'rgba(153,210,210,0.75)' }}>
        {label}
        {optional && (
          <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: '11px', opacity: 0.55, marginLeft: '6px' }}>
            (valfritt)
          </span>
        )}
        {error && (
          <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: '11px', marginLeft: '6px' }}>
            – obligatoriskt
          </span>
        )}
      </label>
      {children}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ namn: '', telefon: '', foretag: '', mail: '', meddelande: '' })
  const [errors, setErrors] = useState({ namn: false, telefon: false })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const leftRef = useScrollAnimation()
  const rightRef = useScrollAnimation()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {
      namn: !form.namn.trim(),
      telefon: !form.telefon.trim(),
    }
    if (newErrors.namn || newErrors.telefon) {
      setErrors(newErrors)
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const fieldBase = {
    display: 'block',
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(153,210,210,0.35)',
    paddingBottom: '14px',
    paddingTop: '8px',
    color: 'white',
    fontFamily: 'Inter, sans-serif',
    fontSize: '17px',
    fontWeight: 400,
    outline: 'none',
    transition: 'border-bottom-color 0.2s ease',
    borderRadius: 0,
  }

  const focusHandler = e => { e.target.style.borderBottomColor = 'rgba(255,255,255,0.85)' }
  const blurHandler = (error) => e => {
    e.target.style.borderBottomColor = error ? 'rgba(255,120,120,0.7)' : 'rgba(153,210,210,0.35)'
  }

  return (
    <>
      <style>{`
        .contact-field::placeholder {
          color: rgba(255,255,255,0.25);
          font-style: italic;
        }
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
        <title>Kontakt – STYR</title>
        <meta name="description" content="Ta kontakt med STYR. Lämna namn och telefonnummer så ringer vi upp er. Vi hjälper er med digitala verktyg, hemsidor och marknadsföring." />
        <link rel="canonical" href="https://styrmedia.se/kontakt" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Kontakt – STYR" />
        <meta property="og:description" content="Ta kontakt med STYR. Lämna namn och telefonnummer så ringer vi upp er." />
        <meta property="og:url" content="https://styrmedia.se/kontakt" />
        <meta property="og:image" content="https://styrmedia.se/hero-bg.jpg" />
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
                margin: '0 0 48px 0',
              }}
            >
              Kontakt.
            </h1>
            <div
              className="animate-fade"
              style={{
                marginTop: '64px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(153,210,210,0.2)',
                transitionDelay: '0.35s',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <a
                href="mailto:wilma@styrmedia.se"
                className="font-body"
                style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.15s ease' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
              >
                wilma@styrmedia.se
              </a>
              <a
                href="tel:0702277506"
                className="font-body"
                style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.15s ease' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
              >
                070-227 75 06
              </a>
            </div>
          </div>

          {/* Höger: formulär */}
          <div ref={rightRef} style={{ paddingTop: '8px' }}>
            {status === 'sent' ? (
              <div className="animate" style={{ paddingTop: '16px' }}>
                <p
                  className="font-heading"
                  style={{ fontSize: '32px', color: 'white', fontWeight: 500, lineHeight: 1.3 }}
                >
                  Tack för att ni hörde av er. Vi återkommer inom kort.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

                  <Field id="namn" label="Namn" error={errors.namn}>
                    <input
                      id="namn"
                      name="namn"
                      type="text"
                      value={form.namn}
                      onChange={handleChange}
                      autoComplete="name"
                      className="contact-field"
                      style={{
                        ...fieldBase,
                        borderBottomColor: errors.namn ? 'rgba(255,120,120,0.7)' : 'rgba(153,210,210,0.35)',
                      }}
                      onFocus={focusHandler}
                      onBlur={blurHandler(errors.namn)}
                    />
                  </Field>

                  <Field id="telefon" label="Telefon" error={errors.telefon}>
                    <input
                      id="telefon"
                      name="telefon"
                      type="tel"
                      value={form.telefon}
                      onChange={handleChange}
                      autoComplete="tel"
                      className="contact-field"
                      style={{
                        ...fieldBase,
                        borderBottomColor: errors.telefon ? 'rgba(255,120,120,0.7)' : 'rgba(153,210,210,0.35)',
                      }}
                      onFocus={focusHandler}
                      onBlur={blurHandler(errors.telefon)}
                    />
                  </Field>

                  <Field id="foretag" label="Företag" optional>
                    <input
                      id="foretag"
                      name="foretag"
                      type="text"
                      value={form.foretag}
                      onChange={handleChange}
                      autoComplete="organization"
                      className="contact-field"
                      style={fieldBase}
                      onFocus={focusHandler}
                      onBlur={blurHandler(false)}
                    />
                  </Field>

                  <Field id="mail" label="Mail" optional>
                    <input
                      id="mail"
                      name="mail"
                      type="email"
                      value={form.mail}
                      onChange={handleChange}
                      autoComplete="email"
                      className="contact-field"
                      style={fieldBase}
                      onFocus={focusHandler}
                      onBlur={blurHandler(false)}
                    />
                  </Field>

                  <Field id="meddelande" label="Meddelande" optional>
                    <textarea
                      id="meddelande"
                      name="meddelande"
                      value={form.meddelande}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Berätta kort vad ni behöver hjälp med, eller hoppa över om ni bara vill bli kontaktade."
                      className="contact-field"
                      style={{ ...fieldBase, resize: 'none' }}
                      onFocus={focusHandler}
                      onBlur={blurHandler(false)}
                    />
                  </Field>

                  {status === 'error' && (
                    <p
                      role="alert"
                      className="font-body"
                      style={{ color: 'rgba(255,150,150,0.9)', fontSize: '14px', lineHeight: 1.6 }}
                    >
                      Något gick fel. Prova igen eller maila direkt till{' '}
                      <a href="mailto:wilma@styrmedia.se" style={{ color: 'white', textDecoration: 'underline' }}>
                        wilma@styrmedia.se
                      </a>
                    </p>
                  )}

                  <div style={{ paddingTop: '8px' }}>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="font-body"
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: 0,
                        color: status === 'sending' ? 'rgba(255,255,255,0.45)' : 'white',
                        fontSize: '1rem',
                        borderBottom: '1px solid rgba(255,255,255,0.5)',
                        paddingBottom: '2px',
                        cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                        transition: 'opacity 0.15s ease',
                      }}
                      onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.opacity = '0.65' }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                    >
                      {status === 'sending' ? 'Skickar...' : 'Skicka →'}
                    </button>
                  </div>

                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
