import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const base = process.env.BASE || 'http://127.0.0.1:5173/'
const outDir = process.env.OUT || 'shots'
const width = Number(process.env.W || 1440)
const height = Number(process.env.H || 900)

// positions: numbers are scrollY, strings starting with # are element anchors
const targets = (process.argv.slice(2).length ? process.argv.slice(2) : ['0']).map((t) =>
  /^\d+$/.test(t) ? { name: t, kind: 'y', value: Number(t) } : { name: t.replace(/[^a-z0-9]/gi, ''), kind: 'sel', value: t },
)

mkdirSync(outDir, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu', '--font-render-hinting=none'],
  defaultViewport: { width, height, deviceScaleFactor: 1 },
})

const page = await browser.newPage()
page.on('console', (msg) => {
  if (msg.type() === 'error') console.log('  [console error]', msg.text())
})
page.on('pageerror', (err) => console.log('  [page error]', err.message))

for (const target of targets) {
  const url = target.kind === 'y' ? `${base}?jump=${target.value}` : `${base}${target.value}`
  await page.goto(url, { waitUntil: 'networkidle0' })
  await page.waitForFunction('window.__ready === true', { timeout: 15000 }).catch(() => console.log('  __ready timeout'))
  if (target.kind === 'sel') {
    await page.evaluate(async (sel) => {
      const el = document.querySelector(sel)
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 90)
    }, target.value)
  }
  await new Promise((r) => setTimeout(r, 900))
  const file = `${outDir}/${target.name}.png`
  await page.screenshot({ path: file })
  const y = await page.evaluate(() => Math.round(window.scrollY))
  console.log(`${file}  scrollY=${y}`)
}

await browser.close()
