import type { ReactNode } from 'react';
import { useReveal } from '../lib/hooks';

interface SectionProps {
  id: string;
  /** Mono eyebrow above the heading, e.g. "02 — Experience". */
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

/**
 * Every section opens the same way: an eyebrow chip, a heading, an optional
 * line of intro. The whole block fades up out of blur when it reaches the fold.
 */
export function Section({ id, eyebrow, title, intro, children }: SectionProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <section ref={ref} id={id} className="reveal mt-16 scroll-mt-24 md:mt-20">
      <header className="mb-6">
        <span className="badge badge-accent">
          <span aria-hidden className="h-1 w-1 rounded-full bg-current" />
          {eyebrow}
        </span>
        <h2 className="heading mt-4">{title}</h2>
        {intro && <p className="mt-2 max-w-[38rem] text-dim">{intro}</p>}
      </header>
      {children}
    </section>
  );
}

export default Section;
