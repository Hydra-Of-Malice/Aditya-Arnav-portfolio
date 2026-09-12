import { useEffect, useRef } from 'react';
import { gsap, SplitText } from '../lib/gsap';
import { stickers } from '../site';
import Cta from './Cta';

/** Eight sticker shapes, one per tech, flashed one after another in a white box. */
function Shape({ variant }: { variant: number }) {
  switch (variant % 8) {
    case 0:
      return <rect x="2" y="2" width="196" height="41" rx="20" fill="#000" />;
    case 1:
      return <path d="M100 1 122 30h76l-60 44 22 70-60-44-60 44 22-70L2 30h76z" fill="#000" transform="scale(1 .35) translate(0 20)" />;
    case 2:
      return <ellipse cx="100" cy="22" rx="98" ry="21" fill="#000" />;
    case 3:
      return <path d="M12 2h176l10 20-10 21H12L2 22z" fill="#000" />;
    case 4:
      return <rect x="2" y="2" width="196" height="41" rx="6" fill="none" stroke="#000" strokeWidth="3" />;
    case 5:
      return <path d="M2 22C2 10 30 2 100 2s98 8 98 20-28 21-98 21S2 34 2 22z" fill="#000" />;
    case 6:
      return <rect x="12" y="2" width="176" height="41" rx="20" fill="none" stroke="#000" strokeWidth="3" strokeDasharray="8 6" />;
    default:
      return <path d="M2 2h196v41H2z" fill="#000" />;
  }
}

function Sticker({ label, variant }: { label: string; variant: number }) {
  const outlined = variant % 8 === 4 || variant % 8 === 6;
  return (
    <svg viewBox="0 0 200 45" className="stickers__img sticker-js" aria-hidden>
      <Shape variant={variant} />
      <text
        x="100"
        y="30"
        textAnchor="middle"
        fontFamily="Archivo, Arial, sans-serif"
        fontWeight="900"
        fontSize="20"
        letterSpacing="1"
        fill={outlined ? '#000' : '#fff'}
      >
        {label.toUpperCase()}
      </text>
    </svg>
  );
}

export default function Stickers() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current!;
    const imgs = section.querySelectorAll('.sticker-js');
    const subtitle = section.querySelector<HTMLElement>('.stickers-subtitle-js')!;
    const words = section.querySelectorAll('.stickers-word-js');

    // Each sticker shows for 0.42s, then the next.
    const each = 0.42;
    const flash = gsap.timeline({ repeat: -1 });
    gsap.set(imgs, { opacity: 0 });
    imgs.forEach((img, i) => {
      flash.set(img, { opacity: 1 }, i * each).set(img, { opacity: 0 }, (i + 1) * each);
    });

    const split = SplitText.create(subtitle, { type: 'lines, words, chars', linesClass: 'line' });
    const chars = gsap.fromTo(
      split.chars,
      { yPercent: 100, autoAlpha: 1 },
      {
        yPercent: 0,
        stagger: 0.02,
        duration: 0.8,
        scrollTrigger: { trigger: section, start: 'top+=10% bottom', end: 'center+=20% bottom', scrub: true },
      },
    );

    gsap.set(words, { opacity: 0 });
    const wordsTl = gsap
      .timeline({
        scrollTrigger: { trigger: section, start: 'center bottom', end: 'bottom bottom', toggleActions: 'play none none reverse' },
      })
      .to(words[0], { opacity: 1, duration: 0.5 })
      .to(words[3], { opacity: 1, duration: 0.5 })
      .to(words[2], { opacity: 1, duration: 0.5 })
      .to(words[1], { opacity: 1, duration: 0.5 });

    return () => {
      flash.kill();
      chars.scrollTrigger?.kill();
      chars.kill();
      wordsTl.scrollTrigger?.kill();
      wordsTl.kill();
      split.revert();
    };
  }, []);

  return (
    <section className="stickers stickers-box-js" ref={root}>
      <div className="container">
        <div className="stickers__content">
          <div className="stickers__subtitle subtitle stickers-subtitle-js">{stickers.subtitle}</div>
          <p className="stickers__text text">{stickers.text}</p>
          <div className="stickers__box">
            {stickers.badges.map((b, i) => (
              <Sticker label={b} variant={i} key={b} />
            ))}
          </div>
          <div className="stickers__words text-small">
            <div className="stickers__words-row">
              <span className="stickers-word-js">{stickers.words[0]}</span>
              <span className="stickers-word-js">{stickers.words[1]}</span>
            </div>
            <div className="stickers__words-row">
              <span className="stickers-word-js">{stickers.words[2]}</span>
              <span className="stickers-word-js">{stickers.words[3]}</span>
            </div>
          </div>
        </div>
        <Cta />
      </div>
    </section>
  );
}
