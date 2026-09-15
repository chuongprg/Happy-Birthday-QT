import { motion } from 'framer-motion';
import FireworksShow from './FireworksShow.jsx';
import SparkleShower from '../UI/SparkleShower.jsx';
import BalloonBurst from '../UI/BalloonBurst.jsx';

// The finale of the intro cinematic: a full fireworks show (which spells out
// the 24→25 age reveal mid-way when it's live) plus electric sparkle and
// balloons, right before the site settles into the Hero screen.
export default function Celebration({ durationMs = 5500, showAgeReveal = false, onDone }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[85] overflow-hidden bg-ink"
    >
      <FireworksShow durationMs={durationMs} showAgeReveal={showAgeReveal} onDone={onDone} />
      <SparkleShower />
      <BalloonBurst />
    </motion.section>
  );
}
