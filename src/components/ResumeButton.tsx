import { openResumePopup } from '../lib/popup';
import { DecorArrow } from './Icons';

type Props = {
  label: string;
  light?: boolean;
  className?: string;
};

/** The pill button that opens the résumé popup, used in five places. */
export default function ResumeButton({ label, light, className = '' }: Props) {
  return (
    <button
      type="button"
      className={`capabilities-button-component cursor__trigger js-nav-cursor-hover ${light ? 'capabilities-button-component--light' : ''} ${className}`}
      onClick={openResumePopup}
    >
      <DecorArrow />
      {label}
    </button>
  );
}
