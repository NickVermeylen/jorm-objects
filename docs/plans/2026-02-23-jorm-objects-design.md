# jorm.objects — Static Website Design

## Overview

Static website for jorm.objects, a multidisciplinary design studio working across furniture, product design, art objects, and sculpture. The site serves as both a portfolio showcase and an inquiry-based shop.

## Tech

- Plain HTML + CSS, no build tools, no dependencies
- Single CSS file shared across all pages
- Google Fonts (Space Mono) loaded via `<link>`
- Hosting TBD

## Pages

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Hero, featured work grid, studio intro, shop link |
| Work | `work.html` | Full portfolio grid with category filters |
| Shop | `shop.html` | Available pieces grid with prices, links to inquiry |
| About | `about.html` | Studio story, bio, process, press |
| Contact | `contact.html` | Inquiry form, studio details, social links |
| Work Detail | `work/<slug>.html` | Individual project: images, description, materials |
| Shop Detail | `shop/<slug>.html` | Individual piece: images, price, inquire button |

3-4 placeholder detail pages per section to establish the template.

## Visual Design

### Typography

- Font: Space Mono (monospace) from Google Fonts
- Headings: uppercase, tight letter-spacing, large scale
- Body: same font, smaller size, generous line-height

### Color Palette

| Role | Value |
|------|-------|
| Background | `#F0EDE8` (warm off-white) |
| Text | `#1A1A1A` (near-black) |
| Accent | `#89CFF0` (baby blue) |
| Borders | `#000000` (black, 2-3px) |

### Layout Principles

- Visible grid structure with thick black borders
- No drop shadows, no rounded corners
- Asymmetric layouts where appropriate
- Images at full bleed or in bordered grid cells
- Generous whitespace with deliberate tension
- No transitions or animations — instant state changes
- Hover states: instant color flip (baby blue)

### Mobile

- Single column stack, same raw aesthetic
- Hamburger nav with full-screen overlay (black background, white mono links)

## Page Details

### Home

- Large typographic hero: "jorm.objects" at ~15-20vw, one-line tagline underneath
- 3-4 featured work items in 2-column bordered grid (image + title)
- Brief studio intro paragraph
- Raw "SHOP" link block

### Work

- Filter bar: category tags (ALL / FURNITURE / OBJECTS / SCULPTURE / etc.)
- Active filter gets baby blue background
- 3-column grid (desktop), 2 (tablet), 1 (mobile)
- Each cell: image, title, year, black border
- Detail page: large images, description, materials, dimensions

### Shop

- Same grid as Work, plus price or "PRICE ON REQUEST"
- Detail page adds "INQUIRE ABOUT THIS PIECE" button linking to pre-filled contact form

### About

- Two-column: text left, studio photo placeholder right
- Sections: Studio Philosophy, Process, Press/Features

### Contact

- Form fields: Name, Email, Subject (dropdown: General / Purchase Inquiry / Collaboration / Press), Message
- Form action TBD (mailto, Formspree, or Netlify Forms)
- Studio details: address, email, Instagram

### Footer

- Thin black top border
- Single line: "2026 jorm.objects" left, social links right
