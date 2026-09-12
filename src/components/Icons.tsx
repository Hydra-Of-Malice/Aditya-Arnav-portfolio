import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

/** The little arrow drawn before "GET RÉSUMÉ". */
export const DecorArrow = (p: P) => (
  <svg viewBox="0 0 15 13" fill="none" aria-hidden className="capabilities-button-component__decor-image" {...p}>
    <path d="M1 6.5h12M8.5 1.5l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

/** One of the four arcs that fan out beside "Got Project?". */
export const Arc = (p: P) => (
  <svg viewBox="0 0 53 186" fill="none" aria-hidden {...p}>
    <path
      d="M52 185.2C30.8 173.4 0 140.8 0 92.6C0 44 30.8 11.4 52 0L53 1.6C32 13.2 2.2 46 2.2 92.6C2.2 139.8 32 171.8 53 183.6L52 185.2Z"
      fill="currentColor"
    />
  </svg>
);

export const Plus = (p: P) => (
  <svg viewBox="0 0 15 15" fill="none" aria-hidden {...p}>
    <path d="M7.5 1v13M1 7.5h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const Tap = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...p}>
    <path
      d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-2a1.5 1.5 0 0 1 3 0v2m0-1a1.5 1.5 0 0 1 3 0v6a5 5 0 0 1-5 5h-1.2a5 5 0 0 1-4.1-2.1L4.3 15a1.4 1.4 0 0 1 2.2-1.7L9 16"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Star = ({ size = 40, ...p }: P & { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 39" fill="none" aria-hidden {...p}>
    <path
      d="m20.055 0 1.365 18.135L39.555 19.5 21.42 20.865 20.055 39 18.69 20.865.555 19.5l18.135-1.365L20.055 0Z"
      fill="#191919"
    />
  </svg>
);

/** The bracket-like glyph above and below the contact block. */
export const ContactBracket = (p: P) => (
  <svg viewBox="0 0 43 22" fill="none" aria-hidden className="contact-links__icon" {...p}>
    <path d="M1 21C1 9.954 9.954 1 21 1h1c11.046 0 20 8.954 20 20" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="21.5" cy="21" r="1.5" fill="currentColor" />
  </svg>
);

export const Linkedin = (p: P) => (
  <svg viewBox="0 0 16 17" fill="none" aria-hidden {...p}>
    <path
      d="M3.6 5.6H.3v10.7h3.3V5.6ZM2 4.2a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8Zm13.7 6.2c0-3.2-1.7-4.9-4.1-4.9-1.8 0-2.7 1-3.2 1.8V5.6H5.2v10.7h3.3v-5.3c0-1.4.3-2.7 2-2.7 1.7 0 1.9 1.6 1.9 2.8v5.2h3.3v-5.9Z"
      fill="currentColor"
    />
  </svg>
);

export const Github = (p: P) => (
  <svg viewBox="0 0 18 18" fill="none" aria-hidden {...p}>
    <path
      d="M9 .8a8.4 8.4 0 0 0-2.7 16.4c.4.1.6-.2.6-.4v-1.5c-2.3.5-2.8-1-2.8-1-.4-1-.9-1.2-.9-1.2-.8-.5 0-.5 0-.5.9.1 1.3.9 1.3.9.7 1.3 2 .9 2.5.7.1-.6.3-.9.5-1.1-1.9-.2-3.8-.9-3.8-4.2 0-.9.3-1.7.9-2.3-.1-.2-.4-1.1.1-2.2 0 0 .7-.2 2.3.9a8 8 0 0 1 4.2 0c1.6-1.1 2.3-.9 2.3-.9.5 1.1.2 2 .1 2.2.6.6.9 1.4.9 2.3 0 3.3-2 4-3.9 4.2.3.3.6.8.6 1.6v2.3c0 .2.2.5.6.4A8.4 8.4 0 0 0 9 .8Z"
      fill="currentColor"
    />
  </svg>
);

export const Leetcode = (p: P) => (
  <svg viewBox="0 0 18 18" fill="none" aria-hidden {...p}>
    <path
      d="M11.2 1.2 5 7.5a4.6 4.6 0 0 0 0 6.4l2.5 2.5a4.3 4.3 0 0 0 6.1 0l1.6-1.6a1 1 0 0 0-1.5-1.5l-1.6 1.6a2.3 2.3 0 0 1-3.2 0L6.4 12.4a2.6 2.6 0 0 1 0-3.5l6.3-6.2a1 1 0 1 0-1.5-1.5Z"
      fill="currentColor"
    />
    <path d="M7.8 10.6h7.6a1 1 0 1 0 0-2H7.8a1 1 0 1 0 0 2Z" fill="currentColor" />
  </svg>
);

export const Mail = (p: P) => (
  <svg viewBox="0 0 18 18" fill="none" aria-hidden {...p}>
    <path
      d="M2 3.5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Zm0 1.7v.4l7 4.4 7-4.4v-.4L9 9.6 2 5.2Z"
      fill="currentColor"
    />
  </svg>
);