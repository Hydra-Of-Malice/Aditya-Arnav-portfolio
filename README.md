# Aditya Arnav — Portfolio

Personal portfolio site. React + TypeScript + Vite, GSAP, Lenis and
react-three-fiber. The layout and interaction design follow
[hobro.digital](https://hobro.digital/) (Awwwards SOTD), rebuilt from scratch
with the résumé content in `src/data.ts`.

## Commands

```bash
npm install
npm run dev      # dev server
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build
npm run lint     # oxlint
```

## Structure

```
src/
  data.ts                 résumé facts — edit this, not the components
  site.ts                 shapes data.ts into the page's sections and copy
  index.css               imports the three stylesheets below
  styles/
    base.css              tokens, reset, the four type roles, curtains
    chrome.css            loader, cursor, header, buttons, popup, forms
    sections.css          one block per section, top to bottom
  lib/
    gsap.ts               registers every GSAP plugin + the custom eases
    smoothScroll.ts       Lenis (desktop only), scroll lock, scrollToHash
    loader.ts             loaderExited / loaderComplete events
    device.ts             is-desktop / is-mobile (hover + fine pointer)
    popup.ts              event bus for the résumé popup
    hooks.ts              useIsDesktop, useInView
  components/
    Loader, Cursor, Header, ResumePopup       page chrome
    Hero, Stickers, Cta, WhatIDo, Features,   sections, in page order
    Cases (+CasePopup, CaseArt), Vision,
    CtaBand, Numbers, Identity, Contact, Footer
    three/                                    the WebGL scenes
      HeroScene   warm, breathing form + bokeh behind the name
      FeatureScene four scenes swapped in one canvas, follows the cursor
      VisionScene  low-angle meadow behind "Core Vision"
```

## Design

Black and white, one neon green, four type roles:

| role       | face (free stand-in for the reference's licensed one) | used for                          |
| ---------- | ----------------------------------------------------- | --------------------------------- |
| title      | Archivo 900                                           | the huge uppercase headings       |
| cursive    | Instrument Serif italic                               | the counterpoint word in a title  |
| text       | Inter                                                 | body copy, mid-size headings      |
| typewriter | DM Mono                                               | every label, caption and button   |

Everything is CSS custom properties on `:root` in `styles/base.css`; change
`--c-brand-primary` to re-accent the whole site.

### Interactions

- **Loader** — black curtains and a white progress bar; the bar creeps while
  the window loads, then the curtains scale away. `loaderExited` fires as they
  open, `loaderComplete` when the bar is full. Sections key their entrances
  off those.
- **Cursor** — a green dot and a lagging white ring in `difference` blend.
  `.cursor__trigger` grows the ring; `.js-nav-cursor-hover` stretches it into a
  pill around the element. Hover targets are found by delegation.
- **Hero** — the name is rendered letter by letter; letters can be dragged and
  reordered between the two words (SortableJS). The WebGL scene scales in
  behind, and the résumé card slides up from the bottom-right a few seconds
  later (dismissal is remembered for the session).
- **Stickers** — eight tech stickers flashed in sequence inside a white box;
  the headline is revealed per character on scroll.
- **What I Do** — the three title words slide in at different speeds; the
  paragraph is "typed"; five hairlines ripple (MorphSVG) on hover; the dot
  grid shows a random "My approach" quote in a tooltip that follows the
  pointer.
- **Features** — hovering a row paints a black pill behind it, swaps its label
  for two cycling words, and brings up a 3D scene beside the pointer with the
  reference's skew-and-rotate reveal. On touch devices the section pins and
  scrolling steps through the rows.
- **Cases** — "Fresh Drop" has a white cover panel that slides across on
  hover; grid tiles are cut in from a corner as they scroll into view and
  round their corners on hover; every tile opens a full-screen popup with a
  curtain-revealed gallery. Artwork is generated per case (`CaseArt`) from a
  seed and a two-colour palette.
- **Vision** — cursive title and big paragraph revealed per character as you
  scroll, three columns drift up, the email is typed out.
- **Numbers** — counters in the cursive face, and the elliptical "Let's kick
  off" button whose rings part on hover.
- **Identity** — a title wiped in by six curtains, words sliding in from both
  sides, and a draggable (inertia) strip of work / education / patent cards.
- **Contact** — the reference's "Let's Talk" page, folded in as a section.
  Submitting opens a pre-filled mail; there is no backend.

Smooth scrolling is Lenis on desktop and native on mobile. All scroll-driven
animation is GSAP ScrollTrigger. Every WebGL canvas stops rendering when it
is off screen, and `three` is code-split so it loads after the page.

### Accessibility

- Every project tile is an operable button: reachable by Tab, opened with
  Enter or Space, and named "Open case study: …". Both overlays are modal
  dialogs and close on Escape.
- The split display headings ("What I DO", "My core identity", "ARNAV LNK")
  carry an explicit `aria-label`, because their words are separate elements
  and would otherwise be announced run together.
- Form text meets WCAG AA. The dimmed field labels and the idle submit button
  were at 2.2:1 and 1.7:1; they are now above 6:1.
- **`prefers-reduced-motion: reduce`** is honoured properly: the three WebGL
  scenes and the footer canvas never start, Lenis hands scrolling back to the
  browser, every looping CSS keyframe and transition is neutralised, and
  GSAP's global timeline is sped up so entrances land on their end state
  instead of travelling. Scroll-scrubbed text reveals still follow the scroll,
  since they are progress-driven rather than time-driven.

### Things worth knowing

- The device branch (`is-desktop` / `is-mobile`, from `hover` + `pointer` +
  a 1025px floor) is keyed onto `<main>` in `App.tsx`. Crossing that boundary
  by resizing or rotating remounts the sections so they re-initialise for the
  layout they are now in, rather than leaving desktop behaviour on a touch
  device.
- Listeners added inside a `gsap.context()` are **not** removed by
  `ctx.revert()`. Every one is bound to an `AbortController` signal that the
  context's own cleanup fires — without that they accumulate on each remount.
- Only the open case popup is mounted. Keeping all nine in the DOM cost about
  1,100 nodes, a third of the page, for markup nobody had opened.
- `.block-form__head` waits at `translateX(50%)` until its trigger fires, so
  `.block-form` is `overflow-x: clip`; `html`/`body` carry the same guard.
- `<main>` waits for `document.fonts.ready` (racing a 2s timeout) before it
  mounts, because SplitText measures line boxes — splitting against the
  fallback face produced masks sized for the wrong widths. The loader covers
  that wait.
- Both forms open a pre-filled mail; nothing is sent from the page, and the
  success copy says so.

### Known gaps

- No `og:image` / `twitter:image`, so link shares render without a preview
  card. Needs a 1200×630 asset in `public/`.
- `apple-touch-icon` points at the SVG favicon, which iOS ignores; it wants a
  180×180 PNG.
- The critical JS chunk is ~519 kB (GSAP plugins plus SortableJS). Splitting
  the below-the-fold plugins behind a dynamic import would trim it.
