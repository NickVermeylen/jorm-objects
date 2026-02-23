# jorm.objects Static Website — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a brutalist static website for jorm.objects design studio with portfolio, inquiry-based shop, about, and contact pages.

**Architecture:** Plain HTML + CSS, no build tools. Single shared CSS file. All pages link to the same stylesheet and Google Fonts. Category filtering on the Work page uses minimal vanilla JS. Mobile hamburger nav uses vanilla JS.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript (minimal — filters + mobile nav only), Google Fonts (Space Mono)

**Design doc:** `docs/plans/2026-02-23-jorm-objects-design.md`

---

### Task 1: Project Scaffold & CSS Foundation

**Files:**
- Create: `css/style.css`
- Create: `index.html` (minimal shell only — will be built out in Task 3)

**Step 1: Create the CSS file with reset, variables, and base styles**

Create `css/style.css`:

```css
/* ========================================
   jorm.objects — Global Styles
   ======================================== */

/* --- Reset --- */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* --- Variables --- */
:root {
  --bg: #F0EDE8;
  --text: #1A1A1A;
  --accent: #89CFF0;
  --border: #000000;
  --border-width: 2px;
  --font: 'Space Mono', monospace;
}

/* --- Base --- */
html {
  font-size: 16px;
}

body {
  font-family: var(--font);
  background-color: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

a {
  color: var(--text);
  text-decoration: none;
}

a:hover {
  color: var(--accent);
}

img {
  display: block;
  max-width: 100%;
}

h1, h2, h3, h4 {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  line-height: 1.1;
  font-weight: 700;
}

/* --- Utilities --- */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
```

**Step 2: Create minimal index.html shell to verify font loading**

Create `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>jorm.objects</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <h1>jorm.objects</h1>
  <p>Design studio — coming soon.</p>
</body>
</html>
```

**Step 3: Verify in browser**

Run: `open index.html` (or use Live Server)
Expected: Page loads with Space Mono font, off-white background, near-black text, no margins/padding issues.

**Step 4: Commit**

```bash
git add css/style.css index.html
git commit -m "feat: project scaffold with CSS foundation and font setup"
```

---

### Task 2: Navigation & Footer

**Files:**
- Modify: `css/style.css` (append nav and footer styles)
- Modify: `index.html` (add nav and footer markup)

**Step 1: Add navigation and footer CSS to `css/style.css`**

Append to `css/style.css`:

```css
/* --- Navigation --- */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: var(--border-width) solid var(--border);
  position: sticky;
  top: 0;
  background-color: var(--bg);
  z-index: 100;
}

.nav__logo {
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav__links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav__links a {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 400;
}

.nav__links a:hover {
  color: var(--accent);
}

.nav__links a.active {
  color: var(--accent);
}

/* Hamburger */
.nav__hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font);
  font-size: 1.5rem;
  color: var(--text);
}

/* Mobile overlay */
.nav__overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: var(--text);
  z-index: 200;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.nav__overlay.open {
  display: flex;
}

.nav__overlay a {
  color: var(--bg);
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
}

.nav__overlay a:hover {
  color: var(--accent);
}

.nav__close {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  background: none;
  border: none;
  color: var(--bg);
  font-size: 2rem;
  cursor: pointer;
  font-family: var(--font);
}

/* --- Footer --- */
.footer {
  border-top: var(--border-width) solid var(--border);
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 4rem;
}

.footer__links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}

.footer__links a:hover {
  color: var(--accent);
}

/* --- Mobile --- */
@media (max-width: 768px) {
  .nav__links {
    display: none;
  }

  .nav__hamburger {
    display: block;
  }

  .footer {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
```

**Step 2: Update `index.html` with nav and footer markup**

Replace the `<body>` contents of `index.html` with the nav, a placeholder main, and the footer. Include the mobile overlay and a small inline `<script>` at the bottom for hamburger toggle:

```html
<body>
  <nav class="nav">
    <a href="index.html" class="nav__logo">jorm.objects</a>
    <ul class="nav__links">
      <li><a href="work.html">Work</a></li>
      <li><a href="shop.html">Shop</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
    <button class="nav__hamburger" aria-label="Menu">&#9776;</button>
  </nav>

  <div class="nav__overlay">
    <button class="nav__close" aria-label="Close">&times;</button>
    <a href="work.html">Work</a>
    <a href="shop.html">Shop</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </div>

  <main>
    <h1>jorm.objects</h1>
  </main>

  <footer class="footer">
    <span>&copy; 2026 jorm.objects</span>
    <ul class="footer__links">
      <li><a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a></li>
    </ul>
  </footer>

  <script>
    document.querySelector('.nav__hamburger').addEventListener('click', () => {
      document.querySelector('.nav__overlay').classList.add('open');
    });
    document.querySelector('.nav__close').addEventListener('click', () => {
      document.querySelector('.nav__overlay').classList.remove('open');
    });
  </script>
</body>
```

**Step 3: Verify in browser**

- Desktop: sticky nav with logo left, links right, footer at bottom.
- Resize to mobile: links hidden, hamburger visible. Click hamburger: full-screen black overlay with white links. Click X: overlay closes.

**Step 4: Commit**

```bash
git add css/style.css index.html
git commit -m "feat: add navigation and footer with mobile hamburger"
```

---

### Task 3: Home Page

**Files:**
- Modify: `css/style.css` (append home page styles)
- Modify: `index.html` (build out `<main>` content)

**Step 1: Add home page CSS to `css/style.css`**

Append to `css/style.css`:

```css
/* --- Home: Hero --- */
.hero {
  padding: 6rem 2rem 4rem;
  border-bottom: var(--border-width) solid var(--border);
}

.hero__title {
  font-size: 15vw;
  line-height: 0.9;
  text-transform: lowercase;
}

.hero__tagline {
  font-size: 1rem;
  margin-top: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

/* --- Home: Featured Grid --- */
.featured {
  padding: 4rem 2rem;
}

.featured__heading {
  font-size: 1rem;
  margin-bottom: 2rem;
  letter-spacing: 0.15em;
}

.featured__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: var(--border-width) solid var(--border);
}

.featured__item {
  border: var(--border-width) solid var(--border);
  display: block;
}

.featured__img {
  width: 100%;
  aspect-ratio: 4 / 3;
  background-color: #C0C0C0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #666;
  border-bottom: var(--border-width) solid var(--border);
}

.featured__label {
  padding: 1rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.featured__item:hover .featured__label {
  color: var(--accent);
}

/* --- Home: Intro --- */
.intro {
  padding: 4rem 2rem;
  max-width: 700px;
  border-bottom: var(--border-width) solid var(--border);
}

.intro p {
  font-size: 1rem;
  line-height: 1.8;
}

/* --- Home: Shop CTA --- */
.shop-cta {
  display: block;
  padding: 3rem 2rem;
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-bottom: var(--border-width) solid var(--border);
}

.shop-cta:hover {
  background-color: var(--accent);
  color: var(--text);
}

/* --- Mobile overrides --- */
@media (max-width: 768px) {
  .hero__title {
    font-size: 20vw;
  }

  .featured__grid {
    grid-template-columns: 1fr;
  }
}
```

**Step 2: Build out the `<main>` in `index.html`**

Replace the `<main>` section:

```html
<main>
  <section class="hero">
    <h1 class="hero__title">jorm.objects</h1>
    <p class="hero__tagline">Objects for living — furniture, sculpture, form</p>
  </section>

  <section class="featured">
    <h2 class="featured__heading">Selected Work</h2>
    <div class="featured__grid">
      <a href="work/arc-bench.html" class="featured__item">
        <div class="featured__img">800 &times; 600</div>
        <div class="featured__label">Arc Bench — 2025</div>
      </a>
      <a href="work/void-shelf.html" class="featured__item">
        <div class="featured__img">800 &times; 600</div>
        <div class="featured__label">Void Shelf — 2024</div>
      </a>
      <a href="work/tension-lamp.html" class="featured__item">
        <div class="featured__img">800 &times; 600</div>
        <div class="featured__label">Tension Lamp — 2024</div>
      </a>
      <a href="work/mass-object.html" class="featured__item">
        <div class="featured__img">800 &times; 600</div>
        <div class="featured__label">Mass Object I — 2023</div>
      </a>
    </div>
  </section>

  <section class="intro container">
    <p>jorm.objects is a multidisciplinary design studio exploring the tension between form and function. We create furniture, sculptural objects, and functional art — each piece shaped by material honesty, structural clarity, and the beauty of restraint.</p>
  </section>

  <a href="shop.html" class="shop-cta">Shop Available Pieces &rarr;</a>
</main>
```

**Step 3: Verify in browser**

- Large hero text fills the width, tagline below
- 2-column grid of featured work with gray placeholders
- Intro paragraph, shop CTA block with hover turning baby blue

**Step 4: Commit**

```bash
git add css/style.css index.html
git commit -m "feat: build home page with hero, featured grid, intro, and shop CTA"
```

---

### Task 4: Work Page & Filters

**Files:**
- Create: `work.html`
- Modify: `css/style.css` (append work grid and filter styles)

**Step 1: Add work page CSS to `css/style.css`**

Append to `css/style.css`:

```css
/* --- Work/Shop: Page Header --- */
.page-header {
  padding: 4rem 2rem 2rem;
  border-bottom: var(--border-width) solid var(--border);
}

.page-header h1 {
  font-size: 3rem;
}

/* --- Filters --- */
.filters {
  display: flex;
  gap: 0;
  border-bottom: var(--border-width) solid var(--border);
}

.filters__btn {
  font-family: var(--font);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-right: var(--border-width) solid var(--border);
  cursor: pointer;
  color: var(--text);
}

.filters__btn:hover,
.filters__btn.active {
  background-color: var(--accent);
}

/* --- Work/Shop: Grid --- */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-left: var(--border-width) solid var(--border);
}

.grid__item {
  border-right: var(--border-width) solid var(--border);
  border-bottom: var(--border-width) solid var(--border);
  display: block;
}

.grid__img {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #C0C0C0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: #666;
  text-transform: uppercase;
  border-bottom: var(--border-width) solid var(--border);
}

.grid__info {
  padding: 1rem;
}

.grid__title {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
}

.grid__meta {
  font-size: 0.75rem;
  margin-top: 0.25rem;
  color: #666;
}

.grid__item:hover .grid__title {
  color: var(--accent);
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .filters {
    flex-wrap: wrap;
  }

  .page-header h1 {
    font-size: 2rem;
  }
}
```

**Step 2: Create `work.html`**

Full page with nav, filters, grid of 6 placeholder items, and footer. Copy the nav/footer from `index.html`. Set `work.html` link as `.active` in the nav. Add filter JS at the bottom:

```html
<!-- Items use data-category attribute, e.g.: -->
<a href="work/arc-bench.html" class="grid__item" data-category="furniture">...</a>

<!-- Filter script: -->
<script>
  document.querySelector('.nav__hamburger').addEventListener('click', () => {
    document.querySelector('.nav__overlay').classList.add('open');
  });
  document.querySelector('.nav__close').addEventListener('click', () => {
    document.querySelector('.nav__overlay').classList.remove('open');
  });

  const buttons = document.querySelectorAll('.filters__btn');
  const items = document.querySelectorAll('.grid__item');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      items.forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.category === cat) ? '' : 'none';
      });
    });
  });
</script>
```

Use these 6 placeholder items with categories: `furniture` (Arc Bench, Void Shelf), `lighting` (Tension Lamp), `sculpture` (Mass Object I, Form Study II), `objects` (Ritual Vessel).

**Step 3: Verify in browser**

- Filter buttons work: clicking "FURNITURE" hides non-furniture items, "ALL" shows all
- Grid is 3 columns on desktop, 2 on tablet, 1 on mobile

**Step 4: Commit**

```bash
git add work.html css/style.css
git commit -m "feat: add work page with filterable project grid"
```

---

### Task 5: Work Detail Pages

**Files:**
- Create: `work/arc-bench.html`
- Create: `work/void-shelf.html`
- Create: `work/tension-lamp.html`
- Modify: `css/style.css` (append detail page styles)

**Step 1: Add detail page CSS to `css/style.css`**

Append to `css/style.css`:

```css
/* --- Detail Page --- */
.detail {
  padding: 4rem 2rem;
}

.detail__back {
  display: inline-block;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
}

.detail__back:hover {
  color: var(--accent);
}

.detail__title {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.detail__year {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 3rem;
  text-transform: uppercase;
}

.detail__images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: var(--border-width) solid var(--border);
  margin-bottom: 3rem;
}

.detail__img {
  aspect-ratio: 4 / 3;
  background-color: #C0C0C0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: #666;
  text-transform: uppercase;
  border: var(--border-width) solid var(--border);
}

.detail__body {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  max-width: 900px;
}

.detail__description {
  font-size: 1rem;
  line-height: 1.8;
}

.detail__specs {
  font-size: 0.85rem;
}

.detail__specs dt {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  margin-top: 1.5rem;
}

.detail__specs dt:first-child {
  margin-top: 0;
}

.detail__specs dd {
  margin-top: 0.25rem;
  color: #666;
}

/* --- Inquire Button (shop detail) --- */
.detail__inquire {
  display: inline-block;
  margin-top: 3rem;
  padding: 1rem 2rem;
  border: var(--border-width) solid var(--border);
  font-family: var(--font);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  background: none;
  cursor: pointer;
  color: var(--text);
}

.detail__inquire:hover {
  background-color: var(--accent);
}

.detail__price {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 2rem;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .detail__images {
    grid-template-columns: 1fr;
  }

  .detail__body {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .detail__title {
    font-size: 2rem;
  }
}
```

**Step 2: Create 3 work detail pages**

Each page follows the same template structure: nav, back link, title, year, image grid (4 placeholders), description, specs (materials, dimensions, category), footer. Use unique placeholder content for each:

- `work/arc-bench.html` — Furniture, Oak + Steel, 180 × 45 × 42 cm
- `work/void-shelf.html` — Furniture, Blackened Ash, 120 × 35 × 200 cm
- `work/tension-lamp.html` — Lighting, Brass + Linen, 30 × 30 × 55 cm

**Step 3: Verify in browser**

- Navigate from work grid to detail page, back link returns to work
- Image grid, specs, and description display correctly
- Responsive: stacks to single column on mobile

**Step 4: Commit**

```bash
git add work/ css/style.css
git commit -m "feat: add work detail pages with image grid and specs"
```

---

### Task 6: Shop Page

**Files:**
- Create: `shop.html`

**Step 1: Create `shop.html`**

Same structure as `work.html` but without filters. Grid items include price. Use 4 placeholder items. Set `shop.html` link as `.active` in nav.

Each grid item adds a `grid__price` element below the title:

```html
<div class="grid__info">
  <div class="grid__title">Arc Bench</div>
  <div class="grid__meta">2025</div>
  <div class="grid__price">&euro;2,400</div>
</div>
```

Add price CSS — append to `css/style.css`:

```css
.grid__price {
  font-size: 0.85rem;
  margin-top: 0.5rem;
  font-weight: 700;
}
```

Use these 4 items with prices: Arc Bench (€2,400), Tension Lamp (€850), Ritual Vessel (€620), Mass Object I (PRICE ON REQUEST).

**Step 2: Verify in browser**

- Grid shows items with prices
- Links lead to shop detail pages (created next task)

**Step 3: Commit**

```bash
git add shop.html css/style.css
git commit -m "feat: add shop page with priced item grid"
```

---

### Task 7: Shop Detail Pages

**Files:**
- Create: `shop/arc-bench.html`
- Create: `shop/tension-lamp.html`
- Create: `shop/ritual-vessel.html`

**Step 1: Create 3 shop detail pages**

Same template as work detail pages but with two additions:
1. A `.detail__price` element showing the price
2. A `.detail__inquire` link/button pointing to `contact.html?piece=PieceName`

Example additions in the detail body:

```html
<div class="detail__price">&euro;2,400</div>
<a href="contact.html?piece=Arc%20Bench" class="detail__inquire">Inquire About This Piece &rarr;</a>
```

**Step 2: Verify in browser**

- Price displayed, inquire button links to contact page
- Same responsive behavior as work detail pages

**Step 3: Commit**

```bash
git add shop/
git commit -m "feat: add shop detail pages with price and inquiry links"
```

---

### Task 8: About Page

**Files:**
- Create: `about.html`
- Modify: `css/style.css` (append about page styles)

**Step 1: Add about page CSS to `css/style.css`**

Append to `css/style.css`:

```css
/* --- About --- */
.about {
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.about__text h2 {
  font-size: 1rem;
  letter-spacing: 0.15em;
  margin-top: 3rem;
  margin-bottom: 1rem;
}

.about__text h2:first-child {
  margin-top: 0;
}

.about__text p {
  line-height: 1.8;
  margin-bottom: 1rem;
}

.about__image {
  aspect-ratio: 3 / 4;
  background-color: #C0C0C0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: #666;
  text-transform: uppercase;
  border: var(--border-width) solid var(--border);
}

.about__press {
  padding: 4rem 2rem;
  border-top: var(--border-width) solid var(--border);
}

.about__press h2 {
  font-size: 1rem;
  letter-spacing: 0.15em;
  margin-bottom: 1.5rem;
}

.about__press ul {
  list-style: none;
}

.about__press li {
  font-size: 0.85rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #ccc;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .about {
    grid-template-columns: 1fr;
  }
}
```

**Step 2: Create `about.html`**

Nav (with About link `.active`), page header, two-column about section (text left with Studio Philosophy + Process sections, image placeholder right), press section below, footer.

Placeholder text for philosophy (~3 sentences), process (~3 sentences), and 4 press mentions.

**Step 3: Verify in browser**

- Two-column layout on desktop, stacks on mobile
- Press section displays as a clean list

**Step 4: Commit**

```bash
git add about.html css/style.css
git commit -m "feat: add about page with bio, process, and press"
```

---

### Task 9: Contact Page

**Files:**
- Create: `contact.html`
- Modify: `css/style.css` (append contact/form styles)

**Step 1: Add contact page CSS to `css/style.css`**

Append to `css/style.css`:

```css
/* --- Contact --- */
.contact {
  padding: 4rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form__group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form__group label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
}

.form__group input,
.form__group select,
.form__group textarea {
  font-family: var(--font);
  font-size: 0.85rem;
  padding: 0.75rem;
  border: var(--border-width) solid var(--border);
  background: none;
  color: var(--text);
  outline: none;
}

.form__group input:focus,
.form__group select:focus,
.form__group textarea:focus {
  border-color: var(--accent);
}

.form__group textarea {
  resize: vertical;
  min-height: 150px;
}

.form__submit {
  font-family: var(--font);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  padding: 1rem 2rem;
  border: var(--border-width) solid var(--border);
  background: none;
  cursor: pointer;
  color: var(--text);
  align-self: flex-start;
}

.form__submit:hover {
  background-color: var(--accent);
}

.contact__info {
  font-size: 0.85rem;
}

.contact__info h2 {
  font-size: 1rem;
  letter-spacing: 0.15em;
  margin-bottom: 1.5rem;
}

.contact__info p {
  line-height: 1.8;
  margin-bottom: 1rem;
}

.contact__info a:hover {
  color: var(--accent);
}

@media (max-width: 768px) {
  .contact {
    grid-template-columns: 1fr;
  }
}
```

**Step 2: Create `contact.html`**

Nav (Contact link `.active`), page header, two-column contact section: form left (Name, Email, Subject dropdown, Message, Submit), studio info right (address, email, Instagram link). Footer.

Add JS at the bottom to pre-fill the Subject dropdown if `?piece=` query param is present:

```javascript
const params = new URLSearchParams(window.location.search);
const piece = params.get('piece');
if (piece) {
  const subject = document.querySelector('#subject');
  subject.value = 'purchase';
  const message = document.querySelector('#message');
  message.value = 'I am interested in: ' + piece;
  message.focus();
}
```

**Step 3: Verify in browser**

- Form displays correctly, focus states show baby blue border
- Visit `contact.html?piece=Arc%20Bench` — subject pre-selects "Purchase Inquiry" and message pre-fills
- Responsive: stacks on mobile

**Step 4: Commit**

```bash
git add contact.html css/style.css
git commit -m "feat: add contact page with inquiry form and pre-fill support"
```

---

### Task 10: Final Polish & Cross-Page Verification

**Files:**
- Possibly modify: any page or `css/style.css` for consistency fixes

**Step 1: Verify all navigation links work across all pages**

Open each page, click every nav link, verify correct `.active` state.

**Step 2: Verify all detail page links work**

- Home featured grid → work detail pages
- Work grid → work detail pages
- Shop grid → shop detail pages
- Shop detail "Inquire" → contact page with pre-fill

**Step 3: Test mobile on all pages**

Resize browser to mobile width. Verify:
- Hamburger works on every page
- All grids stack to single column
- Footer stacks properly
- Forms are usable

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: cross-page consistency and link verification"
```

---
