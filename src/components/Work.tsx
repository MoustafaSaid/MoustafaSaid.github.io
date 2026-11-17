import { apps, repos, wabl } from '../data'

const wablStack = ['React', 'TypeScript', 'Vite', 'Tailwind', 'shadcn/ui', 'Express', 'Notion API', 'MapLibre', 'PostHog']

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="section-title" style={{ marginTop: 18 }}>
              Built to run, not to demo.
            </h2>
          </div>
          <p className="section-note">One platform in production · three apps on the App Store</p>
        </div>

        <article className="case">
          <div className="case-media">
            <img src={wabl.image} alt="The Wabl real-estate website, Arabic RTL homepage" loading="lazy" />
            <span className="case-media-tag">
              <i aria-hidden="true" />
              Live · wabl.sa
            </span>
          </div>

          <div className="case-body">
            <p className="case-kicker">2026 · Real estate · Saudi Arabia</p>
            <h3 className="case-title">
              Wabl <em>{wabl.arabic}</em> <span>Website, CRM and analytics</span>
            </h3>
            <p className="case-desc">
              A residential developer in Riyadh needed more than a brochure. I built the marketing site, the sales
              CRM and the measurement around them as one pipeline: every form submission becomes a structured lead,
              every lead has an owner and a next step, and every booking can be traced back to the campaign that
              earned it.
            </p>
            <ul className="case-list">
              <li>Arabic-first site with project and unit catalogue, maps, and SEO-ready unit pages.</li>
              <li>Four lead forms writing into one deduplicated pipeline — with tasks and visit scheduling.</li>
              <li>CRM for leads, tasks, scheduled visits and unit inventory, with a full audit trail.</li>
              <li>Automatic Arabic WhatsApp/SMS visit confirmations through Hatif.</li>
              <li>PostHog and a GTM dataLayer wired to Meta, Snapchat, TikTok and Google.</li>
            </ul>
            <div className="case-stack">
              {wablStack.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
            <div className="case-links">
              <a className="link-arrow" href={wabl.site} target="_blank" rel="noreferrer">
                Visit wabl.sa <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </article>

        <div className="apps-head">
          <h3 className="apps-title">In the App Store</h3>
          <span className="section-note">Client apps · Kuwait</span>
        </div>

        <div className="apps-grid">
          {apps.map((app) => (
            <a
              key={app.name}
              className="app-card"
              href={app.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${app.name} on the App Store`}
            >
              <img src={app.icon} alt={`${app.name} icon`} loading="lazy" />
              <div>
                <p className="app-name">{app.name}</p>
                <p className="app-meta">{app.meta}</p>
                <p className="app-desc">{app.desc}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="apps-head">
          <h3 className="apps-title">Open source</h3>
          <span className="section-note">Selected public repositories</span>
        </div>

        <div className="repo-list">
          {repos.map((repo) => (
            <a key={repo.name} className="repo-row" href={repo.url} target="_blank" rel="noreferrer">
              <span className="repo-name">
                {repo.name} <span>{repo.stack}</span>
              </span>
              <span className="repo-desc">{repo.desc}</span>
              <span className="repo-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
