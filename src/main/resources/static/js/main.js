(function () {
  const $ = (sel, root = document) => root.querySelector(sel);

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function initials(name) {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase();
  }

  function renderAvatar(profile) {
    const avatar = $(".avatar");
    if (!avatar) return;
    avatar.textContent = "";
    avatar.classList.remove("avatar--photo");
    if (profile.photoUrl) {
      const img = document.createElement("img");
      const base = window.location.href.replace(/[^/]*$/, "");
      img.src = profile.photoUrl.startsWith("http")
        ? profile.photoUrl
        : new URL(profile.photoUrl, base).href;
      img.alt = profile.name;
      img.className = "avatar-img";
      img.addEventListener("error", () => {
        avatar.classList.remove("avatar--photo");
        avatar.textContent = initials(profile.name);
      });
      avatar.classList.add("avatar--photo");
      avatar.appendChild(img);
    } else {
      avatar.textContent = initials(profile.name);
    }
  }

  function renderProfile(profile) {
    renderAvatar(profile);
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
      ...profile.languages.map((l) => `${l.language}: ${l.level}`),
    ]
      .filter(Boolean)
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
      <p><a href="${escapeHtml(profile.linkedInUrl)}" target="_blank" rel="noopener noreferrer">LinkedIn-profil</a></p>
    `;
  }

  async function loadProfile() {
    const sources = ["api/profile", "data/profile.json"];
    for (const source of sources) {
      try {
        const res = await fetch(source);
        if (!res.ok) continue;
        const profile = await res.json();
        if (!profile || !profile.name) continue;
        renderProfile(profile);
        return;
      } catch {
        // Nästa källa: API lokalt, JSON på GitHub Pages.
      }
    }
    $("#hero-eyebrow").textContent = "Kunde inte ladda profil";
    $("#hero-summary").textContent = "Profilen kunde inte hämtas just nu.";
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

    const button = form.querySelector("button[type=submit]");

    if (new URLSearchParams(location.search).get("skickat") === "1") {
      status.textContent = "Tack! Mejlet är skickat.";
      status.classList.add("ok");
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "";
      status.className = "form-status";

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || message.length < 10) {
        status.textContent = "Fyll i namn, e-post och ett meddelande på minst 10 tecken.";
        status.classList.add("err");
        return;
      }

      button.disabled = true;
      try {
        const res = await fetch("https://formsubmit.co/ajax/yoenia.malmebo@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: "Meddelande från portföljen",
            _replyto: email,
            _template: "table",
            _captcha: "false",
            _next: (() => {
              const url = new URL(window.location.href);
              url.searchParams.set("skickat", "1");
              url.hash = "kontakt";
              return url.toString();
            })(),
          }),
        });
        const body = await res.json().catch(() => ({}));
        const note = String(body.message || "");
        const sent = String(body.success).toLowerCase() === "true";
        if (/activat|confirm/i.test(note)) {
          status.textContent =
            "Ett mejl från FormSubmit har skickats till yoenia.malmebo@gmail.com. Öppna det (kolla även skräppost) och klicka på Activate Form. Bekräfta inte via deras exempelformulär.";
          status.classList.add("err");
          return;
        }
        if (!res.ok || !sent) {
          status.textContent = "Kunde inte skicka mejlet. Försök igen om en stund.";
          status.classList.add("err");
          return;
        }
        status.textContent = "Tack! Mejlet är skickat.";
        status.classList.add("ok");
        form.reset();
      } catch {
        status.textContent = "Kunde inte skicka mejlet. Försök igen om en stund.";
        status.classList.add("err");
      } finally {
        button.disabled = false;
      }
    });
  }

  $("#year").textContent = String(new Date().getFullYear());
  setupNav();
  setupContactForm();
  loadProfile();
})();
