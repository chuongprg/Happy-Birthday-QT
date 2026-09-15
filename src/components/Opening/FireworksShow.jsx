import { useEffect, useRef } from 'react';
import { birthdayConfig } from '../../data/config.js';

// A real particle-based fireworks show on <canvas>, instead of a handful of
// DOM nodes with box-shadow glows — cheaper to animate at real firework
// particle counts, and it's what makes the trailing glow/streak look
// possible at all (additive blending + a translucent-clear trail, both
// canvas-only tricks).
//
// When `showAgeReveal` is true the show pauses mid-way to spell itself out:
// a burst of white sparks converges into "24", holds, pops apart, and reforms
// as "25" in pink, before the grand finale.

const GOLD = ['#FFD966', '#FFC23E', '#FFE9B0'];
const PINK = ['#F8C8DC', '#F2A0C4', '#FF7FAE'];
const MINT = ['#8DDDD0', '#5FC2B3', '#C8E6C9'];
const WHITE = ['#FFFFFF', '#F5F8FF', '#DCEBFF'];
const WINE = ['#F2A0C4', '#C2447A', '#7A2346'];
const PALETTES = [GOLD, PINK, MINT, WHITE, WINE];

// Fixed, fully-saturated colors for the age digits specifically — the
// pastel PINK palette above reads as near-white once dozens of overlapping
// dots stack under additive blending, which would blur out the "24 white,
// 25 pink" distinction the age reveal depends on.
const AGE_WHITE = '#FFFFFF';
const AGE_PINK = '#FF3D93';

const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[(Math.random() * arr.length) | 0];

function makeBurstParticles(cx, cy, palette, kind = 'peony') {
  const particles = [];
  const isWillow = kind === 'willow';
  const isCrackle = kind === 'crackle';
  const count = isWillow ? 70 : isCrackle ? 90 : 56;
  const speed = isWillow ? [1.4, 2.6] : isCrackle ? [2.2, 4.2] : [2.4, 4.6];
  const gravity = isWillow ? 0.028 : 0.05;
  const drag = isWillow ? 0.986 : 0.975;
  const life = isWillow ? [70, 100] : isCrackle ? [40, 60] : [46, 68];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * TAU + rand(-0.06, 0.06);
    const v = rand(speed[0], speed[1]);
    const maxLife = rand(life[0], life[1]);
    particles.push({
      kind: 'spark',
      x: cx,
      y: cy,
      prevX: cx,
      prevY: cy,
      vx: Math.cos(angle) * v,
      vy: Math.sin(angle) * v,
      gravity,
      drag,
      color: pick(palette),
      size: rand(1.4, 2.6),
      life: maxLife,
      maxLife,
      crackleAt: isCrackle ? rand(0.25, 0.55) * maxLife : null,
      twinklePhase: rand(0, TAU),
    });
  }
  return particles;
}

function makeRocket(cx0, groundY, targetY, palette, kind) {
  return {
    kind: 'rocket',
    x: cx0,
    y: groundY,
    prevX: cx0,
    prevY: groundY,
    vx: rand(-0.3, 0.3),
    vy: -rand(6.4, 8),
    gravity: 0.05,
    targetY,
    palette,
    burstKind: kind,
  };
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function FireworksShow({ durationMs = 5500, showAgeReveal = false, onDone }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let particles = [];
    const timeouts = [];
    const schedule = (fn, ms) => timeouts.push(setTimeout(fn, ms));

    const launchRandomShell = () => {
      const palette = pick(PALETTES);
      const kind = pick(['peony', 'peony', 'willow', 'crackle']);
      const cx0 = rand(w * 0.15, w * 0.85);
      const targetY = rand(h * 0.16, h * 0.42);
      particles.push(makeRocket(cx0, h * 0.98, targetY, palette, kind));
    };

    const ageBefore = birthdayConfig.age - 1;
    const ageAfter = birthdayConfig.age;

    // The age digits are drawn straight to the canvas with fillText + a
    // shadowBlur glow — no per-pixel sampling into particles. That approach
    // looked great on desktop but depended on getImageData/canvas-text
    // metrics behaving the same across engines, and iOS Safari's canvas text
    // baseline/font-fallback handling differs from Chrome's enough that the
    // sampled glyph came out as little more than a sliver on an iPhone.
    // Plain glowing text has none of that risk — it's one of the most
    // consistently-supported canvas features there is.
    let digit = null; // { text, color, bornAt, dyingAt }

    const runAgeMorph = () => {
      const cx = w / 2;
      const cy = h * 0.4;

      particles.push(...makeBurstParticles(cx, cy, WHITE, 'crackle'));
      digit = { text: String(ageBefore), color: AGE_WHITE, bornAt: performance.now(), dyingAt: null };

      schedule(() => {
        // "24" fades/bursts away, then "25" fades in once it's gone.
        digit.dyingAt = performance.now();
        particles.push(...makeBurstParticles(cx, cy, PINK, 'peony'));

        schedule(() => {
          digit = { text: String(ageAfter), color: AGE_PINK, bornAt: performance.now(), dyingAt: null };
        }, 300);

        schedule(() => {
          digit.dyingAt = performance.now();
        }, 300 + 1900);

        schedule(() => {
          digit = null;
        }, 300 + 1900 + 300);
      }, 2300);
    };

    const runFinale = () => {
      const spots = [0.22, 0.4, 0.6, 0.78, 0.32, 0.68];
      spots.forEach((f, i) => {
        schedule(() => {
          particles.push(...makeBurstParticles(w * f, h * rand(0.18, 0.4), pick(PALETTES), pick(['peony', 'willow', 'crackle'])));
        }, i * 180);
      });
    };

    // Ambient shells launch throughout the whole show, lighter while the
    // age digits are on screen so they don't fight for attention.
    let ambientTimer = null;
    const startAmbient = (intervalMs) => {
      clearInterval(ambientTimer);
      ambientTimer = setInterval(launchRandomShell, intervalMs);
      timeouts.push({ clear: () => clearInterval(ambientTimer) });
    };

    launchRandomShell();
    launchRandomShell();
    startAmbient(650);

    if (showAgeReveal) {
      schedule(() => startAmbient(1400), 1400);
      schedule(runAgeMorph, 1500);
      schedule(() => startAmbient(500), 6700);
      schedule(runFinale, 6900);
      schedule(() => clearInterval(ambientTimer), durationMs - 500);
    } else {
      schedule(runFinale, durationMs * 0.55);
      schedule(() => clearInterval(ambientTimer), durationMs - 400);
    }

    let rafId;
    let lastTime = performance.now();

    const frame = (now) => {
      const dt = Math.min(2, (now - lastTime) / 16.67);
      lastTime = now;

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(6,6,14,0.24)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      particles = particles.filter((p) => {
        if (p.kind === 'rocket') {
          p.prevX = p.x;
          p.prevY = p.y;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vy += p.gravity * dt;

          ctx.strokeStyle = 'rgba(255,244,214,0.9)';
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(p.prevX, p.prevY);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          if (p.vy >= -0.6 || p.y <= p.targetY) {
            particles.push(...makeBurstParticles(p.x, p.y, p.palette, p.burstKind));
            return false;
          }
          return p.y < h + 20;
        }

        // 'spark'
        p.prevX = p.x;
        p.prevY = p.y;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += p.gravity * dt;
        p.vx *= Math.pow(p.drag, dt);
        p.vy *= Math.pow(p.drag, dt);
        p.life -= dt;

        if (p.crackleAt != null && p.life <= p.crackleAt && p.life > 0 && Math.random() < 0.3) {
          for (let k = 0; k < 3; k++) {
            const a = rand(0, TAU);
            particles.push({
              kind: 'spark',
              x: p.x,
              y: p.y,
              prevX: p.x,
              prevY: p.y,
              vx: Math.cos(a) * rand(0.6, 1.6),
              vy: Math.sin(a) * rand(0.6, 1.6),
              gravity: 0.04,
              drag: 0.96,
              color: p.color,
              size: rand(1, 1.6),
              life: rand(14, 22),
              maxLife: 20,
              crackleAt: null,
              twinklePhase: rand(0, TAU),
            });
          }
        }

        const alpha = Math.max(0, p.life / p.maxLife);
        const twinkle = 0.7 + 0.3 * Math.sin(now / 150 + p.twinklePhase);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = alpha * twinkle;
        ctx.lineWidth = p.size;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        ctx.globalAlpha = 1;

        return p.life > 0;
      });

      if (digit) {
        const growIn = Math.min(1, (now - digit.bornAt) / 300);
        let alpha = easeOutCubic(growIn);
        let scale = 0.7 + 0.3 * alpha;
        if (digit.dyingAt) {
          const t = Math.min(1, (now - digit.dyingAt) / 300);
          alpha = 1 - t;
          scale = 1 + t * 0.35;
        }
        const pulse = 1 + 0.03 * Math.sin(now / 260);

        ctx.save();
        ctx.translate(w / 2, h * 0.38);
        ctx.scale(scale * pulse, scale * pulse);
        ctx.font = `700 ${Math.floor(Math.min(w, h) * 0.34)}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = digit.color;
        ctx.globalAlpha = alpha;

        // One soft blurred pass for the glow (additive, so it blooms nicely
        // against the black sky), then one crisp pass with no shadow on top
        // so the glyph itself stays sharp instead of dissolving into the glow.
        ctx.globalCompositeOperation = 'lighter';
        ctx.shadowColor = digit.color;
        ctx.shadowBlur = 18;
        ctx.fillText(digit.text, 0, 0);

        ctx.globalCompositeOperation = 'source-over';
        ctx.shadowBlur = 0;
        ctx.fillText(digit.text, 0, 0);
        ctx.restore();
        ctx.globalAlpha = 1;
      }

      rafId = requestAnimationFrame(frame);
    };
    rafId = requestAnimationFrame(frame);

    const doneTimer = setTimeout(() => onDone?.(), durationMs);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(ambientTimer);
      clearTimeout(doneTimer);
      timeouts.forEach((t) => (t && typeof t.clear === 'function' ? t.clear() : clearTimeout(t)));
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[85]" aria-hidden="true" />;
}
