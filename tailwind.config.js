/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pink: '#F8C8DC',
        'pink-deep': '#F2A0C4',
        mint: '#8DDDD0',
        'mint-deep': '#5FC2B3',
        green: '#C8E6C9',
        'green-deep': '#9FD3A2',
        wine: '#7A2346',
        'wine-deep': '#5C1935',
        ink: '#1A1A1A',
        cream: '#FFFDF9',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'cursive'],
        body: ['Quicksand', 'sans-serif'],
      },
      borderRadius: {
        sticker: '28px',
        blob: '40% 60% 55% 45% / 45% 40% 60% 55%',
      },
      boxShadow: {
        sticker: '0 6px 0 rgba(26,26,26,0.12), 0 14px 30px -10px rgba(26,26,26,0.18)',
        'sticker-sm': '0 4px 0 rgba(26,26,26,0.1), 0 8px 18px -8px rgba(26,26,26,0.16)',
        'sticker-pressed': '0 2px 0 rgba(26,26,26,0.12), 0 4px 10px -6px rgba(26,26,26,0.16)',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(var(--r, 0deg))' },
          '50%': { transform: 'translate(var(--dx, 10px), -18px) rotate(var(--r2, 0deg))' },
        },
        pop: {
          '0%': { transform: 'scale(0.6)', opacity: 0 },
          '60%': { transform: 'scale(1.08)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        drift: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(24px)' },
          '100%': { transform: 'translateX(0)' },
        },
        // FlowerBurst: radiates outward from center via --dx/--dy (vw/vh
        // lengths) and spins via --rot (deg). Pure CSS so 100+ concurrent
        // instances animate on the compositor instead of costing main-thread
        // JS every frame.
        bloom: {
          '0%': { opacity: '0', transform: 'translate(-50%, -50%) scale(0.12) rotate(0deg)' },
          '25%': {
            opacity: '1',
            transform:
              'translate(calc(-50% + var(--dx) * 0.42), calc(-50% + var(--dy) * 0.42)) scale(0.55) rotate(calc(var(--rot) * 0.35))',
          },
          '55%': {
            opacity: '1',
            transform:
              'translate(calc(-50% + var(--dx) * 0.72), calc(-50% + var(--dy) * 0.72)) scale(1) rotate(calc(var(--rot) * 0.65))',
          },
          '85%': {
            opacity: '1',
            transform:
              'translate(calc(-50% + var(--dx) * 0.95), calc(-50% + var(--dy) * 0.95)) scale(1.5) rotate(calc(var(--rot) * 0.88))',
          },
          '100%': {
            opacity: '0',
            transform: 'translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1.7) rotate(var(--rot))',
          },
        },
        // Rapid electric-white twinkles for the "pháo điện" celebration layer.
        twinkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.4)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        // Balloons rising from just below the viewport up past the top, with
        // a horizontal sway via --sway (px) set per-instance inline.
        balloonRise: {
          '0%': { opacity: '0', transform: 'translate(0, 10vh) rotate(-4deg)' },
          '10%': { opacity: '1' },
          '50%': { transform: 'translate(var(--sway), -60vh) rotate(4deg)' },
          '100%': { opacity: '0', transform: 'translate(0, -130vh) rotate(-4deg)' },
        },
        // A faint, irregular brightness flicker over the photo montage so it
        // reads as projected film rather than a flat slideshow.
        filmFlicker: {
          '0%, 100%': { opacity: '1' },
          '48%': { opacity: '0.96' },
          '50%': { opacity: '0.99' },
          '52%': { opacity: '0.94' },
          '74%': { opacity: '1' },
        },
        // The photo montage's Ken Burns zoom/pan, driven entirely by
        // --kb-* custom properties set per-slide inline (duration included)
        // so this runs on the compositor instead of Framer Motion's
        // per-frame JS — the montage already competes with decoding a fresh
        // multi-megapixel photo every couple seconds, so keeping its own
        // motion off the main thread matters for staying smooth on mid-range
        // phones.
        kenBurns: {
          '0%': { transform: 'scale(var(--kb-s0)) translate(var(--kb-x0), var(--kb-y0))' },
          '100%': { transform: 'scale(var(--kb-s1)) translate(var(--kb-x1), var(--kb-y1))' },
        },
      },
      animation: {
        wiggle: 'wiggle 1.6s ease-in-out infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        pop: 'pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        drift: 'drift 10s ease-in-out infinite',
        bloom: 'bloom 3.6s ease-out both',
        twinkle: 'twinkle 1s ease-in-out infinite',
        'balloon-rise': 'balloonRise 8s ease-in-out infinite',
        'film-flicker': 'filmFlicker 6s steps(1) infinite',
        'ken-burns': 'kenBurns 2s linear forwards',
      },
    },
  },
  plugins: [],
};
