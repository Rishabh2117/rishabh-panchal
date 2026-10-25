import { useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import './CodeCard.css';

type Token = [text: string, kind?: 'k' | 's' | 'p' | 'c'];

// Syntax-coloured snippet: k = keyword, s = string, p = property, c = comment
const code: Token[] = [
  ['// about.js', 'c'], ['\n'],
  ['const', 'k'], [' rishabh = {\n'],
  ['  role', 'p'], [': '], ["'Full Stack Web Developer'", 's'], [',\n'],
  ['  builds', 'p'], [': ['], ["'WordPress'", 's'], [', '], ["'Drupal'", 's'], [', '], ["'PHP'", 's'], ['],\n'],
  ['  cares', 'p'], [': ['], ["'responsive'", 's'], [', '], ["'reusable'", 's'], ['],\n'],
  ['  exploring', 'p'], [': ['], ["'UI/UX'", 's'], [', '], ["'Product Design'", 's'], ['],\n'],
  ['};'],
];
const total = code.reduce((n, [t]) => n + t.length, 0);

/** Terminal-style card that types out a short "about" object. */
export function CodeCard() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? total : 0);

  useEffect(() => {
    if (reduce) return setCount(total);
    let i = 0;
    let timer: number;
    const start = window.setTimeout(function tick() {
      i += 2;
      setCount(Math.min(i, total));
      if (i < total) timer = window.setTimeout(tick, 18);
    }, 1100);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [reduce]);

  let remaining = count;
  return (
    <figure className="code-card" aria-label="Code snippet describing Rishabh's role and focus">
      <div className="code-card__bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <em className="mono">about.js</em>
      </div>
      <pre aria-hidden="true">
        <code>
          {code.map(([text, kind], i) => {
            if (remaining <= 0) return null;
            const shown = text.slice(0, remaining);
            remaining -= text.length;
            return (
              <span key={i} className={kind ? `t-${kind}` : undefined}>
                {shown}
              </span>
            );
          })}
          <span className="code-card__caret" />
        </code>
      </pre>
    </figure>
  );
}
