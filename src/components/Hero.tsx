import { useState } from 'react'
import Button from './Button'
import './Hero.css'
import posthog from 'posthog-js';

// Formspree endpoint placeholder.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpwkzkdo'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'submitting') return
    setErrorMsg('')
    const trimmed = email.trim()
    if (!isValidEmail(trimmed)) {
      setErrorMsg('Te rugăm introdu un email valid.')
      return
    }

    // Honeypot check
    const form = e.currentTarget
    const gotcha = (form.elements.namedItem('_gotcha') as HTMLInputElement | null)?.value
    if (gotcha) {
      // silently ignore bots
      setStatus('success')
      setEmail('')
      return
    }
    
    posthog.capture('CTA-Pressed', {});
    posthog.identify(trimmed, {name: trimmed});

    setStatus('submitting')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ email: trimmed, source: 'hero-optin' })
      })
      if (!res.ok) {
        throw new Error('Server error')
      }
      const data = await res.json().catch(() => ({}))
      if (data.errors) {
        setErrorMsg('Eroare la trimitere. Încearcă din nou.')
        setStatus('error')
      } else {
        setStatus('success')
        setEmail('')
      }
    } catch {
      setErrorMsg('Nu am putut trimite. Verifică conexiunea și reîncearcă.')
      setStatus('error')
    }
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-title">
            <em>Transparență și încredere</em>
            <br />
            între
            <br />
            <em>chiriași și proprietari</em>
          </h1>
          <p className="hero-subtitle">
            Răsfoiește anunțurile, discută în siguranță și programează vizionări.
            <br />
            Totul într-un singur loc.
          </p>
          <div className="hero-cta">
            <form onSubmit={handleSubmit} className="email-form" aria-label="Înscriere email">
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Emailul tău"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
                required
                disabled={status === 'submitting'}
              />
              {/* Honeypot hidden field */}
              <input type="text" name="_gotcha" className="hidden-field" tabIndex={-1} autoComplete="off" />
              <Button
                variant="secondary"
                type="submit"
                style={{ backgroundColor: 'green', color: 'white' }}
                disabled={status === 'submitting'}
                aria-disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Se trimite…' : 'Alătură-te'}
              </Button>
            </form>
          </div>
          <div className="form-feedback" aria-live="polite">
            {status === 'success' && <span className="success-msg">Mulțumim! Te-am adăugat pe listă.</span>}
            {status === 'error' && errorMsg && <span className="error-msg">{errorMsg}</span>}
            {status === 'idle' && errorMsg && <span className="error-msg">{errorMsg}</span>}
          </div>
          <p className="consent-note">Prin înscriere accepți să primești noutăți. Te poți dezabona oricând.</p>
        </div>
        <div className="hero-media" aria-label="Product preview area">
          <div className="media-placeholder" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src="logo.png" />
          </div>
        </div>
      </div>
    </section>
  )
}
