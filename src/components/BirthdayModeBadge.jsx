// A small floating pill in the top-left that says BIRTHDAY MODE: ON.
// Purely decorative — click it and it briefly winks at you.
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BirthdayModeBadge() {
  const [pulse, setPulse] = useState(false);

  const wink = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 1400);
  };

  return (
    <>
      <motion.button
        type="button"
        className="mode-badge"
        onClick={wink}
        aria-label="Birthday mode: on"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <span className="mode-dot" aria-hidden="true" />
        <span>BIRTHDAY MODE:&nbsp;ON</span>
      </motion.button>

      <AnimatePresence>
        {pulse && (
          <motion.div
            className="mode-toast"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            🎉 Absolutely on.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
