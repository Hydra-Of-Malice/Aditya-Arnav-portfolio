import heroArt from '../assets/hero.png';
import { portfolioData } from '../data';
import { useRotating } from '../lib/hooks';
import * as Icon from './Icons';

const { personalInfo, stats, marquee } = portfolioData;

export function Hero() {
  const { item: role, index } = useRotating(personalInfo.roles);

  return (
    <section id="top" className="stagger scroll-mt-24">
      <p>
        <span className="badge">
          <span aria-hidden className="h-1 w-1 rounded-full bg-current" />
          Available for work
        </span>
      </p>

      <div className="mt-6 flex items-start justify-between gap-8">
        <div className="min-w-0">
          <h1 className="display">
            {personalInfo.name.split(' ')[0]}
            <br />
            {personalInfo.name.split(' ').slice(1).join(' ')}
          </h1>

          <p className="mt-4 text-base text-dim">
            <span className="text-title">{personalInfo.title}</span>
            <span aria-hidden className="mx-2 text-faint">
              /
            </span>
            {/* Keyed so each role re-runs the entrance animation. */}
            <span key={index} className="inline-block [animation:enter_0.5s_ease_both] text-accent">
              {role}
            </span>
          </p>
        </div>

        {/* Decorative only — the page carries no photograph. */}
        <img
          src={heroArt}
          alt=""
          aria-hidden
          width={160}
          height={160}
          className="hidden h-32 w-32 shrink-0 select-none opacity-90 [animation:float_7s_ease-in-out_infinite] sm:block md:h-40 md:w-40"
        />
      </div>

      <p className="mt-6 max-w-[36rem]">
        I build the unglamorous half of machine learning — the queues, the retries, the p99, the
        thing that has to still be running at 3am. Currently reading computer science at VIT
        Vellore and building meeting intelligence at{' '}
        <a href="#experience" className="link">
          Zapper Edge
        </a>
        .
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-2.5">
        <a href={`mailto:${personalInfo.email}`} className="btn btn-primary">
          <Icon.Mail className="h-4 w-4" />
          Get in touch
        </a>
        <a href={personalInfo.github} target="_blank" rel="noreferrer" className="btn">
          <Icon.Github className="h-3.5 w-3.5" />
          GitHub
        </a>
        <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="btn">
          <Icon.Linkedin className="h-3.5 w-3.5" />
          LinkedIn
        </a>
        <span className="meta ml-1 hidden items-center gap-1.5 sm:inline-flex">
          <Icon.MapPin className="h-3.5 w-3.5" />
          {personalInfo.location}
        </span>
      </div>

      <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-elev px-4 py-3.5">
            <dt className="text-xl font-semibold tracking-tight text-title tabular-nums">
              {stat.decimals ? stat.value.toFixed(stat.decimals) : stat.value}
              <span className="text-accent">{stat.suffix}</span>
            </dt>
            <dd className="mt-0.5 text-[0.8125rem] leading-snug text-faint">{stat.label}</dd>
          </div>
        ))}
      </dl>

      <div className="marquee-mask mt-8 overflow-hidden">
        <ul
          aria-hidden
          className="flex w-max gap-2 [animation:marquee_38s_linear_infinite] hover:[animation-play-state:paused]"
        >
          {/* Doubled so the -50% translation loops seamlessly. */}
          {[...marquee, ...marquee].map((tech, i) => (
            <li key={`${tech}-${i}`} className="badge">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Hero;
