import puppeteer from 'puppeteer-core'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.BASE || 'http://127.0.0.1:5173/'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--force-device-scale-factor=1'],
  defaultViewport: { width: 1200, height: 630, deviceScaleFactor: 1 },
})

const page = await browser.newPage()
await page.goto(`${base}?jump=0`, { waitUntil: 'networkidle0' })
await page.waitForFunction('window.__ready === true')

// strip the chrome that does not belong in a social card, and size the phone for a 1200x630 crop
await page.addStyleTag({
  content: `
    .nav, .film-cue, .film-rail, .film-grain { display: none !important; }
    .film-hero { padding-left: 68px; padding-right: 520px; }
    .film-phone { width: 208px; right: 88px; translate: 0 -46%; }
    .hero-name { font-size: 88px; }
    .hero-eyebrow { font-size: 10px; }
    .hero-role { font-size: 11px; }
  `,
})

await new Promise((r) => setTimeout(r, 2200))
await page.screenshot({ path: 'public/og.png' })
console.log('wrote public/og.png')
await browser.close()
