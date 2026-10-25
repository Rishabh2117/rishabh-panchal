import './Marquee.css';

/** Infinite horizontal ticker. Pure CSS; pauses on hover and stops for reduced motion. */
export function Marquee({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  const row = (hidden: boolean) => (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item}>
          {item}
          <span className="marquee__star" aria-hidden="true">
            ✳
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee${reverse ? ' marquee--reverse' : ''}`}>
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
