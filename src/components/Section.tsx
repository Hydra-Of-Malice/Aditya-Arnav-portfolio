import type { ReactNode } from 'react';

type Props = {
  id: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
};

export default function Section({ id, title, intro, children }: Props) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <header className="section__head">
          <h2 id={`${id}-title`}>{title}</h2>
          {intro && <p>{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
