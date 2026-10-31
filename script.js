(() => {
  const view = document.getElementById("view");
  const nav = document.getElementById("primary-nav");
  const toggle = document.querySelector(".menu-toggle");

  // ---------- helpers ----------
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const safe = (u) => (/^(https?:\/\/|mailto:)/i.test(u) ? esc(u) : "#");
  const link = (href, label, cls) =>
    `<a class="${cls}" href="${safe(href)}"${/^https?:/i.test(href) ? ' target="_blank" rel="noreferrer"' : ""}>${esc(label)} <span aria-hidden="true">↗</span></a>`;

  // ---------- components ----------
  const Heading = (eyebrow, title, intro = "") =>
    `<div class="section-heading"><div><p class="eyebrow">${eyebrow}</p><h2>${title}</h2></div>${intro ? `<p class="section-intro">${intro}</p>` : ""}</div>`;

  const ProjectCard = (p) => `
    <a class="project-card" href="#/projects/${encodeURIComponent(p.slug)}">
      <div class="project-meta"><span class="tag ${/progress/i.test(p.status) ? "" : "tag-featured"}">${esc((p.status || "").toUpperCase())}</span><span class="project-year">${esc(p.year)}</span></div>
      <h3>${esc(p.title)}</h3>
      <p class="project-summary">${esc(p.summary)}</p>
      <div class="project-footer"><div class="tech-list">${(p.tech || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div><span class="project-link">View project <span aria-hidden="true">→</span></span></div>
    </a>`;

  const Grid = (list) => `<div class="project-grid">${list.map(ProjectCard).join("")}</div>`;

  const Empty = () => `
    <div class="empty"><span class="status-dot"></span>
      <h3>The first project is being built.</h3>
      <p>Nothing is published until it works, is tested, and is documented. Check back soon.</p>
    </div>`;

  // ---------- views ----------
  const Home = () => ({
    title: "Aarna Creations — Engineering, thoughtfully built",
    html: `
    <section class="hero section-shell">
      <div class="hero-copy">
        <p class="eyebrow"><span class="eyebrow-line"></span> INDEPENDENT ENGINEERING PORTFOLIO</p>
        <h1>Thoughtful code.<br><em>Verifiable</em> results.</h1>
        <p class="hero-lede">Aarna Creations is a growing engineering studio focused on practical software, reliable data systems, and environments that make AI agents measurable.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#/projects">Explore the projects <span aria-hidden="true">↘</span></a>
          <a class="text-link" href="#/about">The approach <span aria-hidden="true">→</span></a>
        </div>
        <div class="hero-note"><span class="status-dot"></span> Building in public, one carefully tested project at a time.</div>
      </div>
      <div class="hero-art" aria-label="Aarna Creations brand emblem">
        <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
        <div class="monogram">A<span>.</span></div><div class="art-rule"></div>
        <p>ENGINEERING<br><span>WITH INTENT</span></p><div class="art-index">AC / 001</div>
      </div>
    </section>
    <section class="principles-strip" aria-label="Focus areas">
      <div><span>01</span> Practical software</div><div><span>02</span> Data correctness</div>
      <div><span>03</span> Agent evaluation</div><div><span>04</span> Continuous learning</div>
    </section>
    <section class="section-shell projects-section">
      ${Heading("LATEST WORK", "Built in the open.<br><em>One project at a time.</em>")}
      ${PROJECTS.length ? Grid(PROJECTS.slice(0, 2)) + `<p class="more-link"><a class="text-link" href="#/projects">All projects <span aria-hidden="true">→</span></a></p>` : Empty()}
    </section>`,
  });

  const Projects = () => ({
    title: "Projects — Aarna Creations",
    html: `<section class="section-shell projects-section">
      ${Heading("SELECTED WORK", "Projects.<br><em>Proof in the details.</em>", "Each project includes its purpose, implementation notes, tests, and a path to the source.")}
      ${PROJECTS.length ? Grid(PROJECTS) : Empty()}
    </section>`,
  });

  const Project = (slug) => {
    const p = PROJECTS.find((x) => x.slug === slug);
    if (!p) return NotFound();
    const list = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    return {
      title: `${p.title} — Aarna Creations`,
      html: `<article class="section-shell detail">
        <a class="back-link" href="#/projects">← All projects</a>
        <div class="project-meta"><span class="tag">${esc((p.status || "").toUpperCase())}</span><span class="project-year">${esc(p.year)}</span></div>
        <h1>${esc(p.title)}</h1>
        <p class="detail-lede">${esc(p.summary)}</p>
        ${(p.body || []).map((t) => `<p>${esc(t)}</p>`).join("")}
        ${p.highlights?.length ? `<h2>Highlights</h2>${list(p.highlights)}` : ""}
        ${p.snippet ? `<div class="code-window"><div class="window-dots"><i></i><i></i><i></i><span>${esc(p.snippet.file)}</span></div><pre><code>${esc(p.snippet.code)}</code></pre></div>` : ""}
        ${p.tech?.length ? `<div class="tech-list" style="margin-top:30px">${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}</div>` : ""}
        <div class="detail-links">${p.repo ? link(p.repo, "Source code", "button button-primary") : ""}${p.demo ? link(p.demo, "Live demo", "button button-outline") : ""}</div>
      </article>`,
    };
  };

  const About = () => ({
    title: "About — Aarna Creations",
    html: `<section class="about-section"><div class="section-shell about-grid">
      <div><p class="eyebrow">THE APPROACH</p><h2>Small projects.<br><em>Serious standards.</em></h2></div>
      <div class="about-copy"><p>Aarna Creations is being built around a simple principle: a project should be easy to understand, possible to run, and straightforward to verify.</p><p>That means readable code, useful documentation, tests that demonstrate behavior, and honest project status. The portfolio will grow as the work becomes real—not just as technologies are added to a list.</p>
      <div class="standards"><span>Readable code</span><span>Reproducible tests</span><span>Clear documentation</span><span>Honest progress</span></div></div>
    </div></section>`,
  });

  const Contact = () => ({
    title: "Contact — Aarna Creations",
    html: `<section class="contact-section section-shell">
      <p class="eyebrow">LET'S CONNECT</p>
      <h2>Good work starts<br>with <em>clear thinking.</em></h2>
      <p class="contact-copy">Follow the work, explore the code, or get in touch about engineering and evaluation projects.</p>
      <div class="contact-actions">
        ${SITE.github ? link(SITE.github, "GitHub", "button button-primary") : ""}
        ${SITE.email ? link("mailto:" + SITE.email, "Email", "button button-outline") : ""}
        ${!SITE.github && !SITE.email ? `<p class="contact-copy">Contact details are coming soon.</p>` : ""}
      </div></section>`,
  });

  const NotFound = () => ({
    title: "Not found — Aarna Creations",
    html: `<section class="contact-section section-shell"><p class="eyebrow">404</p><h2>That page<br><em>doesn't exist.</em></h2>
      <div class="contact-actions" style="margin-top:28px"><a class="button button-primary" href="#/">Back home</a></div></section>`,
  });

  // ---------- router ----------
  let first = true;
  const render = () => {
    const [section, slug] = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    const v =
      !section ? Home() :
      section === "projects" ? (slug ? Project(decodeURIComponent(slug)) : Projects()) :
      section === "about" ? About() :
      section === "contact" ? Contact() : NotFound();

    view.innerHTML = `<div class="page">${v.html}</div>`;
    document.title = v.title;
    nav.querySelectorAll("[data-nav]").forEach((a) =>
      a.dataset.nav === section ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menu";
    window.scrollTo({ top: 0, behavior: "instant" });
    if (!first) view.focus({ preventScroll: true }); // keeps keyboard/screen-reader users oriented
    first = false;
  };

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  });
  document.querySelector(".skip-link").addEventListener("click", (e) => { e.preventDefault(); view.focus(); }); // don't let #main hit the router
  document.querySelector(".back-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.getElementById("year").textContent = new Date().getFullYear();

  window.addEventListener("hashchange", render);
  render();
})();
