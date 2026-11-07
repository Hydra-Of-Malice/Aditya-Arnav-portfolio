# Aditya Arnav, portfolio

The source of [adityaarnav.site](https://www.adityaarnav.site), the personal site of an AI engineer. Every claim on the page links to its repo, demo or LinkedIn post.

## Run it

Needs Node.js 20.19 or newer.

```bash
npm install
npm run dev
```

`npm run build` type-checks and builds to `dist/`. `npm run lint` runs oxlint.

## Change the content

The components hold no facts. Edit these two files.

- `src/data.ts` has the bio, projects, patents, results and experience. Each entry carries the links that prove it, in `sources`.
- `src/posts.ts` has the LinkedIn posts.

### Add a LinkedIn post

The site has no LinkedIn feed, so a new post has to be added by hand.

1. Copy the post's link from LinkedIn and take the long number after `activity:` or `activity-`.
2. Add an entry to the top of `posts` in `src/posts.ts` with that id, a date, a category, a title and an excerpt.
3. For a picture, save a copy to `public/linkedin/<id>.webp`. LinkedIn's own image links expire, so they cannot be used directly.

Check any picture first. Leave out QR codes, barcodes, ticket codes and registration numbers.

Design notes are in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
