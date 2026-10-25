import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section className="section container" style={{ minHeight: '80vh', paddingTop: 160 }}>
      <p className="eyebrow mono">404</p>
      <h1 className="display" style={{ fontSize: 'var(--fs-h1)', margin: '24px 0 40px' }}>
        Page not <span className="accent">found.</span>
      </h1>
      <Link to="/" className="btn btn--accent">
        Back home <span className="btn__icon" aria-hidden="true">←</span>
      </Link>
    </section>
  );
}
