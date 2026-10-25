import { motion, useReducedMotion } from 'motion/react';
import type { ElementType } from 'react';

interface Props {
  /** Each entry renders on its own line */
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Animate on mount instead of when scrolled into view */
  immediate?: boolean;
  id?: string;
  /** Indices of lines rendered in the accent colour */
  accentLines?: number[];
}

const mask = {
  display: 'inline-block',
  overflow: 'hidden',
  verticalAlign: 'top',
  paddingBottom: '0.08em',
  marginBottom: '-0.08em',
} as const;

/** Word-by-word masked slide-up reveal for display headings. */
export function SplitReveal({ lines, as: Tag = 'h2', id, className, delay = 0, immediate, accentLines = [] }: Props) {
  const reduce = useReducedMotion();
  let wordIndex = 0;

  const trigger = immediate
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } };

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{lines.join(' ')}</span>
      <motion.span style={{ display: 'block' }} {...trigger} aria-hidden="true">
        {lines.map((line, li) => {
          const words = line.split(' ');
          return (
            <span key={li} style={{ display: 'block' }}>
              {words.map((word, wi) => {
                const i = wordIndex++;
                return (
                  <span key={wi} style={mask}>
                    <motion.span
                      style={{ display: 'inline-block' }}
                      className={accentLines.includes(li) ? 'grad-text' : undefined}
                      variants={{
                        hidden: reduce ? { opacity: 0 } : { y: '110%', rotate: 5 },
                        show: {
                          y: 0,
                          rotate: 0,
                          opacity: 1,
                          transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.07 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                    {wi < words.length - 1 ? ' ' : ''}
                  </span>
                );
              })}
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
