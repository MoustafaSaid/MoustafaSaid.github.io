# moustafasaid.github.io

Personal site of **Moustafa Said Salha** — full-stack developer.

One page, built as a scroll film: the hero is a phone screen that detaches into the four layers
of the stack (interface → state → server → data), fires a request through them, and resolves
into the products that actually shipped. The rest of the page is the work: the Wabl platform,
three App Store apps, open-source repositories, the stack, and contact.

## Stack

- **React 18 + TypeScript + Vite**
- **Tailwind CSS** for tokens/layout, hand-written CSS for the film
- **GSAP ScrollTrigger** for the scrubbed timeline, **Lenis** for smooth scrolling
- **Instrument Serif / Inter / JetBrains Mono** via fontsource (self-hosted, no CDN)

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run preview
```

Dev helpers (need Chrome at the path inside the script):

```bash
node scripts/shoot.mjs 0 1200 2400      # scroll frames → shots/
node scripts/check.mjs                  # console, assets, reduced-motion
node scripts/og.mjs                     # regenerate public/og.png
```

## Structure

```
src/
  components/
    Film.tsx     the scroll film: hero, layer deck, request, finale
    Nav.tsx About.tsx Work.tsx Stack.tsx Contact.tsx Marquee.tsx
  data.ts        projects, apps, repositories, stack
  index.css      design system + film styles
```

## Accessibility & performance

- `prefers-reduced-motion` collapses the film to a static hero plus the shipped work — no
  scroll-jacking, no animation.
- Full keyboard path: skip link into the work, labelled links, visible focus rings.
- The film is pure CSS/GSAP — no video, no scroll libraries beyond Lenis, ~106 kB gzipped JS.

Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.
