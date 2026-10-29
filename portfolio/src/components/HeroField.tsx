import { useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

const GAP = 30; // px between dots
const RADIUS = 170; // pointer influence radius
const GLOW = 280; // colour glow radius

// Keep in sync with --accent / --accent-2 / --accent-3 in tokens.css
const BLUE = [108, 182, 255]; // code
const DEEP = [51, 102, 255]; // design
const PURPLE = [80, 142, 255]; // where they meet
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

interface Dot {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Interactive dot field behind the hero: dots ripple in a slow wave, scatter away
 * from the pointer and spring back, tinted code-blue → design deep blue with a mid-blue glow near it.
 * Pauses off-screen; renders a single static frame for reduced motion.
 */
export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    let raf = 0;
    let running = false;
    const pointer = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = d.x - pointer.x;
        const dy = d.y - pointer.y;
        const dist = Math.hypot(dx, dy) || 1;

        if (!reduce) {
          if (dist < RADIUS) {
            const force = (1 - dist / RADIUS) * 2.4;
            d.vx += (dx / dist) * force;
            d.vy += (dy / dist) * force;
          }
          d.vx += (d.ox - d.x) * 0.055;
          d.vy += (d.oy - d.y) * 0.055;
          d.vx *= 0.82;
          d.vy *= 0.82;
          d.x += d.vx;
          d.y += d.vy;
        }

        const wave = Math.sin(d.ox * 0.011 + t * 0.0011) * Math.cos(d.oy * 0.013 - t * 0.0009);
        const glow = Math.max(0, 1 - dist / GLOW);
        // Code blue on the left blending to design deep blue on the right; mid blue close to the pointer
        const k = d.ox / w;
        const r = mix(mix(BLUE[0], DEEP[0], k), PURPLE[0], glow);
        const g = mix(mix(BLUE[1], DEEP[1], k), PURPLE[1], glow);
        const b = mix(mix(BLUE[2], DEEP[2], k), PURPLE[2], glow);
        const alpha = 0.07 + (wave + 1) * 0.05 + glow * 0.55;
        const size = 1.1 + glow * 1.9 + (wave + 1) * 0.2;

        ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    draw(0);

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [reduce]);

  return <canvas ref={ref} className="hero__field" aria-hidden="true" />;
}
