import type { Source } from '../data';

type Props = {
  items: Source[];
  /** What the links are evidence for. Read out by screen readers. */
  about: string;
};

/** The site's signature: a claim followed by the links that prove it. */
export default function Sources({ items, about }: Props) {
  if (items.length === 0) return null;
  return (
    <span className="sources">
      {items.map((s) => (
        <a
          className="src"
          href={s.href}
          key={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${about}: open the ${s.kind}`}
        >
          [{s.kind}]
        </a>
      ))}
    </span>
  );
}
