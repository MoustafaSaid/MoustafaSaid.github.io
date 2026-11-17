import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = ['Flutter', 'React', 'Node.js', 'PostgreSQL', 'TypeScript', 'FastAPI', 'Drizzle', 'Swift', 'Express', 'Notion API']

export default function Marquee() {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const skewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    const skew = skewRef.current
    if (!root || !track || !skew) return

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const drift = gsap.to(track, { xPercent: -50, ease: 'none', duration: 26, repeat: -1 })
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = gsap.utils.clamp(-7, 7, self.getVelocity() / 280)
          gsap.to(skew, { skewX: velocity, duration: 0.45, ease: 'power2.out', overwrite: 'auto' })
        },
      })
      return () => {
        drift.kill()
        trigger.kill()
      }
    })

    return () => mm.revert()
  }, [])

  const row = (key: string) => (
    <div className="marquee-inner" key={key} aria-hidden={key === 'b'}>
      {items.map((item) => (
        <span key={`${key}-${item}`} className="marquee-item">
          {item}
        </span>
      ))}
    </div>
  )

  return (
    <div className="marquee" ref={rootRef} aria-label="Core technologies">
      <div className="marquee-skew" ref={skewRef}>
        <div className="marquee-track" ref={trackRef}>
          {row('a')}
          {row('b')}
        </div>
      </div>
    </div>
  )
}
