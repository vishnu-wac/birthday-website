import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingBirthday from './FloatingBirthday.jsx';

// Playful opening splash. Two beats of copy → the big reveal → LET'S GO button.
export default function Announcement({ wifeName, onEnter }) {
  const [stage, setStage] = useState(0); // 0 → 1 → 2 → 3 (button shown)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 1400),
      setTimeout(() => setStage(2), 3000),
      setTimeout(() => setStage(3), 4800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.section
      className="announcement"
      role="dialog"
      aria-label="Birthday announcement"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    >
      <FloatingBirthday balloons={5} confetti={16} stars={8} />

      <div className="announcement-inner">
        <motion.p
          className="announcement-alert"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          🚨 IMPORTANT ANNOUNCEMENT 🚨
        </motion.p>

        <AnimatePresence>
          {stage >= 1 && (
            <motion.p
              key="line1"
              className="announcement-line"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Today is <em>not</em> an ordinary day.
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage >= 2 && (
            <motion.p
              key="line2"
              className="announcement-line"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Someone very special is celebrating her birthday today. 🎂
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {stage >= 3 && (
            <>
              <motion.h1
                key="reveal"
                className="announcement-big"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              >
                HAPPY BIRTHDAY,
                <span>{wifeName?.toUpperCase()}! 🎉</span>
              </motion.h1>

              <motion.p
                key="prep"
                className="announcement-prep"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.35 }}
              >
                Okay, let's see what your husband prepared… 👀
              </motion.p>

              <motion.button
                key="cta"
                type="button"
                className="btn announcement-btn"
                onClick={onEnter}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                LET'S GO 🎉
              </motion.button>
            </>
          )}
        </AnimatePresence>

        <button
          type="button"
          className="announcement-skip"
          onClick={onEnter}
          aria-label="Skip intro"
        >
          skip
        </button>
      </div>
    </motion.section>
  );
}
