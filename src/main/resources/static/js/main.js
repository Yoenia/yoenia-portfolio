(function () {
  const $ = (sel, root = document) => root.querySelector(sel);

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function renderProfile(profile) {
    $("#hero-eyebrow").textContent = profile.title;
    $("#hero-title").textContent = profile.name;
    $("#hero-tagline").textContent = profile.tagline;
    $("#hero-summary").textContent = profile.summary.split("\n")[0];
    $("#about-text").textContent = profile.summary;

    const linkedIn = $("#hero-linkedin");
    linkedIn.href = profile.linkedInUrl;

    const facts = $("#quick-facts");
    facts.innerHTML = [
      profile.location,
      profile.email,
      profile.phone,
      ...profile.languages.map((l) => `${l.language}: ${l.level}`),
    ]
      .map((line) => `<li>${escapeHtml(line)}</li>`)
      .join("");

    const strengths = $("#strengths-list");
    strengths.innerHTML = profile.strengths
      .map((s) => `<li>${escapeHtml(s)}</li>`)
      .join("");

    const skills = $("#skills-grid");
    skills.innerHTML = profile.skillGroups
      .map(
        (g) => `
        <article class="card skill-card">
          <h3>${escapeHtml(g.category)}</h3>
          <ul>${g.items.map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
        </article>`
      )
      .join("");

    const timeline = $("#experience-timeline");
    timeline.innerHTML = profile.experience
      .map(
        (exp) => `
        <li class="timeline-item">
          <p class="timeline-period">${escapeHtml(exp.period)}</p>
          <h3>${escapeHtml(exp.role)}</h3>
          <p class="timeline-org">${escapeHtml(exp.organization)}${exp.location ? " · " + escapeHtml(exp.location) : ""}</p>
          <ul>${exp.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>
        </li>`
      )
      .join("");

    const education = $("#education-list");
    education.innerHTML = profile.education
      .map((edu) => {
        const meta = [edu.institution, edu.location].filter(Boolean).join(" · ");
        const details =
          edu.details && edu.details.length
            ? `<ul>${edu.details.map((d) => `<li>${escapeHtml(d)}</li>`).join("")}</ul>`
            : "";
        return `
        <article class="card edu-card">
          <p class="timeline-period">${escapeHtml(edu.period)}</p>
          <h3>${escapeHtml(edu.title)}</h3>
          <p class="edu-meta">${escapeHtml(meta)}</p>
          ${details}
        </article>`;
      })
      .join("");

    const projects = $("#projects-grid");
    projects.innerHTML = profile.projects
      .map((p) => {
        const tags = p.tech.map((t) => `<span>${escapeHtml(t)}</span>`).join("");
        const link =
          p.linkUrl && p.linkUrl !== "#"
            ? `<a class="btn secondary" href="${escapeHtml(p.linkUrl)}">${escapeHtml(p.linkLabel)}</a>`
            : "";
        return `
        <article class="card project-card" id="projekt-${p.name === "LSS & självbestämmande" ? "lss" : escapeHtml(p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}">
          <h3>${escapeHtml(p.name)}</h3>
          <p class="muted">${escapeHtml(p.description)}</p>
          <div class="tech-tags">${tags}</div>
          ${link}
        </article>`;
      })
      .join("");

    const contact = $("#contact-info");
    contact.innerHTML = `
      <p><strong>${escapeHtml(profile.name)}</strong></p>
      <p>${escapeHtml(profile.location)}</p>
      <p><a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a></p>
      <p><a href="tel:${escapeHtml(profile.phone.replace(/\s/g, ""))}">${escapeHtml(profile.phone)}</a></p>
      <p><a href="${escapeHtml(profile.linkedInUrl)}" target="_blank" rel="noopener noreferrer">LinkedIn-profil</a></p>
    `;
  }

  async function loadProfile() {
    try {
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error("API");
      const profile = await res.json();
      renderProfile(profile);
    } catch {
      $("#hero-eyebrow").textContent = "Kunde inte ladda profil";
      $("#hero-summary").textContent =
        "Starta Spring Boot-servern (mvn spring-boot:run) för att visa innehåll från API:t.";
    }
  }

  function setupNav() {
    const toggle = $("#nav-toggle");
    const nav = $("#site-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => nav.classList.remove("is-open"));
    });
  }

  function setupContactForm() {
    const form = $("#contact-form");
    const status = $("#form-status");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "";
      status.className = "form-status";

      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),
      };

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          status.textContent = body.message || "Kontrollera formuläret och försök igen.";
          status.classList.add("err");
          return;
        }
        status.textContent = body.message || "Meddelande skickat!";
        status.classList.add("ok");
        form.reset();
      } catch {
        status.textContent = "Nätverksfel – försök igen senare.";
        status.classList.add("err");
      }
    });
  }

  $("#year").textContent = String(new Date().getFullYear());
  setupNav();
  setupContactForm();
  loadProfile();
})();
