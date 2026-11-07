import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

/** Line icons at one size and one stroke, in the colour of the text around them. */
const Line = ({ children, ...p }: P) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...p}
  >
    {children}
  </svg>
);

export const ArrowUpRight = (p: P) => (
  <Line {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Line>
);

export const ArrowRight = (p: P) => (
  <Line {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Line>
);

export const Menu = (p: P) => (
  <Line {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Line>
);

export const Close = (p: P) => (
  <Line {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Line>
);

const Mark = (p: P) => <svg width="16" height="16" viewBox="0 0 18 18" fill="currentColor" aria-hidden {...p} />;

export const Linkedin = (p: P) => (
  <Mark {...p}>
    <path d="M4.1 6.1H.9v10.7h3.2V6.1ZM2.5 4.7a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8Zm14.6 6.2c0-3.2-1.7-4.9-4.1-4.9-1.8 0-2.7 1-3.2 1.8V6.1H6.6v10.7h3.2v-5.3c0-1.4.3-2.7 2-2.7 1.7 0 1.9 1.6 1.9 2.8v5.2h3.3v-5.9Z" />
  </Mark>
);

export const Github = (p: P) => (
  <Mark {...p}>
    <path d="M9 .8a8.4 8.4 0 0 0-2.7 16.4c.4.1.6-.2.6-.4v-1.5c-2.3.5-2.8-1-2.8-1-.4-1-.9-1.2-.9-1.2-.8-.5 0-.5 0-.5.9.1 1.3.9 1.3.9.7 1.3 2 .9 2.5.7.1-.6.3-.9.5-1.1-1.9-.2-3.8-.9-3.8-4.2 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.2 0 0 .7-.2 2.3.9a8 8 0 0 1 4.2 0c1.6-1.1 2.3-.9 2.3-.9.5 1.1.2 2 .1 2.2.6.6.9 1.4.9 2.3 0 3.3-2 4-3.9 4.2.3.3.6.8.6 1.6v2.3c0 .2.2.5.6.4A8.4 8.4 0 0 0 9 .8Z" />
  </Mark>
);

export const Leetcode = (p: P) => (
  <Mark {...p}>
    <path d="M11.2 1.2 5 7.5a4.6 4.6 0 0 0 0 6.4l2.5 2.5a4.3 4.3 0 0 0 6.1 0l1.6-1.6a1 1 0 0 0-1.5-1.5l-1.6 1.6a2.3 2.3 0 0 1-3.2 0L6.4 12.4a2.6 2.6 0 0 1 0-3.5l6.3-6.2a1 1 0 1 0-1.5-1.5Z" />
    <path d="M7.8 10.6h7.6a1 1 0 1 0 0-2H7.8a1 1 0 1 0 0 2Z" />
  </Mark>
);
