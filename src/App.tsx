import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import './App.css'
import { useEffect } from 'react'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

function App() {
  useEffect(() => {
    posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY as string, {
      api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      defaults: '2025-05-24',
      // Enable debug mode in development
      loaded: (posthog) => {
        if (import.meta.env.NODE_ENV === 'development') posthog.debug()
      }
    })

    posthog.capture('LandingPage', {});
  }, [])

  return (
      <PostHogProvider client={posthog}>
        <Header />
        <main>
          <Hero />
          <Features />
          {/* <section id="how" style={{ padding: '2rem 1rem', maxWidth: 1280, margin: '0 auto' }}>
            <h2>How It Works</h2>
            <ol style={{ lineHeight: 1.6 }}>
              <li>Browse verified listings.</li>
              <li>Open a dedicated chat with the landlord or tenant.</li>
              <li>Schedule a viewing with one click.</li>
            </ol>
          </section>
          <section id="contact" style={{ padding: '2rem 1rem', maxWidth: 1280, margin: '0 auto' }}>
            <h2>Contact</h2>
            <p style={{ maxWidth: 520 }}>
              Have questions? Reach us at <a href="mailto:contact@tenansee.example">contact@tenansee.example</a>
              {' '}or follow us on social for product updates.
            </p>
          </section> */}
        </main>
      </PostHogProvider>
  )
}

export default App
