import { portfolioData } from '../data';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="measure px-6 pb-8 md:px-8">
      <div className="flex flex-col gap-1 border-t border-line-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta">
          © {year} {portfolioData.personalInfo.name}
        </p>
        <p className="meta">Built with React, Vite &amp; Tailwind</p>
      </div>
    </footer>
  );
}

export default Footer;
