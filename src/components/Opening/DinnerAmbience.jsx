import GlowBackground from '../UI/GlowBackground.jsx';
import FloatingFlowers from '../UI/FloatingFlowers.jsx';
import BalloonBurst from '../UI/BalloonBurst.jsx';
import AmbientFireworks from '../UI/AmbientFireworks.jsx';

// One shared, viewport-fixed decoration for the whole dinner-day experience
// (RestaurantReveal + DinnerTransport). Being `fixed` rather than scoped per
// section is what makes the glow/flowers/balloons read as one continuous
// atmosphere instead of two sections that happen to sit next to each other.
//
// Two separate layers, not one: GlowBackground's blurred color blobs are
// large and opaque enough to wash out anything under them, so they sit
// BEHIND the page content (z-[1], below the z-10 the card/sections use).
// The flowers/balloons/fireworks are meant to be able to drift in front of
// the card (z-[15], above that same z-10) — but that's still comfortably
// below UI chrome like SideNav/MusicPlayer (z-40+), and everything here is
// pointer-events-none so it never blocks a tap either way.
export default function DinnerAmbience() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
        <GlowBackground variant="pastel" />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[15] overflow-hidden" aria-hidden="true">
        <FloatingFlowers />
        <BalloonBurst count={6} />
        <AmbientFireworks />
      </div>
    </>
  );
}
