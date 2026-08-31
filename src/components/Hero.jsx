import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import FloatingBirthday from './FloatingBirthday.jsx';

export default function Hero({ heroPhoto, wifeName }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="hero" id="hero">
      <FloatingBirthday balloons={4} confetti={14} stars={6} />

      <div className="section-inner hero-inner">
        <motion.div
          className="hero-photo"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          {!imgFailed ? (
            <img
              src={heroPhoto}
              alt={`Photo of ${wifeName}`}
              onError={() => setImgFailed(true)}
            />
          ) : (
            <span className="hero-photo-fallback" aria-hidden="true">🎂</span>
          )}
          <span className="hero-photo-vignette" aria-hidden="true" />
        </motion.div>

        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          🎈 today's special event
        </motion.p>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.5 }}
        >
          🎂 Happy Birthday,
          <span className="hero-title-name">{wifeName}! 🎉</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          Another year older…<br />
          but don't worry, I won't tell anyone your age. 🤫😂
        </motion.p>

        <motion.p
          className="hero-whisper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.4 }}
        >
          Scroll down. I made you a few things. 👇
        </motion.p>
      </div>

      <motion.div
        className="scroll-cue"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <ChevronDown size={18} />
      </motion.div>
    </section>
  );
}
