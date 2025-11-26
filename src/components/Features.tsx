import './Features.css'

type FeatureProps = {
  icon: string
  title: string
  children: string
}

function Feature({ icon, title, children }: FeatureProps) {
  return (
    <div className="feature">
      <div className="feature-icon" aria-hidden="true">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-text">{children}</p>
    </div>
  )
}

export default function Features() {
  return (
    <section id="browse" className="features" aria-label="Funcționalități cheie">
      <div className="features-inner">
        <Feature icon="🛡️" title="Anunțuri verificate">
          Doar proprietarii verificați pot publica anunțuri 100% autentice.
        </Feature>
        <Feature icon="🙍🏻‍♂️" title="Profiluri de utilizator">
          Profiluri de utilizator clare, cu istoricul închirierilor și recenzii.
        </Feature>
        <Feature icon="💬" title="Chat dedicat">
          Comunicați direct prin intermediul platformei.
        </Feature>
        <Feature icon="📅" title="Programare vizionări">
          Programați vizionări dintr-un singur click chiar din pagina anunțului.
        </Feature>
      </div>
    </section>
  )
}
