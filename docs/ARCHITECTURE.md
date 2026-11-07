# Architecture and design notes

A single page in React, TypeScript and Vite. There is no backend. The contact and résumé forms open the visitor's mail app with the message filled in.

## Structure

```
src/
  data.ts            facts and their sources
  posts.ts           LinkedIn posts
  components/        one file per section, plus Dialog, Section, Sources and Icons
  lib/resume.ts      event bus so any button can open the résumé dialog
  styles/base.css    tokens, reset, buttons, dialog, forms
  styles/sections.css  one block per section, top to bottom
public/
  linkedin/          post images, named by activity id
  work/              screenshots of the live demos
```

## Design

The UI follows the process in [unslop](https://github.com/heydamir/unslop) by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), CC BY 4.0.

- **Product.** An AI and backend engineer whose systems can prove what they claim.
- **Character.** Exact, plainspoken, a little dry.
- **World.** A flight log and audit trail, so warm paper, ink and ruled hairlines.
- **Moments.** The dark trace in the hero, and the photos in the Posts section. The rest of the page stays quiet.
- **Signature.** The `[post]`, `[repo]` and `[demo]` tags in `Sources.tsx`. A claim on this page carries its source.

Type is IBM Plex Sans with IBM Plex Mono for dates, references and sources. Weights stay at 400 and 500. Spacing sits on a 4px grid. Colours are tokens at the top of `base.css`, and every text pair passes 4.5 to 1.

The hero trace shows real demo data from the Orbit workspace in the Minutes repo (`data/work-items/orbit.json`).

## Motion

The hero text and trace fade and rise once on load, and dialogs do the same when they open. Hovers change colour only. `prefers-reduced-motion` turns these off, along with smooth anchor scrolling.

## What stays off the page

- Anything from a private repository. Many of those hold confidential or unfiled patent work.
- Forks where the commits are all teammates' and no post describes the owner's part.
- Post images that show QR codes, barcodes, ticket codes or a student registration number.
