import { useState, type ComponentType, type SVGProps } from 'react';
import { portfolioData } from '../data';
import { useActiveSection, useTheme } from '../lib/hooks';
import * as Icon from './Icons';

type Icn = ComponentType<SVGProps<SVGSVGElement>>;

type DockLink = {
  label: string;
  icon: Icn;
  /** Section ids drive the active indicator; external links have an href. */
  section?: string;
  href?: string;
  external?: boolean;
  /** Dropped on narrow screens, where the dock would otherwise overflow. */
  secondary?: boolean;
};

const { personalInfo } = portfolioData;

const sectionLinks: DockLink[] = [
  { label: 'Home', icon: Icon.Home, section: 'top' },
  { label: 'About', icon: Icon.User, section: 'about' },
  { label: 'Experience', icon: Icon.Briefcase, section: 'experience' },
  { label: 'Projects', icon: Icon.Layers, section: 'projects' },
  { label: 'Patents', icon: Icon.Award, section: 'research', secondary: true },
  { label: 'Stack', icon: Icon.Terminal, section: 'skills', secondary: true },
  { label: 'Education', icon: Icon.Cap, section: 'education', secondary: true },
  { label: 'Contact', icon: Icon.Mail, section: 'contact' },
];

const socialLinks: DockLink[] = [
  { label: 'GitHub', icon: Icon.Github, href: personalInfo.github, external: true },
  { label: 'LinkedIn', icon: Icon.Linkedin, href: personalInfo.linkedin, external: true },
  {
    label: 'LeetCode',
    icon: Icon.Code,
    href: personalInfo.leetcode,
    external: true,
    secondary: true,
  },
];

const sectionIds = sectionLinks.map((l) => l.section!);

/**
 * The magnification curve. Distance is measured in slots from whatever is
 * hovered, so nothing has to be measured at runtime — a hovered icon grows,
 * its neighbours grow less, and the slot underneath widens to make room, which
 * is what stops magnified icons from colliding.
 */
const SCALES = [1.55, 1.28, 1.11] as const;
const LIFTS = [10, 5, 1.5] as const;

function magnify(distance: number | null) {
  if (distance === null || distance >= SCALES.length) return { scale: 1, lift: 0 };
  return { scale: SCALES[distance], lift: LIFTS[distance] };
}

interface SlotProps {
  index: number;
  hovered: number | null;
  onHover: (index: number | null) => void;
  children: React.ReactNode;
  hideOnMobile?: boolean;
}

function Slot({ index, hovered, onHover, children, hideOnMobile }: SlotProps) {
  const { scale, lift } = magnify(hovered === null ? null : Math.abs(hovered - index));

  return (
    <li
      className={`dock-slot relative flex shrink-0 justify-center ${
        hideOnMobile ? 'hidden sm:flex' : 'flex'
      }`}
      style={{ '--scale': scale, '--lift': lift } as React.CSSProperties}
      onMouseEnter={() => onHover(index)}
      onFocus={() => onHover(index)}
      onBlur={() => onHover(null)}
    >
      {children}
    </li>
  );
}

export function Dock() {
  const [hovered, setHovered] = useState<number | null>(null);
  const active = useActiveSection(sectionIds);
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  // One flat list, so magnification carries across the separators the way a
  // real dock does.
  const items: DockLink[] = [...sectionLinks, ...socialLinks];
  const themeIndex = items.length;

  const renderItem = (item: DockLink, index: number) => {
    const Glyph = item.icon;
    const isActive = item.section !== undefined && item.section === active;
    const showLabel = hovered === index;

    return (
      <Slot
        key={item.label}
        index={index}
        hovered={hovered}
        onHover={setHovered}
        hideOnMobile={item.secondary}
      >
        <Tooltip show={showLabel}>{item.label}</Tooltip>

        <a
          href={item.href ?? `#${item.section}`}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noreferrer' : undefined}
          aria-label={item.label}
          aria-current={isActive ? 'true' : undefined}
          className={`dock-btn flex items-center justify-center rounded-xl border ${
            isActive
              ? 'border-accent-line bg-accent-soft text-accent'
              : 'border-transparent text-dim hover:bg-elev-hi hover:text-title'
          }`}
        >
          <Glyph className="h-[45%] w-[45%]" />
        </a>

        {isActive && (
          <span
            aria-hidden
            className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
          />
        )}
      </Slot>
    );
  };

  return (
    <div className="dock pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center pb-4 sm:pb-5">
      <nav aria-label="Site" className="pointer-events-auto">
        <ul
          onMouseLeave={() => setHovered(null)}
          className="flex items-end gap-1 rounded-2xl border border-line bg-[var(--glass)] p-1.5 shadow-[var(--shadow)] backdrop-blur-xl sm:gap-1.5 sm:p-2"
        >
          {sectionLinks.map((item, i) => renderItem(item, i))}

          <Separator />

          {socialLinks.map((item, i) => renderItem(item, sectionLinks.length + i))}

          <Separator />

          <Slot index={themeIndex} hovered={hovered} onHover={setHovered}>
            <Tooltip show={hovered === themeIndex}>{isDark ? 'Light' : 'Dark'}</Tooltip>
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
              className="dock-btn flex items-center justify-center rounded-xl border border-transparent text-dim hover:bg-elev-hi hover:text-title"
            >
              {isDark ? <Icon.Sun className="h-[45%] w-[45%]" /> : <Icon.Moon className="h-[45%] w-[45%]" />}
            </button>
          </Slot>
        </ul>
      </nav>
    </div>
  );
}

function Separator() {
  return <li aria-hidden className="mx-0.5 h-6 w-px shrink-0 self-center bg-line" />;
}

function Tooltip({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className={`label pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-[var(--glass)] px-2 py-1 text-[0.625rem] text-title backdrop-blur-xl transition-all duration-200 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-1 opacity-0'
      }`}
    >
      {children}
    </span>
  );
}

export default Dock;
