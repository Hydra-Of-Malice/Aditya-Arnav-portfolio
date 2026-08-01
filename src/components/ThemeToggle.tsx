import { useTheme } from '../lib/hooks';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="label transition-colors hover:text-accent"
    >
      {isDark ? 'light' : 'dark'}
    </button>
  );
}

export default ThemeToggle;
