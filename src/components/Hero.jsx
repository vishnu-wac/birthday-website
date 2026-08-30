import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import FloatingHearts from './FloatingHearts.jsx';

const lines = [
  { text: 'Yes… you.' },
  {
    text: 'The girl who somehow managed to become',
    emphasis: 'the most important person in my life. ❤️',
  },
  {
    text: 'Today isn\'t an ordinary day.',
    emphasis: 'It\'s the day the world got YOU.',
  },
  {
    text: 'And unfortunately for me…',
    emphasis: 'I fell completely in love with you. 😌',
  },
];

export default function Hero({ heroPhoto, onContinue }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section className="hero" id="hero">
      <FloatingHearts count={12} sparkles={12} />

      <div className="section-inner">
        <motion.div
          className="hero-photo"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          {!imgFailed ? (
            <img
              src={heroPhoto}
              alt="Us"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <span className="hero-photo-fallback" aria-hidden="true">❤️</span>
          )}
        </motion.div>

        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          hey you 👀
        </motion.p>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35 }}
        >
          HEY YOU!
        </motion.h1>

        <div className="hero-lines">
          <AnimatePresence>
            {lines.map((line, i) => (
              <motion.p
                key={i}
                className="hero-line"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.35 }}
              >
                {line.text}
                {line.emphasis && (
                  <>
                    <br />
                    <em>{line.emphasis}</em>
                  </>
                )}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>

        <motion.button
          className="btn"
          onClick={onContinue}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Okay, show me what you made 👀
        </motion.button>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <ArrowDown size={14} style={{ verticalAlign: 'middle' }} /> scroll
      </div>
    </section>
  );
}
