import { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { Magnetic } from './motion/Magnetic';
import { Reveal } from './motion/Reveal';
import { SplitReveal } from './motion/SplitReveal';
import './Contact.css';

export function Contact() {
  const { email, linkedin, github } = siteConfig.links;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const links = [
    { label: 'GitHub', href: github },
    { label: 'LinkedIn', href: linkedin },
  ];

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal>
          <span className="eyebrow mono">Contact</span>
        </Reveal>
        <SplitReveal
          id="contact-title"
          className="contact__title display"
          lines={["Let's make", 'something', 'meaningful.']}
          accentLines={[2]}
        />

        <div className="contact__row">
          <Reveal className="contact__primary">
            {email ? (
              <div className="contact__email">
                <Magnetic strength={0.2}>
                  <a className="btn btn--accent btn--lg" href={`mailto:${email}`}>
                    {email}
                    <span className="btn__icon" aria-hidden="true">↗</span>
                  </a>
                </Magnetic>
                <button className="contact__copy mono" onClick={copy} aria-live="polite">
                  {copied ? 'Copied ✓' : 'Copy email'}
                </button>
              </div>
            ) : (
              <p className="placeholder-note">Email address coming soon</p>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="contact__links">
              {links.map((l) => (
                <li key={l.label}>
                  {l.href ? (
                    <a href={l.href} target="_blank" rel="noreferrer" className="contact__link">
                      <span>{l.label}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className="contact__link is-disabled" aria-disabled="true">
                      <span>{l.label}</span>
                      <span className="mono">soon</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
