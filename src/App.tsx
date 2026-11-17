import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Nav from './components/Nav'
import Film from './components/Film'
import About from './components/About'
import Marquee from './components/Marquee'
import Work from './components/Work'
import Stack from './components/Stack'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger)

declare global {
  interface Window {
    __ready?: boolean
  }
}

export default function App() {
  // smooth scrolling
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // determinism for the screenshot harness: no smooth scroll when jumping
    if (new URLSearchParams(window.location.search).has('jump')) return

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  // section reveals (created after the film triggers on purpose)
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            y: 28,
            opacity: 0,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
          })
        })

        gsap.from('.case-media', {
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.25,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.case-media', start: 'top 86%' },
        })

        gsap.from('.app-card', {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.apps-grid', start: 'top 88%' },
        })

        gsap.from('.repo-row', {
          y: 14,
          opacity: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.repo-list', start: 'top 90%' },
        })
      })
      return () => ctx.revert()
    })
    return () => mm.revert()
  }, [])

  // dev contract: ?jump=<y> and window.__ready
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const jump = params.get('jump')
    if (jump !== null) history.scrollRestoration = 'manual'

    const settle = () => {
      ScrollTrigger.refresh()
      if (jump !== null) {
        window.scrollTo(0, Number(jump) || 0)
        ScrollTrigger.update()
        requestAnimationFrame(() => {
          window.scrollTo(0, Number(jump) || 0)
          ScrollTrigger.update()
          window.__ready = true
        })
      } else {
        window.__ready = true
      }
    }

    if (jump !== null) {
      window.scrollTo(0, Number(jump) || 0)
    }

    if (document.readyState === 'complete') settle()
    else window.addEventListener('load', settle, { once: true })

    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => window.removeEventListener('load', settle)
  }, [])

  return (
    <>
      <a className="skip-link" href="#work">
        Skip the film
      </a>
      <Nav />
      <main>
        <Film />
        <About />
        <Marquee />
        <Work />
        <Stack />
        <Contact />
      </main>
    </>
  )
}
