import { useEffect, useState } from 'react'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <a className="nav-mark" href="#film" aria-label="Moustafa Said Salha — back to top">
        moustafa<span>.</span>
      </a>

      <nav className="nav-links" aria-label="Sections">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="nav-right">
        <span className="availability">
          <i aria-hidden="true" />
          Available
        </span>
        <a className="nav-cta" href="mailto:moustafasaidsalha@gmail.com">
          Start a project
        </a>
      </div>
    </header>
  )
}
