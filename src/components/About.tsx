export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">About</p>
            <h2 className="section-title" style={{ marginTop: 18 }}>
              From one screen to the whole system.
            </h2>
          </div>
          <p className="section-note">Cairo · working across the Gulf</p>
        </div>

        <div className="about-grid">
          <div>
            <p className="about-statement" data-reveal>
              I started with Flutter and kept going <em>down the stack</em> — until the website, the CRM and the
              mobile app were all mine to make.
            </p>

            <div className="about-copy" data-reveal>
              <p>
                For the past few years I have shipped client products end to end: three iOS apps live on the App Store
                for retail and marketplace businesses in Kuwait, and a real-estate platform in Saudi Arabia where the
                marketing site, the sales team&rsquo;s CRM and the reporting all run on one pipeline.
              </p>
              <p>
                I care about the unglamorous parts — <strong>deduplicated leads, migrations you can roll back, failure
                isolation between services</strong> — because those are what make a product calm to run. And I care
                about the surface too: Arabic-first interfaces, real motion, typography that does not look like a
                template.
              </p>
              <p>
                Right now I am building a Fantasy Premier League decision-support platform in a Flutter + NestJS
                monorepo, and this site&rsquo;s film is the kind of thing I build when nobody stops me.
              </p>
            </div>
          </div>

          <aside className="now-card" data-reveal aria-label="Current status">
            <p className="now-head">Now / 2026</p>
            <dl style={{ margin: 0 }}>
              <div className="now-row">
                <dt>Role</dt>
                <dd>
                  <b>Full-stack developer</b>
                  <br />
                  Mobile-first, backend-fluent
                </dd>
              </div>
              <div className="now-row">
                <dt>Building</dt>
                <dd>FPL Intelligence — Flutter · NestJS · PostgreSQL</dd>
              </div>
              <div className="now-row">
                <dt>Shipping</dt>
                <dd>wabl.sa — platform, CRM and analytics</dd>
              </div>
              <div className="now-row">
                <dt>Based</dt>
                <dd>Cairo, Egypt · Gulf clients</dd>
              </div>
              <div className="now-row">
                <dt>Status</dt>
                <dd>
                  <span className="now-dot" aria-hidden="true" />
                  Open to full-stack &amp; mobile work
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  )
}
