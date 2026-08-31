import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// A single hidden trigger. Clicking reveals a small quip.
export default function EasterEgg({ trigger, reveal, align = 'center' }) {
  const [step, setStep] = useState(0);

  const onClick = () => {
    if (step === 0) setStep(1);
  };

  return (
    <div className={`easter-egg easter-egg-${align}`}>
      <button
        type="button"
        className="easter-trigger"
        onClick={onClick}
        aria-label={trigger}
      >
        {trigger}
      </button>

      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            className="easter-reveal"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {reveal}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
