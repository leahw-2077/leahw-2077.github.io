const site = {
  name: "Leah",
  mark: "L/",
  email: "leah@machinepulse.ai",
  linkedin: "https://linkedin.com/in/leah-wang-8676903a8",
  intro:
    "Founder of MachinePulse. Building Karpo and other consumer AI products where frontier models, product instinct, and real life collide.",
};

const posts = [
  {
    label: "FIELD NOTE 01",
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
    name: "Karpo",
    description:
      "A proactive AI assistant for discovering places, experiencing cities, and connecting with friends—MachinePulse’s first consumer product.",
    status: "Building",
  },
  {
    number: "02",
    name: "Field Notes",
    description:
      "Writing from the edge of model strategy, consumer behavior, and the beautifully messy work of building a company from zero.",
    status: "Writing",
  },
];

const offScreen = [
  {
    number: "01",
    title: "Rock music",
    line: "Loud guitars, long tracks, and Pink Floyd forever in rotation.",
  },
  {
    number: "02",
    title: "Long trails",
    line: "Long days, open horizons, and the kind of silence you have to walk for.",
  },
  {
    number: "03",
    title: "Photography",
    line: "Light, texture, and the discipline of actually paying attention.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header shell">
        <a className="brand" href="#top" aria-label={`${site.name} home`}>
          <span className="brand-mark">{site.mark}</span>
          <span>{site.name}&apos;s Log</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#writing">Notes</a>
          <a href="#projects">Building</a>
          <a href="#off-screen">Off-screen</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="eyebrow">
          <span /> FOUNDER · PRODUCT BUILDER · PERPETUALLY CURIOUS
        </div>
        <h1>
          Build the future.<br />
          <em>Live a little louder.</em>
        </h1>
        <div className="hero-bottom">
          <p>{site.intro}</p>
          <a className="text-link" href="#writing">
            Follow the signal <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section className="writing shell" id="writing">
        <div className="section-heading">
          <p className="section-label">01 / Field Notes</p>
          <h2>Ideas in motion</h2>
          <p>Notes on building, models, people, and everything between.</p>
        </div>

        <a className="featured-post featured-link" href={posts[0].href}>
          <div className="featured-meta">
            <span className="badge">New</span>
            <span>{posts[0].label}</span>
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

        <p className="archive-note">The first signal. More soon.</p>
      </section>

      <section className="projects shell" id="projects">
        <div className="section-heading inverse">
          <p className="section-label">02 / Building</p>
          <h2>Things with a pulse</h2>
          <p>Turning frontier technology into products people can actually feel.</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
              <div className="project-topline">
                <span>{project.number}</span>
                <span className="project-status">{project.status}</span>
              </div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <span className="project-arrow"><Arrow /></span>
            </article>
          ))}
        </div>
      </section>

      <section className="off-screen shell" id="off-screen">
        <div className="off-screen-intro">
          <p className="section-label">03 / Beyond the Product</p>
          <h2>Off-screen,<br /><em>life gets louder.</em></h2>
        </div>
        <div className="off-screen-list">
          {offScreen.map((item) => (
            <article className="off-screen-row" key={item.title}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.line}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about shell" id="about">
        <div>
          <p className="section-label">04 / About</p>
          <h2>Hi, I&apos;m {site.name}.</h2>
        </div>
        <div className="about-copy">
          <p>
            I&apos;m the founder and CEO of MachinePulse, building Karpo—a proactive
            AI assistant for real-world experiences. Before that, I worked across
            model strategy and consumer products at ByteDance / Doubao and
            Kuaishou.
          </p>
          <p>
            I like taking frontier technology out of the lab and turning it into
            something people can actually use, love, and miss when it&apos;s gone.
            Outside product, you&apos;ll find me somewhere between a rock show, a
            long trail, and the next frame.
          </p>
          <div className="contact-links">
            <a className="button" href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <Arrow />
            </a>
            <a className="button button-outline" href={`mailto:${site.email}`}>
              Say hello <Arrow />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <div className="footer-title">Stay curious. Stay loud.</div>
        <div className="footer-bottom">
          <span>© 2026 {site.name}</span>
          <span>Shanghai · Singapore · New York</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </main>
  );
}
