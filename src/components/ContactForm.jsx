import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAttribution, markLeadPending } from '../lib/tracking'

const TJANSTER = ['Annonsering', 'Hemsida', 'Digitala verktyg', 'Annat']

const labelBase = {
  display: 'block',
  fontFamily: 'Inter, sans-serif',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: '10px',
}

const noteStyle = { fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: '11px', marginLeft: '6px' }

function Field({ id, label, note, error, children }) {
  return (
    <div>
      <label htmlFor={id} style={{ ...labelBase, color: error ? 'rgba(255,120,120,0.9)' : '#ffffff' }}>
        {label}
        {note && !error && <span style={{ ...noteStyle, opacity: 0.55 }}>({note})</span>}
        {error && <span style={noteStyle}>– {error}</span>}
      </label>
      {children}
    </div>
  )
}

const emptyForm = (tjanst) => ({ tjanst: tjanst || '', namn: '', telefon: '', mail: '', foretag: '', meddelande: '' })

export default function ContactForm({ defaultTjanst }) {
  const [form, setForm] = useState(() => emptyForm(defaultTjanst))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | error
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name] || ((name === 'telefon' || name === 'mail') && errors.kontakt)) {
      setErrors(prev => ({ ...prev, [name]: false, kontakt: false }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {
      namn: !form.namn.trim(),
      kontakt: !form.telefon.trim() && !form.mail.trim(),
    }
    if (newErrors.namn || newErrors.kontakt) {
      setErrors(newErrors)
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, sida: pathname, attribution: getAttribution() }),
      })
      if (!res.ok) {
        setStatus('error')
        return
      }
      markLeadPending(form.tjanst)
      navigate('/tack')
    } catch {
      setStatus('error')
    }
  }

  const fieldBase = {
    display: 'block',
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.35)',
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

  const borderFor = (error) => (error ? 'rgba(255,120,120,0.7)' : 'rgba(153,210,210,0.35)')
  const focusHandler = e => { e.target.style.borderBottomColor = 'rgba(255,255,255,0.85)' }
  const blurHandler = (error) => e => { e.target.style.borderBottomColor = borderFor(error) }

  const input = (name, type, autoComplete, error) => (
    <input
      id={name}
      name={name}
      type={type}
      value={form[name]}
      onChange={handleChange}
      autoComplete={autoComplete}
      className="contact-field"
      style={{ ...fieldBase, borderBottomColor: borderFor(error) }}
      onFocus={focusHandler}
      onBlur={blurHandler(error)}
    />
  )

  const sending = status === 'sending'

  return (
    <>
      <style>{`
        .contact-field::placeholder {
          color: rgba(255,255,255,0.45);
          font-style: italic;
        }
        .contact-field:-webkit-autofill,
        .contact-field:-webkit-autofill:hover,
        .contact-field:-webkit-autofill:focus {
          -webkit-text-fill-color: white;
          -webkit-box-shadow: 0 0 0px 1000px #004444 inset;
          box-shadow: 0 0 0px 1000px #004444 inset;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

          <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
            <legend style={{ ...labelBase, color: '#ffffff', padding: 0, marginBottom: '14px' }}>
              Vad vill ni ha hjälp med?
            </legend>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {TJANSTER.map(tjanst => {
                const selected = form.tjanst === tjanst
                return (
                  <button
                    key={tjanst}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setForm(prev => ({ ...prev, tjanst: selected ? '' : tjanst }))}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      padding: '9px 16px',
                      borderRadius: '999px',
                      border: `1px solid ${selected ? '#f5f0e8' : 'rgba(153,210,210,0.45)'}`,
                      background: selected ? '#f5f0e8' : 'transparent',
                      color: selected ? '#004444' : 'rgba(255,255,255,0.85)',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease, color 0.15s ease, border-color 0.15s ease',
                    }}
                  >
                    {tjanst}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <Field id="namn" label="Namn" error={errors.namn && 'obligatoriskt'}>
            {input('namn', 'text', 'name', errors.namn)}
          </Field>

          <Field id="telefon" label="Telefon" note="eller mail" error={errors.kontakt && 'fyll i telefon eller mail'}>
            {input('telefon', 'tel', 'tel', errors.kontakt)}
          </Field>

          <Field id="mail" label="Mail" note="eller telefon" error={errors.kontakt && 'fyll i telefon eller mail'}>
            {input('mail', 'email', 'email', errors.kontakt)}
          </Field>

          <Field id="foretag" label="Företag" note="valfritt">
            {input('foretag', 'text', 'organization', false)}
          </Field>

          <Field id="meddelande" label="Meddelande" note="valfritt">
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
              style={{ color: 'rgba(255,150,150,0.9)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}
            >
              Något gick fel. Prova igen eller maila direkt till{' '}
              <a href="mailto:wilma@styrmedia.se" style={{ color: 'white', textDecoration: 'underline' }}>
                wilma@styrmedia.se
              </a>
            </p>
          )}

          <div>
            <button
              type="submit"
              disabled={sending}
              className="font-body"
              style={{
                background: '#f5f0e8',
                color: '#004444',
                border: 'none',
                borderRadius: 0,
                padding: '16px 36px',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: sending ? 'not-allowed' : 'pointer',
                opacity: sending ? 0.6 : 1,
                transition: 'opacity 0.15s ease',
              }}
              onMouseEnter={e => { if (!sending) e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = sending ? '0.6' : '1' }}
            >
              {sending ? 'Skickar...' : 'Skicka förfrågan →'}
            </button>
            <p className="font-body" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.6, margin: '16px 0 0' }}>
              Uppgifterna används bara för att kontakta er.
            </p>
          </div>

        </div>
      </form>
    </>
  )
}
