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
