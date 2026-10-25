import { siteConfig } from '../data/siteConfig';
import { useSectionNav } from '../hooks/useSectionNav';
import './Footer.css';

export function Footer() {
  const goTo = useSectionNav();
  const { github, linkedin, instagram, email } = siteConfig.links;
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__wordmark display" aria-hidden="true">
          {siteConfig.name}
        </p>
        <div className="footer__row">
          <p className="mono footer__copy">
            © {year} {siteConfig.name}
          </p>
          <ul className="footer__links">
            <li>
              <a href={github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>{linkedin ? <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a> : <span className="is-disabled">LinkedIn</span>}</li>
            <li>
              <a href={instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li>{email ? <a href={`mailto:${email}`}>Email</a> : <button onClick={() => goTo('contact')}>Contact</button>}</li>
          </ul>
          <button className="footer__top mono" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
