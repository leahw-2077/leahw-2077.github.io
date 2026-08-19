const site = {
  name: "Leah",
  email: "Leah@MachinePulse.ai",
  linkedin: "https://linkedin.com/in/leah-wang-8676903a8",
  machinepulse: "https://www.machinepulse.ai/",
  karpo: "https://app.karpo.ai/",
};

const posts = [
  {
    label: "TRANSMISSION 001",
    title: "Cross-Cultural Understanding Is Not Magic — It’s Science",
    summary:
      "Cultural fluency is not an innate gift. It is a disciplined practice of immersion, annotation, and learning from mistakes.",
    tags: ["Culture", "Global Products"],
    minutes: 6,
    href: "/notes/cross-cultural-understanding",
  },
];

const projects = [
  {
    number: "01",
    name: "MachinePulse",
    description:
      "A company exploring how frontier intelligence can become part of a more vivid, connected human life.",
    status: "In orbit",
    href: site.machinepulse,
    external: true,
  },
  {
    number: "02",
    name: "Karpo",
    description:
      "A proactive AI for discovering places, experiencing cities, and finding the people worth sharing them with.",
    status: "Building",
    href: site.karpo,
    external: true,
  },
  {
    number: "03",
    name: "Field Notes",
    description:
      "Stories from the frontier of models, culture, consumer behavior, and the beautifully strange work of starting from zero.",
    status: "Transmitting",
    href: "#writing",
    external: false,
  },
];

const constellations = [
  {
    number: "A",
    title: "Science fiction & stories",
    line: "Other worlds are often the best instruments for seeing this one clearly.",
  },
  {
    number: "B",
    title: "Rock & roll",
    line: "Loud guitars, long tracks, and Pink Floyd forever somewhere in the signal.",
  },
  {
    number: "C",
    title: "Long trails",
    line: "Open horizons, earned silence, and the smallness that makes everything feel possible again.",
  },
  {
    number: "D",
    title: "Photography",
    line: "A practice of light, texture, memory—and actually paying attention.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main className="cosmic-site">
      <header className="site-header shell">
        <a className="brand" href="#top" aria-label={`${site.name} home`}>
          <span className="brand-mark">L</span>
          <span>MACHINEPULSE / FOUNDER&apos;S LOG</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#writing">Notes</a>
          <a href="#projects">Building</a>
          <a href="#off-screen">Elsewhere</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-sky" aria-hidden="true">
          <div className="hero-visual" />
          <div className="hero-grain" />
          <span className="sky-note sky-note-one">UNMAPPED / 31°N</span>
        </div>

        <div className="eyebrow"><span /> LEAH WANG · PERSONAL TRANSMISSION</div>
        <div className="hero-title">
          <p>Founder · Builder · Story hunter</p>
          <h1>
            <span>Building tomorrow.</span>
            <em>Chasing wonder.</em>
          </h1>
        </div>
        <div className="hero-bottom">
          <p>
            I&apos;m Leah, founder of MachinePulse. I build consumer AI, follow
            strange ideas past the obvious, and stay close to whatever makes
            humans feel more alive.
          </p>
          <a className="text-link" href="#manifesto">
            Enter the log <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section className="manifesto shell" id="manifesto">
        <div className="manifesto-index" aria-hidden="true">
          <span>LOG 00</span>
          <span>THE WHY</span>
        </div>
        <blockquote>
          “I&apos;ve never been interested in a future without <em>soul</em>.”
        </blockquote>
        <div className="manifesto-copy">
          <p>
            Technology should make the world feel larger—not flatten it. The
            products worth building should carry curiosity, courage, and a
            little bit of magic.
          </p>
          <p className="small-caps">THIS IS A RECORD OF THE EXPEDITION.</p>
        </div>
      </section>

      <section className="writing shell" id="writing">
        <div className="section-heading">
          <p className="section-label">01 / Transmissions</p>
          <h2>Signals from<br /><em>the frontier.</em></h2>
          <p>Notes on intelligence, culture, people, and making the unfamiliar real.</p>
        </div>

        <a className="featured-post featured-link" href={posts[0].href}>
          <div className="featured-meta">
            <span className="signal-dot" />
            <span>{posts[0].label}</span>
            <span>18 · 08 · 26</span>
          </div>
          <div className="featured-content">
            <h3>{posts[0].title}</h3>
            <p>{posts[0].summary}</p>
            <div className="post-footer">
              <div className="tags">
                {posts[0].tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <span>{posts[0].minutes} MIN READ</span>
            </div>
          </div>
          <span className="post-arrow" aria-hidden="true">↗</span>
        </a>

        <p className="archive-note">The first signal has left Earth. More soon.</p>
      </section>

      <section className="projects shell" id="projects">
        <div className="section-heading inverse">
          <p className="section-label">02 / The Expedition</p>
          <h2>Things with<br /><em>a pulse.</em></h2>
          <p>Turning frontier technology into products people can actually feel.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <a
              className="project-card"
              href={project.href}
              key={project.name}
              target={project.external ? "_blank" : undefined}
              rel={project.external ? "noreferrer" : undefined}
              aria-label={`${project.name}${project.external ? " (opens in a new tab)" : ""}`}
            >
              <div className="project-topline">
                <span>{project.number}</span>
                <span className="project-status">{project.status}</span>
              </div>
              <div className="project-copy">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
              <span className="project-arrow"><Arrow /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="off-screen shell" id="off-screen">
        <div className="off-screen-intro">
          <p className="section-label">03 / The Inner Constellation</p>
          <h2>Beyond the product,<br /><em>the universe expands.</em></h2>
          <p>Everything that keeps the machinery human.</p>
        </div>
        <div className="constellation-map">
          <div className="constellation-line" aria-hidden="true" />
          {constellations.map((item) => (
            <article className="constellation-card" key={item.title}>
              <div className="constellation-star" aria-hidden="true" />
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.line}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about shell" id="about">
        <div>
          <p className="section-label">04 / Origin Story</p>
          <h2>Founder. Builder.<br /><em>Earthling, for now.</em></h2>
        </div>
        <div className="about-copy">
          <p className="about-lede">
            I&apos;m driven by starfields, exceptional human art, and the belief
            that creation is one of our best forms of adventure.
          </p>
          <p>
            I&apos;m the founder and CEO of MachinePulse, building Karpo—a proactive
            AI for real-world experiences. Before that, I worked
            across model strategy and consumer products at ByteDance / Doubao
            and Kuaishou.
          </p>
          <p>
            I like taking frontier technology out of the lab and giving it a
            human heartbeat. When I&apos;m not building, I&apos;m probably inside a
            story, at a rock show, on a long trail, or chasing the next frame.
          </p>
          <div className="contact-links">
            <a className="button" href={site.machinepulse} target="_blank" rel="noreferrer">
              MachinePulse <Arrow />
            </a>
            <a className="button" href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <Arrow />
            </a>
            <a className="button button-outline" href={`mailto:${site.email}`}>
              {site.email} <Arrow />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <div className="footer-kicker">END OF CURRENT TRANSMISSION</div>
        <div className="footer-title">The universe is unfinished.<br /><em>Good.</em></div>
        <div className="footer-bottom">
          <span>© 2026 {site.name}</span>
          <span>Shanghai · Singapore · New York</span>
          <a href="#top">Return to orbit ↑</a>
        </div>
      </footer>
    </main>
  );
}
