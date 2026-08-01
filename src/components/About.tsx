import { portfolioData } from '../data';
import Section from './Section';

const { personalInfo } = portfolioData;

const facts = [
  { key: 'Role', value: personalInfo.title },
  { key: 'Based in', value: personalInfo.location },
  { key: 'Studying', value: personalInfo.subtitle },
  { key: 'Focus', value: 'Inference pipelines, agent systems, backend' },
  { key: 'Also', value: 'DGCA-licensed drone pilot' },
];

export function About() {
  return (
    <Section id="about" eyebrow="01 / About" title="A little background">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:gap-10">
        <div className="space-y-4">
          <p>{personalInfo.aboutText}</p>

          <p>
            Most of my work sits between a model and a user: streaming audio into transcription
            without dropping frames, keeping a queue drained under load, making a retrieval layer
            return something a person can actually trust. The interesting problems are rarely in
            the notebook — they show up at the seams.
          </p>

          <p>
            Recently that has meant a meeting-intelligence platform running Faster-Whisper behind
            FastAPI and Redis, a trust-aware orchestration framework filed as a patent, and a
            handful of full-stack products where I owned everything from migrations to the UI.
          </p>
        </div>

        <dl className="card h-fit divide-y divide-[var(--line-soft)] p-1 md:w-64">
          {facts.map((fact) => (
            <div key={fact.key} className="px-3.5 py-2.5">
              <dt className="label">{fact.key}</dt>
              <dd className="mt-0.5 text-[0.8125rem] leading-snug text-title">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

export default About;
