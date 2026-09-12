/**
 * Tiny event bus so any "GET RÉSUMÉ" button can open the popup without the
 * popup having to be threaded through props.
 */
const OPEN = 'resume-popup:open';

export function openResumePopup() {
  window.dispatchEvent(new Event(OPEN));
}

export function onResumePopupOpen(handler: () => void) {
  window.addEventListener(OPEN, handler);
  return () => window.removeEventListener(OPEN, handler);
}
