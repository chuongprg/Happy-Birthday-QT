// Soft blurred color blobs used behind sections — the cute-sticker equivalent
// of atmospheric lighting. `variant` swaps the palette for celebration
// moments (wine red accents) vs. the everyday pastel pink/mint mix.
export default function GlowBackground({ variant = 'pastel', className = '' }) {
  if (variant === 'wine') {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
        <div className="absolute -top-1/4 left-1/2 h-[55vh] w-[55vh] -translate-x-1/2 rounded-full bg-wine/20 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-[40vh] w-[40vh] rounded-full bg-pink/40 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[35vh] w-[35vh] rounded-full bg-mint/30 blur-[100px]" />
      </div>
    );
  }

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute -top-1/3 -left-1/4 h-[50vh] w-[50vh] rounded-full bg-pink/50 blur-[100px]" />
      <div className="absolute top-1/3 -right-1/4 h-[45vh] w-[45vh] rounded-full bg-mint/40 blur-[110px]" />
      <div className="absolute bottom-0 left-1/4 h-[35vh] w-[35vh] rounded-full bg-green/40 blur-[90px]" />
    </div>
  );
}
