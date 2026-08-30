import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EasterEgg() {
  const [step, setStep] = useState(0); // 0: trigger visible, 1: gotcha, 2: revealed

  const onClick = () => {
    if (step === 0) {
      setStep(1);
      setTimeout(() => setStep(2), 1400);
    }
  };

  return (
    <div className="easter-egg">
      {step === 0 && (
        <button
          className="easter-trigger"
          onClick={onClick}
          aria-label="A tempting little button"
        >
          🤫 Don't click this.
        </button>
      )}

      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            className="easter-reveal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <strong>I knew you would click it. 😂</strong>
            {step === 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                One more reason I love you: <br />
                you're curious. ❤️ <br />
                And that's one of the many things that makes you… you.
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
