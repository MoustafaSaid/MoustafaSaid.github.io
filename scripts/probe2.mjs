import puppeteer from 'puppeteer-core'
const browser = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: 'new', defaultViewport: { width: 390, height: 844 } })
const page = await browser.newPage()
await page.goto('http://127.0.0.1:5173/?jump=2900', { waitUntil: 'networkidle0' })
await page.waitForFunction('window.__ready === true')
await new Promise(r => setTimeout(r, 800))
console.log(await page.evaluate(() => {
  const row = document.querySelector('.finale-row').getBoundingClientRect()
  const cards = [...document.querySelectorAll('.finale-card')].map(c => { const r = c.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.right), Math.round(r.y), Math.round(r.height)] })
  return JSON.stringify({ vw: innerWidth, row: [Math.round(row.x), Math.round(row.right), Math.round(row.width)], cards }, null, 1)
}))
await browser.close()
