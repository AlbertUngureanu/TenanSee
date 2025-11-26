import Button from './Button'
import './Header.css'

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="header-inner">
        <a href="#top" className="brand" aria-label="Tenansee home">
          <span className="brand-mark" aria-hidden="true">
            <img src="logo.png" style={{ height: '1em', width: 'auto', verticalAlign: 'middle' }}/>
          </span>
          <span className="brand-text">Tenansee</span>
        </a>

        <nav className="main-nav" aria-label="Primary">
          <ul className="nav-list">
            <li><a href="#browse">Lista de anunțuri</a></li>
            <li><a href="#how">Cum funcționează?</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <div className="auth-actions">
          <Button variant="secondary" className="auth-btn" aria-label="Intră în cont">
            Intră în cont
          </Button>
        </div>
      </div>
    </header>
  )
}
