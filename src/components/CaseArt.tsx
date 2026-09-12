import { useMemo } from 'react';
import type { Case } from '../site';

/** Deterministic PRNG so the same case always draws the same poster. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Props = {
  c: Case;
  /** 0 is the poster; 1..n are gallery variations. */
  variant?: number;
  /** Aspect of the box the art fills. */
  ratio?: 'square' | 'wide';
};

/**
 * Stands in for the reference's case-study renders: a generated poster in
 * the case's palette — a soft accent glow, a grid, a few slabs and rings,
 * and the case name set small in the corner.
 */
export default function CaseArt({ c, variant = 0, ratio = 'square' }: Props) {
  const w = ratio === 'square' ? 600 : 960;
  const h = 600;
  const [bg, accent] = c.palette;
  const id = `${c.id}-${variant}`;

  const shapes = useMemo(() => {
    const rnd = mulberry32(c.seed * 97 + variant * 13);
    const rings = Array.from({ length: 3 + Math.floor(rnd() * 3) }, () => ({
      cx: w * (0.2 + rnd() * 0.6),
      cy: h * (0.2 + rnd() * 0.6),
      r: 40 + rnd() * 160,
      o: 0.15 + rnd() * 0.35,
    }));
    const slabs = Array.from({ length: 2 + Math.floor(rnd() * 3) }, () => ({
      x: w * (0.05 + rnd() * 0.7),
      y: h * (0.1 + rnd() * 0.7),
      w: 60 + rnd() * 220,
      h: 10 + rnd() * 40,
      rot: -30 + rnd() * 60,
      o: 0.5 + rnd() * 0.5,
    }));
    const glow = { cx: w * (0.3 + rnd() * 0.4), cy: h * (0.3 + rnd() * 0.4), r: 120 + rnd() * 140 };
    return { rings, slabs, glow };
  }, [c.seed, variant, w]);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label={c.name}>
      <defs>
        <radialGradient id={`g-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.9" />
          <stop offset="60%" stopColor={accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <pattern id={`p-${id}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#fff" strokeOpacity="0.07" />
        </pattern>
      </defs>
      <rect width={w} height={h} fill={bg} />
      <rect width={w} height={h} fill={`url(#p-${id})`} />
      <circle cx={shapes.glow.cx} cy={shapes.glow.cy} r={shapes.glow.r} fill={`url(#g-${id})`} />
      {shapes.rings.map((r, i) => (
        <circle cx={r.cx} cy={r.cy} r={r.r} fill="none" stroke={accent} strokeOpacity={r.o} strokeWidth={i % 2 ? 1 : 2} key={i} />
      ))}
      {shapes.slabs.map((s, i) => (
        <rect
          x={s.x}
          y={s.y}
          width={s.w}
          height={s.h}
          rx={s.h / 2}
          fill={i % 2 ? accent : '#fff'}
          fillOpacity={s.o}
          transform={`rotate(${s.rot} ${s.x + s.w / 2} ${s.y + s.h / 2})`}
          key={i}
        />
      ))}
      <text x="28" y={h - 28} fontFamily="DM Mono, monospace" fontSize="16" fill="#fff" fillOpacity="0.85" letterSpacing="2">
        {c.name.toUpperCase()}
      </text>
      <text x={w - 28} y={h - 28} textAnchor="end" fontFamily="DM Mono, monospace" fontSize="16" fill="#fff" fillOpacity="0.6" letterSpacing="2">
        {`${c.category} / ${c.year}`}
      </text>
      <text x="28" y="60" fontFamily="Archivo, sans-serif" fontWeight="900" fontSize="34" fill="#fff" fillOpacity="0.9">
        {String(variant + 1).padStart(2, '0')}
      </text>
    </svg>
  );
}
