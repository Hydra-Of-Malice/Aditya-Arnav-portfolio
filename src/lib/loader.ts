/**
 * The loader fires two events: `loaderExited` the moment its curtains start
 * to open (the hero's entrance is keyed off this) and `loaderComplete` once
 * the bar has filled (smooth scroll and the header wait for this).
 */
export const LOADER_EXITED_EVENT = 'loaderExited';
export const LOADER_COMPLETE_EVENT = 'loaderComplete';

/** Minimum time the loader stays up; the reference uses 4.5s, we use less. */
export const LOADER_BASE_MS = 2200;

declare global {
  interface Window {
    isLoaderExited?: boolean;
    isLoaderComplete?: boolean;
  }
}

export function markLoaderExited() {
  window.isLoaderExited = true;
  window.dispatchEvent(new Event(LOADER_EXITED_EVENT));
}

export function markLoaderComplete() {
  window.isLoaderComplete = true;
  window.dispatchEvent(new Event(LOADER_COMPLETE_EVENT));
}

export function waitForLoaderExitOnce(): Promise<void> {
  return new Promise((resolve) => {
    if (window.isLoaderExited) return resolve();
    window.addEventListener(LOADER_EXITED_EVENT, () => resolve(), { once: true });
  });
}

export function waitForLoaderComplete(): Promise<void> {
  return new Promise((resolve) => {
    if (window.isLoaderComplete) return resolve();
    window.addEventListener(LOADER_COMPLETE_EVENT, () => resolve(), { once: true });
  });
}
