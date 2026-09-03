import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

// Full-screen 2-second flash between the countdown and the birthday site.
// Only ever shown when the clock hits zero live — a moment she'll see once.
const PALETTE = ['#f4b8a3', '#f7d774', '#c6b3e0', '#f9c1cf', '#e5a765', '#b8933f'];
const HOLD_MS = 2200;

function celebrate() {
  confetti({
    particleCount: 220,
    spread: 110,
    startVelocity: 60,
    origin: { x: 0.5, y: 0.55 },
    colors: PALETTE,
  });
  setTimeout(() => {
    confetti({
      particleCount: 90,
      spread: 90,
      startVelocity: 50,
      origin: { x: 0.15, y: 0.7 },
      colors: PALETTE,
    });
    confetti({
      particleCount: 90,
      spread: 90,
      startVelocity: 50,
      origin: { x: 0.85, y: 0.7 },
      colors: PALETTE,
    });
  }, 420);
}

export default function RevealTransition({ wifeName, onComplete }) {
  useEffect(() => {
    celebrate();
    const t = setTimeout(onComplete, HOLD_MS);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.section
      className="reveal-flash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
    >
      <motion.div
        className="reveal-flash-inner"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
      >
        <p className="reveal-flash-eyebrow">🎉 It's your day</p>
        <h1 className="reveal-flash-title">
          {wifeName}<span className="reveal-flash-heart"> ❤</span>
        </h1>
        <p className="reveal-flash-sub">Let the day begin.</p>
      </motion.div>
    </motion.section>
  );
}
