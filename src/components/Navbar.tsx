import { portfolioData } from '../data';
import { useScrolled } from '../lib/hooks';

/**
 * Navigation itself lives in the dock at the bottom of the screen, so all this
 * bar carries is the mark and the name — and only once you've scrolled past
 * the masthead, where the name is already the largest thing on the page.
 */
export function Navbar() {
  const scrolled = useScrolled(260);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-lg focus:border focus:border-line focus:bg-elev focus:px-3 focus:py-1.5 focus:text-sm focus:text-title"
      >
        Skip to content
      </a>

      <header
        inert={!scrolled}
        className={`fixed inset-x-0 top-0 z-40 transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          aria-hidden
          className="absolute inset-0 backdrop-blur-md"
          style={{
            background: 'linear-gradient(to bottom, var(--bg) 30%, transparent)',
            maskImage: 'linear-gradient(to bottom, #000 60%, transparent)',
          }}
        />

        <div className="measure relative flex items-center gap-2.5 px-6 py-3.5 md:px-8">
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label={`${portfolioData.personalInfo.name} — back to top`}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-elev text-[0.8125rem] font-semibold text-title transition-colors group-hover:border-accent-line group-hover:text-accent">
              {portfolioData.personalInfo.initials.charAt(0)}
            </span>
            <span className="text-[0.875rem] font-medium text-title transition-colors group-hover:text-accent">
              {portfolioData.personalInfo.name}
            </span>
          </a>
        </div>
      </header>
    </>
  );
}

export default Navbar;
