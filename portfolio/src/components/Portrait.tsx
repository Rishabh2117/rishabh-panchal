import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import { useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { useFinePointer } from '../hooks/useFinePointer';
import './Portrait.css';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

/**
 * Duotone portrait. With a mouse, a circular lens follows the pointer and reveals the
 * natural-colour photo; on touch, tapping toggles between the two.
 */
export function Portrait() {
  const fine = useFinePointer();
  const [colour, setColour] = useState(false);
  const x = useMotionValue(50);
  const y = useMotionValue(40);
  const radius = useSpring(0, { stiffness: 180, damping: 22 });
  const clip = useMotionTemplate`circle(${radius}px at ${x}% ${y}%)`;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!fine) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width) * 100);
    y.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <figure
      className={`portrait${colour ? ' is-colour' : ''}`}
      onPointerMove={onMove}
      onPointerEnter={() => fine && radius.set(130)}
      onPointerLeave={() => radius.set(0)}
      onClick={() => !fine && setColour((c) => !c)}
    >
      <div className="portrait__frame">
        <img
          className="portrait__img portrait__img--duo"
          src={asset('about/portrait-duotone.jpg')}
          alt={`Portrait of ${siteConfig.name}`}
          width={800}
          height={1075}
          loading="lazy"
        />
        <motion.img
          className="portrait__img portrait__img--colour"
          src={asset('about/portrait.jpg')}
          alt=""
          aria-hidden="true"
          width={800}
          height={1075}
          loading="lazy"
          style={fine ? { clipPath: clip } : undefined}
        />
      </div>

      <svg className="portrait__badge" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path id="portrait-ring" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <circle cx="60" cy="60" r="58" className="portrait__badge-bg" />
        <text className="portrait__badge-text">
          <textPath href="#portrait-ring">
            <tspan className="t-code">DEVELOPER</tspan> × <tspan className="t-design">DESIGNER</tspan> ×{' '}
            <tspan className="t-code">CODE</tspan> × <tspan className="t-design">CRAFT</tspan> ×
          </textPath>
        </text>
        <text x="60" y="66" textAnchor="middle" className="portrait__badge-mark">
          {'</>'}
        </text>
      </svg>

      <figcaption className="portrait__caption mono">
        {fine ? 'Hover to see the real colours' : 'Tap to see the real colours'}
      </figcaption>
    </figure>
  );
}
