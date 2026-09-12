/**
 * While a dialog is open the rest of the page must not be reachable by Tab or
 * readable by a screen reader. `inert` does both in one attribute.
 */
const BEHIND = ['#content', '.header', '.footer'];

export function setBackgroundInert(inert: boolean) {
  for (const sel of BEHIND) {
    const el = document.querySelector<HTMLElement>(sel);
    if (!el) continue;
    if (inert) el.setAttribute('inert', '');
    else el.removeAttribute('inert');
  }
}
