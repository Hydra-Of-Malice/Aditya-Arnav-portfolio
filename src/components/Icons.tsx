import type { SVGProps } from 'react';

/**
 * Every icon is a 24-box drawn with `currentColor`, so the dock, badges and
 * buttons can size and colour them from the outside.
 */
type IconProps = SVGProps<SVGSVGElement>;

function Stroke({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export const Home = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3 10.5 12 3.5l9 7v9a1 1 0 0 1-1 1h-4.5V15h-7v5.5H4a1 1 0 0 1-1-1z" />
  </Stroke>
);

export const User = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="8" r="3.75" />
    <path d="M4.5 20.5v-.75a7.5 7.5 0 0 1 15 0v.75" />
  </Stroke>
);

export const Briefcase = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="2.75" y="7.25" width="18.5" height="13" rx="2.25" />
    <path d="M8.5 7.25V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.75M2.75 12.5h18.5" />
  </Stroke>
);

export const Layers = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m12 3 8.5 4.75L12 12.5 3.5 7.75z" />
    <path d="m3.5 12 8.5 4.75L20.5 12M3.5 16.25 12 21l8.5-4.75" />
  </Stroke>
);

export const Award = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="m8.5 13.75-1.25 6.75L12 18l4.75 2.5-1.25-6.75" />
  </Stroke>
);

export const Terminal = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="2.75" y="4.25" width="18.5" height="15.5" rx="2.25" />
    <path d="m7.5 10 2.5 2-2.5 2M13 14.5h3.5" />
  </Stroke>
);

export const Cap = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 3.5 2.75 8 12 12.5 21.25 8z" />
    <path d="M6.5 10.25V15c0 1.66 2.46 3 5.5 3s5.5-1.34 5.5-3v-4.75M21.25 8v5.5" />
  </Stroke>
);

export const Mail = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.25" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Stroke>
);

export const ArrowUpRight = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M7.5 16.5 16.5 7.5M8.75 7.5h7.75v7.75" />
  </Stroke>
);

export const Code = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m8.5 17.5-5-5.5 5-5.5M15.5 6.5l5 5.5-5 5.5" />
  </Stroke>
);

export const Sun = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.75v2M12 19.25v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2.75 12h2M19.25 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </Stroke>
);

export const Moon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M20.5 13.4A8.5 8.5 0 1 1 10.6 3.5a6.7 6.7 0 0 0 9.9 9.9z" />
  </Stroke>
);

export const MapPin = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M19 10.5c0 5.25-7 11-7 11s-7-5.75-7-11a7 7 0 1 1 14 0z" />
    <circle cx="12" cy="10.25" r="2.5" />
  </Stroke>
);

export const Clock = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="M12 7v5.25l3.25 2" />
  </Stroke>
);

export const Github = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58l-.02-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.82 1.1.82 2.22l-.01 3.29c0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
  </svg>
);

export const Linkedin = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);
