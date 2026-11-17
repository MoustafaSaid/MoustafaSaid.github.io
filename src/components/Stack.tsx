import { stack } from '../data'

export default function Stack() {
  return (
    <section id="stack" className="section">
      <div className="container">
        <div className="stack-grid">
          <div className="stack-lead">
            <p className="eyebrow">Stack</p>
            <h2>
              Tools I reach for,
              <br />
              <em className="italic signal">in production.</em>
            </h2>
            <p>
              Not a wishlist. Every group below has shipped something real — an app in review, a CRM under daily use,
              or a service that has to stay up on a Friday night.
            </p>
          </div>

          <div>
            <div className="stack-groups">
              {stack.map((group) => (
                <div key={group.title} className="stack-group" data-reveal>
                  <h3>{group.title}</h3>
                  {group.items.map((item) => (
                    <div key={item} className="stack-item">
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <p className="stack-foot">
              Also in the kit — GitHub Actions · Vercel · Xcode · Android Studio · Figma · MapLibre · Hatif · PostHog
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
