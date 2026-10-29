import { siteConfig } from '../data/siteConfig';
import './Portrait.css';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

/** Natural-colour portrait with the spinning developer × designer badge. */
export function Portrait() {
  return (
    <figure className="portrait">
      <div className="portrait__frame">
        <img
          className="portrait__img"
          src={asset('about/portrait.jpg')}
          alt={`Portrait of ${siteConfig.name}`}
          width={800}
          height={1075}
          loading="lazy"
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
    </figure>
  );
}
