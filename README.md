# Aditya Arnav — Portfolio

Personal portfolio site. React + TypeScript + Vite, Tailwind CSS v4. No runtime
dependencies beyond React.

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
  data.ts                 all site content — edit this, not the components
  index.css               palette, both themes, base styles, utilities
  lib/
    hooks.ts              theme, scroll-reveal, scroll spy, clock, rotator
  components/
    Dock.tsx              the floating magnifying nav at the bottom
    Icons.tsx             every icon, inline, drawn in a 24-box
    Section.tsx           shared section shell (eyebrow + heading + intro)
    …                     one component per section
```

## Design

A single centred 46rem column on near-black (`#09090b`) or near-white
(`#fbfbfd`), set in **Inter** with **JetBrains Mono** reserved for metadata —
dates, eyebrows, badges, references. One accent throughout: the violet picked
out of the hero artwork.

Everything is cut from four primitives defined as Tailwind utilities in
`index.css`, so the page reads as one system:

- **`card`** — the elevated surface every panel, project and timeline entry uses.
- **`badge`** — the mono pill used for tech stacks, dates and section eyebrows.
- **`btn`** / **`btn-primary`** — the only two button weights.
- **`link`** — inline links, underlined in the accent.

Colours are CSS variables on `:root` / `[data-theme="light"]`, exposed to
Tailwind via `@theme inline`, so components only use semantic names
(`text-dim`, `border-line`, `bg-accent-soft`, …). The theme is applied before
first paint by an inline script in `index.html` and persisted to `localStorage`.

### The dock

Navigation lives in a floating macOS-style dock pinned to the bottom of the
viewport (`Dock.tsx`): section links, then socials, then the theme toggle,
separated by hairlines.

Magnification is driven by **slot distance from whatever is hovered**, not by
cursor position, so nothing is measured at runtime and there is no feedback
loop between an icon's size and its own bounding box. The scale lives on the
button (`transform`, origin bottom) while the width lives on the `<li>`
underneath it — the slot widens first, which is what stops a magnified icon
from colliding with its neighbours. Hovering also raises a tooltip; focus
drives the same state, so the effect works from the keyboard.

The active item is tracked by `useActiveSection`, which marks whichever section
is under the top third of the viewport. Secondary items (Patents, Stack,
Education, LeetCode) are dropped below `sm` so the dock never overflows a phone.

### Motion

Three animations, all in `index.css`:

- **`enter`** — a 16px rise out of a 6px blur. Staggered 90ms across the hero's
  children on load (`.stagger`), fired per section on scroll (`.reveal`), and
  trailed 80ms across rows inside a revealed section (`.trail`).
- **`marquee`** — the tech strip under the hero, doubled and translated -50%.
- **`float`** — the hero artwork, 7s.

`useReveal` sets `data-revealed` via `IntersectionObserver`, falling back to
showing the section outright if the API is unavailable.
`prefers-reduced-motion: reduce` collapses every animation to an instant state
change.
