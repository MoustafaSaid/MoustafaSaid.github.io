import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', args: ['--hide-scrollbars'], defaultViewport: { width: 1440, height: 900 } })
const page = await browser.newPage()
await page.goto('http://127.0.0.1:5173/?jump=2400', { waitUntil: 'networkidle0' })
await page.waitForFunction('window.__ready === true')
await new Promise(r => setTimeout(r, 900))
const out = await page.evaluate(() => {
  const pick = (sel) => {
    const el = document.querySelector(sel)
    if (!el) return null
    const cs = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    return { opacity: cs.opacity, display: cs.display, rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], bg: cs.backgroundImage.slice(0, 60) }
  }
  return { request: pick('.film-request'), fill: pick('.line-fill'), dot: pick('.line-dot'), label: pick('.line-label'), panes: [...document.querySelectorAll('.pane')].map(p => { const r = p.getBoundingClientRect(); const cs = getComputedStyle(p); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height), cs.opacity, cs.transform.slice(0,50)] }) }
})
console.log(JSON.stringify(out, null, 1))
await browser.close()
