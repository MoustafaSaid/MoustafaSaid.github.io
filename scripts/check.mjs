import puppeteer from 'puppeteer-core'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.BASE || 'http://127.0.0.1:5173/'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars'],
  defaultViewport: { width: 1440, height: 900 },
})

// ---------- 1. normal path: console + failed requests + scroll sweep ----------
const page = await browser.newPage()
const errors = []
const failed = []
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text()}`)
})
page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`))
page.on('requestfailed', (r) => failed.push(`${r.url()} → ${r.failure()?.errorText}`))
page.on('response', (r) => {
  if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`)
})

await page.goto(base, { waitUntil: 'networkidle0' })
await page.waitForFunction('window.__ready === true')

const height = await page.evaluate(() => document.body.scrollHeight)
for (let y = 0; y < height; y += 600) {
  await page.evaluate((v) => window.scrollTo(0, v), y)
  await new Promise((r) => setTimeout(r, 60))
}
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await new Promise((r) => setTimeout(r, 600))

const lazy = await page.evaluate(() =>
  [...document.images].map((img) => ({ src: img.currentSrc.split('/').pop(), ok: img.complete && img.naturalWidth > 0 })),
)
const overflow = await page.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
}))

console.log('height', height)
console.log('images', JSON.stringify(lazy))
console.log('overflow', JSON.stringify(overflow))
console.log('console issues', errors.length ? errors : 'none')
console.log('failed requests', failed.length ? failed : 'none')

// ---------- 2. reduced motion path ----------
const rm = await browser.newPage()
await rm.setViewport({ width: 1440, height: 900 })
await rm.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
await rm.goto(base, { waitUntil: 'networkidle0' })
await rm.waitForFunction('window.__ready === true')
await new Promise((r) => setTimeout(r, 500))
const rmInfo = await rm.evaluate(() => {
  const film = document.querySelector('.film').getBoundingClientRect()
  const finale = document.querySelector('.film-finale')
  const hero = document.querySelector('.film-hero')
  return {
    filmHeight: Math.round(film.height),
    stagePosition: getComputedStyle(document.querySelector('.film-stage')).position,
    finaleOpacity: getComputedStyle(finale).opacity,
    finalePosition: getComputedStyle(finale).position,
    heroPosition: getComputedStyle(hero).position,
    finaleCards: document.querySelectorAll('.finale-card').length,
    docHeight: document.body.scrollHeight,
  }
})
console.log('reduced-motion', JSON.stringify(rmInfo, null, 1))
await rm.screenshot({ path: 'shots/reduced-motion.png' })
await rm.screenshot({ path: 'shots/reduced-motion-full.png', fullPage: true })

await browser.close()
