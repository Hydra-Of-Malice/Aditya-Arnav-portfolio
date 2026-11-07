/** Lets any "Request résumé" button open the dialog without threading props. */
const OPEN = 'resume:open';

export function openResume() {
  window.dispatchEvent(new Event(OPEN));
}

export function onResumeOpen(handler: () => void) {
  window.addEventListener(OPEN, handler);
  return () => window.removeEventListener(OPEN, handler);
}
