import { portfolioData } from '../data';
import { useLocalTime } from '../lib/hooks';
import * as Icon from './Icons';
import Section from './Section';

const { personalInfo } = portfolioData;

const channels = [
  { label: 'GitHub', handle: 'Hydra-Of-Malice', href: personalInfo.github, icon: Icon.Github },
  { label: 'LinkedIn', handle: 'aditya-arnav', href: personalInfo.linkedin, icon: Icon.Linkedin },
  { label: 'LeetCode', handle: 'HydraOfMalice', href: personalInfo.leetcode, icon: Icon.Code },
];

export function Contact() {
  const time = useLocalTime(personalInfo.timezone);

  return (
    <Section id="contact" eyebrow="07 / Contact" title="Let's talk">
      {/* The one place on the page with a lit surface — it should read as the
          end of the argument. */}
      <div
        className="card relative overflow-hidden p-6 text-center sm:p-10"
        style={{
          backgroundImage:
            'radial-gradient(120% 100% at 50% 0%, var(--glow-a), transparent 60%)',
        }}
      >
        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Happy to talk about inference infrastructure, agent architectures, or anything that has
          to stay up at 3am.
        </h3>

        <p className="mx-auto mt-3 max-w-[30rem] text-dim">
          I read everything that lands in my inbox and usually reply within a day.
        </p>

        <p className="mt-6">
          <a href={`mailto:${personalInfo.email}`} className="btn btn-primary">
            <Icon.Mail className="h-4 w-4" />
            {personalInfo.email}
          </a>
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {channels.map(({ label, handle, href, icon: Glyph }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer" className="btn">
                <Glyph className="h-3.5 w-3.5" />
                {handle}
              </a>
            </li>
          ))}
        </ul>

        <p className="meta mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span className="inline-flex items-center gap-1.5">
            <Icon.MapPin className="h-3.5 w-3.5" />
            {personalInfo.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon.Clock className="h-3.5 w-3.5" />
            {time} local
          </span>
        </p>
      </div>
    </Section>
  );
}

export default Contact;
