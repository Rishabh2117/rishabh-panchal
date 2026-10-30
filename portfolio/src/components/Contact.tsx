import { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { Magnetic } from './motion/Magnetic';
import { Reveal } from './motion/Reveal';
import { SplitReveal } from './motion/SplitReveal';
import './Contact.css';

export function Contact() {
  const { email, linkedin, github, instagram, phone } = siteConfig.links;
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
    { label: 'LinkedIn', href: linkedin, external: true },
    { label: 'GitHub', href: github, external: true },
    { label: 'Instagram', href: instagram, external: true },
    { label: phone || 'Phone', href: phone && `tel:${phone.replace(/\s/g, '')}`, external: false },
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
                    <span className="btn__icon" data-dir="up-right" aria-hidden="true"><span>↗</span></span>
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
                    <a
                      href={l.href}
                      className="contact__link"
                      {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    >
                      <span>{l.label}</span>
                      <span aria-hidden="true">{l.external ? '↗' : '→'}</span>
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
