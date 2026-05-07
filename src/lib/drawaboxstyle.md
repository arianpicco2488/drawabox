# Drawabox.com — Visual Style Guide
> Extracted for use with Claude Code + Playwright re-skinning

---

## 1. Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#e49944` | Brand accent, CTA buttons, active states, tile color |
| `--color-primary-dark` | `#c47c20` | Hover state for primary |
| `--color-bg` | `#1a1a1a` | Page background (dark theme) |
| `--color-surface` | `#242424` | Cards, panels, nav surface |
| `--color-surface-raised` | `#2e2e2e` | Hover states, elevated cards |
| `--color-border` | `#383838` | Dividers, card borders |
| `--color-text-primary` | `#e8e8e8` | Main body text |
| `--color-text-secondary` | `#a0a0a0` | Subtitles, metadata, timestamps |
| `--color-text-muted` | `#666666` | Placeholders, disabled states |
| `--color-link` | `#e49944` | Inline links |
| `--color-link-hover` | `#f0b060` | Link hover |

> The site uses a **dark-on-warm** scheme: near-black backgrounds with an orange/amber primary accent (`#e49944`) consistently used across the logo, buttons, icons, and highlights.

---

## 2. Typography

### Font Families
The site uses a clean, system-safe sans-serif stack with slightly condensed weight for headings.

```css
/* Headings */
font-family: 'Helvetica Neue', Arial, sans-serif;
font-weight: 700;
letter-spacing: -0.02em;

/* Body */
font-family: 'Helvetica Neue', Arial, sans-serif;
font-weight: 400;
line-height: 1.6;

/* UI / Nav labels */
font-family: 'Helvetica Neue', Arial, sans-serif;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.08em;
font-size: 0.75rem;
```

### Type Scale

| Role | Size | Weight | Notes |
|---|---|---|---|
| `h1` hero | `2.4rem` | 700 | "Start your journey today" |
| `h2` section | `1.5rem` | 700 | Section headers |
| `h3` card title | `1rem` | 700 | Submission/card titles |
| `h4` card sub | `0.875rem` | 400 | Username, lesson name |
| `h5` timestamp | `0.75rem` | 400 | Muted, italic |
| Body | `1rem` | 400 | Line-height 1.65 |
| Caption | `0.8125rem` | 400 | Footer links, site map |
| Nav label | `0.75rem` | 600 | Uppercase, spaced |

---

## 3. Layout & Grid

### Page Structure
```
┌─────────────────────────────────────────────┐
│  ANNOUNCEMENT BANNER (collapsible)          │
├─────────────────────────────────────────────┤
│  TOP NAV: Logo | Nav Links | Social | Login │
├─────────────────────────────────────────────┤
│  HERO: h1 + description + CTA              │
├─────────────────────────────────────────────┤
│  3-COLUMN CONTENT SECTION                  │
│  [Homework] [Discussions] [Sketchbooks]    │
├─────────────────────────────────────────────┤
│  LESSON GRID (cards with thumbnails)       │
├─────────────────────────────────────────────┤
│  FOOTER (site map + socials + legal)       │
└─────────────────────────────────────────────┘
```

### Container & Spacing
```css
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Section vertical rhythm */
section { padding: 3rem 0; }
section + section { border-top: 1px solid var(--color-border); }

/* Card grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

/* Community 3-col layout */
.community-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
```

### Breakpoints
```css
/* Mobile first */
@media (max-width: 480px)  { /* single column */ }
@media (max-width: 768px)  { /* stack community cols */ }
@media (max-width: 1024px) { /* reduce card columns */ }
```

---

## 4. Navigation

### Top Bar
- **Height:** ~60px
- **Background:** `#1a1a1a` (same as page bg) with subtle `border-bottom: 1px solid #333`
- **Logo:** PNG image, ~140px wide, left-aligned
- **Nav links:** Icon-based (PNG icons) with text labels hidden on desktop, shown on hover; uppercase small caps
- **Social icons:** 24×24px icon buttons, right-aligned
- **Login:** Text link, `#e49944`, right edge
- **Mobile nav:** Hamburger toggle → slide-down overlay, full-width links

### Announcement Banner
- Background: slightly lighter than body (`#242424`)
- Orange/amber accent border-left or background treatment
- Collapsible with JS; remembers state
- Contains sponsor logo + CTA buttons

---

## 5. Components

### Cards (Community Submissions)
```css
.card {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.4);
  border-color: var(--color-primary);
}

/* Thumbnail: full-width image top, 16:9 aspect ratio */
.card-thumb {
  aspect-ratio: 16/9;
  width: 100%;
  object-fit: cover;
}

/* Text content below image */
.card-body {
  padding: 0.75rem 1rem;
}

.card-title   { font-size: 0.9375rem; font-weight: 700; color: var(--color-text-primary); }
.card-author  { font-size: 0.8125rem; color: var(--color-primary); }
.card-meta    { font-size: 0.75rem; color: var(--color-text-secondary); font-style: italic; }
```

### Lesson Cards (with thumbnail images)
- Larger card format, portrait/square thumbnails
- Title overlaid at the bottom with a dark gradient overlay
- Border-radius: `6px`
- Hover: lift + amber border glow

### Buttons
```css
/* Primary CTA */
.btn-primary {
  background: var(--color-primary);
  color: #1a1a1a;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 0.625rem 1.5rem;
  border-radius: 3px;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  transition: background 0.15s;
}
.btn-primary:hover { background: var(--color-primary-dark); }

/* Secondary / outline */
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  /* same padding/radius as primary */
}
.btn-secondary:hover {
  background: var(--color-primary);
  color: #1a1a1a;
}

/* Text link button */
.btn-text {
  color: var(--color-primary);
  font-weight: 600;
  text-decoration: underline;
  background: none;
  border: none;
}
```

### Section Headers
```css
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-primary);
}

.section-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-primary);
}

.section-header a {
  font-size: 0.8125rem;
  color: var(--color-primary);
}
```

### Footer
```css
footer {
  background: #111;
  border-top: 3px solid var(--color-primary);
  padding: 2.5rem 0;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}

footer a { color: var(--color-text-secondary); }
footer a:hover { color: var(--color-primary); }

.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

footer h4 {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
}
```

---

## 6. Iconography & Imagery

- **Icons:** Small PNG icons (~24px), amber/orange tint matching brand color
- **Thumbnails:** Lesson cover art — illustrative, rendered with soft lighting; always `object-fit: cover`
- **Logo:** Image-based (`drawabox-logo.png`), white/light on dark
- **Social icons:** Patreon, YouTube, Discord — standard platform colors on dark bg
- **Image overlays:** Dark gradient on lesson card bottom thirds for text legibility

---

## 7. Micro-interactions & Motion

```css
/* All transitions use ease, short duration */
* { transition-timing-function: ease; }

/* Standard interactive transition */
a, button, .card { transition: all 0.15s ease; }

/* Image hover on community submissions — second image fades in */
.card .card-thumb-alt {
  position: absolute;
  top: 0; left: 0;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.card:hover .card-thumb-alt { opacity: 1; }
```

---

## 8. Playwright Automation Notes

When using Playwright to re-skin this site, target these selectors:

| Element | CSS Selector | Notes |
|---|---|---|
| Nav bar | `header`, `nav` | Top fixed/static bar |
| Logo | `header img[src*="drawabox-logo"]` | Replace src or apply filter |
| Nav links | `nav a`, `nav ul li a` | Icon + label pairs |
| Hero section | `.hero`, `main > section:first-child` | h1 + p + CTA |
| Section headers | `h2`, `.section-title` | Amber border-bottom |
| Community cards | `.submission-list li`, `.card` | Thumbnail + text |
| Lesson grid | `.lesson-list`, `.lessons` | Image cards |
| Footer | `footer` | 3-col grid |
| Announcement | `.announcement`, `#announcement-bar` | Collapsible banner |
| Primary color refs | `[style*="#e49944"]`, `[style*="e49944"]` | Inline color overrides |

### Playwright CSS Override Script Pattern
```javascript
// Inject custom CSS to re-skin
await page.addStyleTag({
  content: `
    :root {
      --color-primary: #YOUR_COLOR;
      --color-bg: #YOUR_BG;
    }
    /* Override specific elements */
    header { background: var(--color-bg) !important; }
    .btn-primary { background: var(--color-primary) !important; }
  `
});
```

### Screenshot Targets for Visual Regression
```javascript
const selectors = [
  'header',           // Navigation
  '.hero',            // Hero section  
  '.community-grid',  // 3-col community
  '.lesson-grid',     // Lesson cards
  'footer',           // Footer
];
```

---

## 9. Design Tokens (CSS Custom Properties)

Put this in a `:root` block for easy theming:

```css
:root {
  /* Colors */
  --color-primary:        #e49944;
  --color-primary-dark:   #c47c20;
  --color-primary-light:  #f0b060;
  --color-bg:             #1a1a1a;
  --color-surface:        #242424;
  --color-surface-raised: #2e2e2e;
  --color-border:         #383838;
  --color-text-primary:   #e8e8e8;
  --color-text-secondary: #a0a0a0;
  --color-text-muted:     #666666;

  /* Typography */
  --font-sans:        'Helvetica Neue', Arial, sans-serif;
  --font-size-base:   1rem;
  --line-height-body: 1.65;

  /* Spacing scale */
  --space-xs:  0.25rem;
  --space-sm:  0.5rem;
  --space-md:  1rem;
  --space-lg:  1.5rem;
  --space-xl:  2rem;
  --space-2xl: 3rem;

  /* Radii */
  --radius-sm: 3px;
  --radius-md: 6px;

  /* Shadows */
  --shadow-card:  0 2px 8px rgba(0,0,0,0.3);
  --shadow-hover: 0 6px 20px rgba(0,0,0,0.5);

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-mid:  0.25s ease;
}
```

---

## 10. Brand Voice / Content Patterns

- **Tone:** Direct, no-nonsense, educational. Encourages hard work.
- **CTAs:** Action-forward — "Get Started", "View more homework", "Jump in with Lesson 0!"
- **Section labels:** Title-cased, amber underline border
- **Timestamps:** Italicized, muted, relative or full date
- **Community emphasis:** Student work is prominently featured above the fold

---

*Guide generated from visual analysis of drawabox.com — May 2026*
