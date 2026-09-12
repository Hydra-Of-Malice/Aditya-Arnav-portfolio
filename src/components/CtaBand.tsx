import { resumeCta } from '../site';
import ResumeButton from './ResumeButton';

/** Full-width brushed-metal band with one button. */
export default function CtaBand() {
  return (
    <section className="capabilities-cta-full-width ccfw">
      <div className="container">
        <div className="ccfw__body">
          <h2 className="ccfw__title">{resumeCta.title}</h2>
          <div className="ccfw__btn-wrapper">
            <ResumeButton label={resumeCta.button} />
          </div>
        </div>
      </div>
      <div className="ccfw__image" aria-hidden />
    </section>
  );
}
