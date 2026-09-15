// The recurring "18" visual motif — a big soft numeral used as a background
// watermark, set in the cute rounded display font.
export default function Motif18({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none select-none font-display leading-none text-ink/[0.06] ${className}`}
    >
      18
    </span>
  );
}
