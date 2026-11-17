import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { apps, wabl } from '../data'

gsap.registerPlugin(ScrollTrigger)

const panes = [
  {
    n: '01',
    label: 'Interface',
    title: 'The screen',
    sub: 'Flutter · SwiftUI · React',
    code: (
      <>
        <span className="c">// one codebase, every device</span>
        {'\n'}
        <span className="k">Widget</span> build(ctx) =&gt; PhoneFrame({'\n'}
        {'  '}child: <span className="k">const</span> Screen(),{'\n'}
        );
      </>
    ),
  },
  {
    n: '02',
    label: 'State',
    title: 'The truth',
    sub: 'BLoC · Riverpod · TanStack Query',
    code: (
      <>
        <span className="k">final</span> units = ref.watch({'\n'}
        {'  '}unitsProvider(city),{'\n'}
        );{'\n'}
        <span className="c">// cached, retried, offline-safe</span>
      </>
    ),
  },
  {
    n: '03',
    label: 'Server',
    title: 'The contract',
    sub: 'Express · NestJS · FastAPI',
    code: (
      <>
        app.post(<span className="s">'/leads'</span>,{'\n'}
        {'  '}validate(leadSchema),{'\n'}
        {'  '}<span className="k">async</span> (req, res) =&gt; {'{'}
        {'\n'}
        {'    '}<span className="k">const</span> lead = <span className="k">await</span> leads.upsert(req.body);{'\n'}
        {'    '}res.created(lead);{'\n'}
        {'  }'}
      </>
    ),
  },
  {
    n: '04',
    label: 'Data',
    title: 'The source',
    sub: 'PostgreSQL · Drizzle · Redis',
    code: (
      <>
        <span className="k">select</span> city, count(*) {'\n'}
        <span className="k">from</span> units{'\n'}
        <span className="k">where</span> status = <span className="s">'available'</span>{'\n'}
        <span className="k">group by</span> city;
      </>
    ),
    data: true,
  },
]

const captions = [
  {
    n: '01 / Interface',
    title: 'Screen first.',
    copy: 'Flutter, SwiftUI and React — pixel-accurate, motion-aware, accessible, and fast on a five-year-old phone.',
  },
  {
    n: '02 / State',
    title: 'Truth lives here.',
    copy: 'BLoC, Riverpod, TanStack Query. Caching, retries and optimistic updates that never lie to the interface.',
  },
  {
    n: '03 / Server',
    title: 'Contracts, then code.',
    copy: 'Express, NestJS, FastAPI. Validation at the edge, typed boundaries, and one failing service never takes the rest down.',
  },
  {
    n: '04 / Data',
    title: 'The part that must be right.',
    copy: 'PostgreSQL with Drizzle or Prisma, Redis where it earns its keep, migrations you can actually roll back.',
  },
]

const acts = ['Intro', 'Split', 'Depth', 'Request', 'Ship']

export default function Film() {
  const sectionRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const paneEls = Array.from(section.querySelectorAll<HTMLElement>('.pane'))
    const capEls = Array.from(section.querySelectorAll<HTMLElement>('.film-caption'))
    const railItems = Array.from(railRef.current?.querySelectorAll<HTMLElement>('.rail-item') ?? [])

    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const Y = [-160, -34, 96, 232]
        const X = [-16, 6, 30, 56]
        const Z = [0, -180, -360, -540]
        const RY = [9, 5, 1, -3]
        const SC = [1, 0.97, 0.94, 0.91]

        gsap.set('.line-fill', { scaleX: 0 })
        gsap.set('.line-dot', { opacity: 0 })

        const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
        intro
          .from('.hero-eyebrow', { y: 14, opacity: 0, duration: 0.8 }, 0.1)
          .from('.name-line > span', { yPercent: 118, duration: 1.2, stagger: 0.1 }, 0.12)
          .from('.hero-role', { y: 16, opacity: 0, duration: 0.9 }, 0.62)
          .from('.phone-shell', { y: 46, opacity: 0, scale: 0.965, duration: 1.3 }, 0.42)

        let current = -1
        const setAct = (progress: number) => {
          const next = progress < 0.16 ? 0 : progress < 0.33 ? 1 : progress < 0.78 ? 2 : progress < 0.91 ? 3 : 4
          if (next === current) return
          current = next
          railItems.forEach((el, i) => el.setAttribute('data-active', String(i === next)))
        }

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.7,
            onUpdate: (self) => setAct(self.progress),
          },
        })

        // 00 — the screen leaves
        tl.fromTo('.film-cue', { opacity: 1 }, { opacity: 0, duration: 0.35 }, 0.35)
          .to('.film-hero', { opacity: 0, yPercent: -5, duration: 1.1 }, 0.7)
          .to('.film-phone', { scale: 1.14, duration: 2.0 }, 0.7)
          .to('.phone-screen', { opacity: 0, duration: 0.55 }, 1.5)
          .to('.film-phone', { opacity: 0, duration: 0.7 }, 1.7)

          // 01 — split into four layers
          .to(paneEls, { opacity: 1, duration: 0.8, stagger: 0.08 }, 1.95)
          .to(
            paneEls,
            {
              y: (i: number) => Y[i],
              x: (i: number) => X[i],
              z: (i: number) => Z[i],
              rotateX: 6,
              rotateY: (i: number) => RY[i],
              scale: (i: number) => SC[i],
              duration: 1.5,
              stagger: 0.06,
              ease: 'power2.out',
            },
            2.05,
          )
          .to('.film-split-label', { opacity: 1, y: 0, duration: 0.5 }, 2.3)
          .to(paneEls.slice(1), { opacity: 0.1, duration: 0.5 }, 2.2)
          .to('.film-split-label', { opacity: 0, y: -10, duration: 0.5 }, 3.15)

        // the camera distance shrinks on small screens so cards never clip
        const compact = window.matchMedia('(max-width: 720px)').matches
        const focusZ = compact ? 80 : 300
        const focusScale = compact ? 1.02 : 1.04

        // 02 — one layer at a time, toward the camera
        paneEls.forEach((pane, i) => {
          const at = 3.6 + i * 1.1
          tl.to(
            pane,
            {
              x: 0,
              y: 0,
              z: focusZ,
              rotateX: 0,
              rotateY: 0,
              scale: focusScale,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
            },
            at,
          )
            .to(capEls[i], { opacity: 1, y: 0, duration: 0.4 }, at + 0.15)
            .to(capEls[i], { opacity: 0, y: -8, duration: 0.35 }, at + 0.95)

          if (i < 3) tl.to(pane, { opacity: 0, z: focusZ + 140, duration: 0.45, ease: 'power2.in' }, at + 0.85)
          else tl.to(pane, { opacity: 0, z: focusZ + 600, duration: 0.7, ease: 'power2.in' }, at + 1.05)
        })

        // 03 — the request travels the whole stack
        tl.to('.film-request', { opacity: 1, duration: 0.3 }, 8.4)
          .to('.line-fill', { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, 8.65)
          .to('.line-dot', { opacity: 1, duration: 0.2 }, 8.6)
          .to('.film-beat--owned', { opacity: 1, y: 0, duration: 0.7 }, 8.7)
          .to('.film-beat--owned', { opacity: 0, y: -10, duration: 0.45 }, 9.7)
          .to('.film-request', { opacity: 0, duration: 0.4 }, 9.95)

          // 04 — what ships
          .to('.film-finale', { opacity: 1, duration: 0.8 }, 10.05)
          .fromTo('.finale-card', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.08 }, 10.15)

        setAct(0)
      }, section)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <section id="film" ref={sectionRef} className="film" aria-label="Introduction">
      <div className="film-stage">
        <div className="film-bg" aria-hidden="true" />
        <div className="film-grain" aria-hidden="true" />
        <div className="film-vignette" aria-hidden="true" />

        <div className="film-hero">
          <p className="hero-eyebrow">Cairo, Egypt · Available for work</p>
          <h1 className="hero-name">
            <span className="name-line">
              <span>Moustafa</span>
            </span>
            <span className="name-line">
              <span>
                Said <em className="italic">Salha</em>
              </span>
            </span>
          </h1>
          <p className="hero-role">
            Full-stack developer — <b>Flutter</b>, <b>React</b>, <b>Node.js</b>
          </p>
        </div>

        <div className="film-phone" aria-hidden="true">
          <div className="phone-shell">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="screen-top">
                <span>9:41</span>
                <span>WABL · RIYADH</span>
              </div>
              <div className="screen-head">
                <span className="screen-kicker">Available homes</span>
                <span className="screen-title">Almalqa, Riyadh</span>
              </div>
              <div className="screen-card">
                <span className="screen-ar">وبل العقارية</span>
                <div className="screen-meta">
                  <span>3 UNITS LEFT</span>
                  <span>FROM SAR 2.4M</span>
                </div>
              </div>
              <div className="screen-chips">
                <span className="screen-chip is-on">All</span>
                <span className="screen-chip">Riyadh</span>
                <span className="screen-chip">Jeddah</span>
              </div>
              <div className="screen-list">
                <div className="screen-row">
                  <span className="screen-thumb" />
                  <span className="screen-lines">
                    <i />
                    <i />
                  </span>
                </div>
                <div className="screen-row">
                  <span className="screen-thumb alt" />
                  <span className="screen-lines">
                    <i />
                    <i />
                  </span>
                </div>
              </div>
              <div className="screen-tabs">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </div>

        <p className="film-split-label">
          <span aria-hidden="true" />
          One screen · four disciplines
        </p>

        <div className="film-layers" aria-hidden="true">
          {panes.map((pane) => (
            <article key={pane.n} className={`pane${pane.data ? ' is-data' : ''}`}>
              <div className="pane-head">
                <b>{pane.n}</b>
                <span>{pane.label}</span>
              </div>
              <h2 className="pane-title">{pane.title}</h2>
              <p className="pane-sub">{pane.sub}</p>
              <pre className="pane-code">{pane.code}</pre>
            </article>
          ))}
        </div>

        {captions.map((cap) => (
          <div key={cap.n} className="film-caption" aria-hidden="true">
            <p className="caption-num">{cap.n}</p>
            <h2 className="caption-title">{cap.title}</h2>
            <p className="caption-copy">{cap.copy}</p>
          </div>
        ))}

        <div className="film-request" aria-hidden="true">
          <span className="line-label is-start">client</span>
          <span className="line-fill" />
          <span className="line-label is-end">database</span>
          <span className="line-dot" />
        </div>

        <p className="film-beat film-beat--owned">
          A click, a lead, a booking.
          <br />
          <em>The whole path, owned.</em>
        </p>

        <div className="film-finale">
          <p className="finale-kicker">Shipped, running, maintained</p>
          <div className="finale-row">
            <a className="finale-card is-wide" href={wabl.site} target="_blank" rel="noreferrer" tabIndex={-1}>
              <div className="finale-thumb">
                <img src={wabl.image} alt="" loading="lazy" />
              </div>
              <div className="finale-label">
                <b>{wabl.name}</b>
                <span>wabl.sa</span>
              </div>
            </a>
            {apps.map((app) => (
              <a key={app.name} className="finale-card" href={app.url} target="_blank" rel="noreferrer" tabIndex={-1}>
                <div className="finale-icon">
                  <img src={app.icon} alt="" loading="lazy" />
                </div>
                <div className="finale-label">
                  <b>{app.name}</b>
                </div>
              </a>
            ))}
          </div>
          <p className="finale-cue">
            Selected work <span aria-hidden="true">↓</span>
          </p>
        </div>

        <div className="film-rail" ref={railRef} aria-hidden="true">
          {acts.map((act, i) => (
            <span key={act} className="rail-item" data-active={i === 0 ? 'true' : 'false'}>
              {act}
            </span>
          ))}
        </div>

        <div className="film-cue" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </div>
    </section>
  )
}
