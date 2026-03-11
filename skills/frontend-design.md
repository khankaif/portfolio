---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). ALWAYS use this skill for portfolio websites, personal sites, designer/developer portfolios, case study pages, project showcases, "about me" pages, or any request to present someone's work, identity, or professional brand online. Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

---

## Portfolio Design (Priority Mode)

When the request is for a **portfolio, personal site, or work showcase**, treat this as a specialized high-stakes design task. A portfolio IS the product — it must do two jobs simultaneously: demonstrate taste AND present content. Follow this section before the general guidelines below.

### Portfolio Strategy Questions

Before writing a single line of code, resolve these mentally (or ask the user):

1. **Who is this person?** Designer, developer, photographer, writer, illustrator, filmmaker, creative director? Their discipline should drive every aesthetic decision.
2. **What's the primary CTA?** Hire for freelance? Land a full-time role? Impress clients? The answer shapes hierarchy and tone.
3. **What's the vibe they want to project?** Serious/corporate, playful/experimental, quiet/minimal, maximalist/loud? If not stated, infer from field and any work samples.
4. **How many projects?** 1–3: hero-quality treatment. 4–8: card grid or scrollable list. 8+: filterable gallery.

### Portfolio Anatomy

A strong portfolio has these sections — build them intentionally, not generically:

#### 1. Hero / Above the Fold
The single most important section. Must answer in <3 seconds: who is this person and why should I care?

**Strong hero patterns:**
- Full-viewport typographic statement with a kinetic or animated element
- Name + role + one sharp tagline — not "I make things. I love design." — something that sticks
- A rotating or morphing word that captures their range (e.g., "I build *[fast / beautiful / accessible / weird]* things")
- Background: hero image/reel behind frosted glass, or a canvas animation, or a noise-textured gradient — never a flat solid color
- Subtle scroll cue (animated chevron, fading text, parallax)

**Never:** Generic "Hi, I'm [Name]. Welcome to my portfolio." with no visual energy.

#### 2. Work / Projects
The core of the portfolio. Choose a layout based on work type:

- **Case studies** (UX/product design): Tall cards with project title, role tag, hero image, and hover reveal showing outcome metrics or one-line impact statement
- **Visual work** (illustration, photography, branding): Masonry or asymmetric grid — let the work breathe but create visual rhythm
- **Code projects** (developers): Card grid with tech stack chips, live demo link, GitHub link, and a short punchy description
- **Mixed work**: Categorized with a sticky/animated filter bar

**Hover interactions on project cards are non-negotiable.** Options:
- Image zoom + overlay with project name + role
- Card lifts with a dramatic box-shadow shift
- Color wash overlay matching brand color
- Sliding reveal panel

#### 3. About
Not an afterthought — this is where personality lands:
- Short editorial paragraph + a personal photo with unexpected crop/treatment
- Two-column: left = photo, right = a list of "I believe in…" statements or values
- A timeline or "chapter" format for storytelling-focused people
- Avoid bullet-point skill lists — use tags, or just prose.

#### 4. Contact / CTA
Minimal but present:
- Big centered email address (large type, click-to-copy or mailto link)
- "Let's work together" + email + socials row
- Contact form only if explicitly requested

#### 5. Navigation
- Minimal (3–4 links max: Work, About, Contact, maybe Blog/Resume)
- Sticky or always visible
- Creative treatment: dot indicators, underline-on-hover with color, vertical side nav for editorial feels

---

### Portfolio Aesthetic Archetypes

Pick ONE and commit fully. Never mix:

| Archetype | Fonts | Colors | Motion | Best For |
|-----------|-------|--------|--------|----------|
| **Editorial / Magazine** | Playfair Display + DM Sans | Off-white + ink black + warm accent | Slow fade-ins, parallax | Writers, journalists, senior designers |
| **Brutalist / Raw** | Bebas Neue + Space Mono | White + black + one neon | Jarring snaps, no easing | Developers, experimental creatives |
| **Luxury / Refined** | Cormorant Garamond + Jost | Cream + deep charcoal + gold | Silk transitions, staggered reveals | Brand designers, art directors |
| **Playful / Kinetic** | Clash Display + Cabinet Grotesk | Bold unexpected combos | Bouncy springs, cursor effects | Illustrators, UI designers |
| **Dark / Cinematic** | Neue Haas Grotesk + IBM Plex Mono | Near-black + electric blue/green | Glitch, scanlines, particles | Developers, motion designers, 3D |
| **Soft / Organic** | Fraunces + Nunito | Warm sand + sage + terracotta | Gentle floats, morphing blobs | Photographers, wellness, crafts |
| **Minimal / Swiss** | Neue Haas Grotesk + same | White + black, strict grid | Almost no animation — pure typography | Senior engineers, clean brands |

---

### Portfolio-Specific Code Patterns

#### Scroll Reveal (must-have)
```css
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible { opacity: 1; transform: none; }
.reveal:nth-child(2) { transition-delay: 0.1s; }
.reveal:nth-child(3) { transition-delay: 0.2s; }
```
Use `IntersectionObserver` to add `.visible` when elements enter the viewport.

#### Project Card Hover (must-have)
```css
.project-card {
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.4s ease;
}
.project-card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 32px 64px rgba(0,0,0,0.18);
}
.project-card .overlay { opacity: 0; transition: opacity 0.35s ease; }
.project-card:hover .overlay { opacity: 1; }
```

#### Hero Text Stagger (must-have for hero)
```javascript
const words = document.querySelectorAll('.hero-word');
words.forEach((w, i) => {
  w.style.animationDelay = `${i * 0.12}s`;
  w.classList.add('animate-in');
});
```

#### Custom Cursor (for editorial/luxury/dark archetypes)
```javascript
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
});
```

---

### Portfolio Anti-Patterns (Never Do These)

- ❌ "Welcome to my portfolio" as hero copy
- ❌ Skill bars (HTML: 90%) — they signal nothing
- ❌ "I'm passionate, creative, detail-oriented…" buzzword lists
- ❌ White background + default blue links with no design intent
- ❌ Project cards with no hover state
- ❌ No personality — a portfolio that could belong to anyone
- ❌ Showing every project ever made — curate to 3–6 best
- ❌ Overwhelming footer heavier than the nav
- ❌ Generic stock photography or clipart icons

---

## General Frontend Design Thinking

For non-portfolio requests:

Before coding, commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian.
- **Constraints**: Framework, performance, accessibility.
- **Differentiation**: What makes this UNFORGETTABLE?

Implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

- **Typography**: Avoid Inter, Roboto, Arial. Choose distinctive, characterful fonts. Strong options: Cormorant Garamond, Playfair Display, Fraunces, Clash Display, Bebas Neue, Cabinet Grotesk, DM Serif Display. Pair a display font with a refined body font.
- **Color & Theme**: Commit fully. CSS variables. Dominant colors with sharp accents. Never purple gradients on white.
- **Motion**: High-impact moments over scattered micro-interactions. One orchestrated page load with staggered reveals > scattered random animations. Use IntersectionObserver for scroll triggers.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Grid-breaking elements. Generous negative space OR controlled density — not the timid middle.
- **Backgrounds & Visual Details**: Gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, grain overlays. Never flat solid backgrounds on hero sections.

NEVER: Inter/Roboto/Arial, purple gradients on white, cookie-cutter layouts, generic icon sets without intentional styling, Space Grotesk.

**IMPORTANT**: Match complexity to vision. Maximalist = elaborate, dense, layered. Minimalist = surgical precision, every pixel intentional.

Remember: commit fully to one vision and execute it with craft.