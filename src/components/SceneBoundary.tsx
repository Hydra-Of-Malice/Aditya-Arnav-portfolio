import { Component, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { failed: boolean };

/**
 * The WebGL scenes are decoration. If a scene throws, or its lazy chunk fails
 * to download, the section should lose its artwork — not the whole page.
 */
export default class SceneBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('Scene failed to render; continuing without it.', error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
