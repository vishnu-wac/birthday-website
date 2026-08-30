import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import FloatingHearts from './FloatingHearts.jsx';

function Fireworks() {
  const bursts = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: 5 + Math.random() * 90,
    top: 10 + Math.random() * 70,
    color: ['#f4b5c1', '#e88ea0', '#c9a34a', '#e8c976', '#ffffff'][i % 5],
    delay: Math.random() * 1.4,
  }));
  return (
    <div className="fireworks" aria-hidden="true">
      {bursts.map((b) => (
        <span
          key={b.id}
          className="firework"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            background: b.color,
            boxShadow: `0 0 20px 4px ${b.color}`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function BirthdaySurprise({ wifeName, finalWish }) {
  const [stage, setStage] = useState('wait'); // wait -> reveal -> celebrated
  const [candleOut, setCandleOut] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  // Reveal the title after a short suspense delay when section enters view.
  useEffect(() => {
    if (stage !== 'wait') return;
    // Auto-reveal when the section is loaded; the user scrolls to it.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setStage('reveal'), 1400);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    const el = document.getElementById('surprise');
    if (el) io.observe(el);
    return () => io.disconnect();
  }, [stage]);

  const blowOutCandle = () => {
    if (candleOut) return;
    setCandleOut(true);

    // Confetti burst from two corners for a nice spread
    const shoot = (originX) => {
      confetti({
        particleCount: 90,
        spread: 70,
        startVelocity: 45,
        origin: { x: originX, y: 0.7 },
        colors: ['#f4b5c1', '#e88ea0', '#c9a34a', '#e8c976', '#ffffff'],
      });
    };
    shoot(0.2);
    shoot(0.8);
    setTimeout(() => {
      confetti({
        particleCount: 140,
        spread: 100,
        startVelocity: 55,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#f4b5c1', '#e88ea0', '#c9a34a', '#e8c976', '#ffffff'],
      });
    }, 350);

    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 3000);
    setStage('celebrated');
  };

  return (
    <section className="surprise" id="surprise">
      <FloatingHearts count={14} sparkles={16} />
      {showFireworks && <Fireworks />}

      <div className="surprise-inner">
        <AnimatePresence mode="wait">
          {stage === 'wait' && (
            <motion.div
              key="wait"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="surprise-preheader">Wait…</p>
              <p className="surprise-preheader">There's one more thing.</p>
            </motion.div>
          )}

          {(stage === 'reveal' || stage === 'celebrated') && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h2
                className="surprise-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                🎂 Happy Birthday,
                <span>{wifeName} ❤️</span>
              </motion.h2>

              <motion.p
                className="surprise-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {candleOut
                  ? '✨ Wish sent to the universe ✨'
                  : 'Make a wish… ✨  (tap the candle)'}
              </motion.p>

              <motion.button
                className="cake-wrap"
                onClick={blowOutCandle}
                aria-label={candleOut ? 'Candle blown out' : 'Tap the candle to make a wish'}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="cake" aria-hidden="true">
                  <div className="cake-plate" />
                  <div className="cake-base">
                    <div className="cake-drip" />
                  </div>
                  <div className="cake-top" />
                  <div className="candle">
                    <div className="candle-wick" />
                    {!candleOut && (
                      <>
                        <div className="flame" />
                        <div className="flame-glow" />
                      </>
                    )}
                  </div>
                </div>
              </motion.button>

              <AnimatePresence>
                {stage === 'celebrated' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: 0.4 }}
                  >
                    <p className="surprise-wish">{finalWish}</p>
                    <p className="surprise-signature">Always yours ❤</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
