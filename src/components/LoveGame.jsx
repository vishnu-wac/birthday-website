import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import FloatingHearts from './FloatingHearts.jsx';

const GOAL = 10;
const SPAWN_INTERVAL_MS = 900;
const HEART_LIFETIME_MS = 6000;

// A single falling heart: spawns at a random x, drops linearly, self-cleans.
// Uses onPointerDown so a single tap on touch devices doesn't need to wait
// for the delayed click event (and doesn't fire both).
function FallingHeart({ heart, onCatch }) {
  return (
    <motion.button
      type="button"
      className="falling-heart"
      style={{ left: `${heart.left}%` }}
      initial={{ top: '-40px', opacity: 0 }}
      animate={{ top: '100%', opacity: [0, 1, 1, 1, 0.6] }}
      transition={{
        duration: heart.duration,
        ease: 'linear',
        opacity: { times: [0, 0.05, 0.5, 0.9, 1] },
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        onCatch(heart);
      }}
      aria-label="Catch this heart"
    >
      ❤️
    </motion.button>
  );
}

export default function LoveGame({ messages }) {
  const [running, setRunning] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [caught, setCaught] = useState(0);
  const [flash, setFlash] = useState(null);
  const [won, setWon] = useState(false);

  const idRef = useRef(0);
  const timerRef = useRef(null);
  const cleanupRef = useRef(null);

  const startGame = () => {
    setCaught(0);
    setWon(false);
    setFlash(null);
    setHearts([]);
    setRunning(true);
  };

  const stopGame = useCallback(() => {
    setRunning(false);
    setHearts([]);
    if (timerRef.current) clearInterval(timerRef.current);
    if (cleanupRef.current) clearInterval(cleanupRef.current);
  }, []);

  // Spawn hearts on an interval while running
  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      const id = ++idRef.current;
      const message = messages[Math.floor(Math.random() * messages.length)];
      const hasMessage = Math.random() < 0.35;
      setHearts((prev) => [
        ...prev,
        {
          id,
          left: Math.random() * 88 + 4,
          duration: 3.5 + Math.random() * 2.5,
          spawnedAt: Date.now(),
          message: hasMessage ? message : null,
        },
      ]);
    }, SPAWN_INTERVAL_MS);

    cleanupRef.current = setInterval(() => {
      const now = Date.now();
      setHearts((prev) => prev.filter((h) => now - h.spawnedAt < HEART_LIFETIME_MS));
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
      clearInterval(cleanupRef.current);
    };
  }, [running, messages]);

  const handleCatch = (heart) => {
    setHearts((prev) => prev.filter((h) => h.id !== heart.id));
    setCaught((c) => {
      const next = c + 1;
      if (next >= GOAL) {
        setWon(true);
        setRunning(false);
        setHearts([]);
      }
      return next;
    });
    if (heart.message) {
      setFlash(heart.message);
      setTimeout(() => setFlash(null), 1400);
    }
  };

  return (
    <section className="game" id="game">
      <FloatingHearts count={5} sparkles={4} />

      <div className="section-inner">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          A small game (rigged in your favour)
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ❤️ Catch <em>the Hearts</em>
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Tap {GOAL} hearts to win. Some of them carry secret messages.
        </motion.p>

        <div className="game-board">
          <div className="game-hud" aria-live="polite">
            <span>Hearts caught: {caught} / {GOAL}</span>
            {running && <span>Playing…</span>}
          </div>

          <AnimatePresence>
            {hearts.map((h) => (
              <FallingHeart key={h.id} heart={h} onCatch={handleCatch} />
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {flash && (
              <motion.div
                className="game-caught-msg"
                key={flash + Date.now()}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                {flash}
              </motion.div>
            )}
          </AnimatePresence>

          {!running && !won && (
            <div className="game-start-wrap">
              <button className="btn" type="button" onClick={startGame}>
                {caught > 0 ? 'Play again ❤️' : 'Start the Game ❤️'}
              </button>
            </div>
          )}

          <AnimatePresence>
            {won && (
              <motion.div
                className="game-win"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3>🎉 YOU WIN!</h3>
                <p>
                  Congratulations! Your prize is…<br />
                  a husband who loves you more than yesterday. ❤️
                </p>
                <button
                  className="btn btn-ghost"
                  onClick={startGame}
                  style={{ marginTop: 20, background: 'rgba(255,255,255,0.15)', color: '#fff', borderColor: 'rgba(255,255,255,0.6)' }}
                >
                  <RotateCcw size={16} /> Play again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {running && (
          <div className="game-controls">
            <button className="btn btn-ghost" onClick={stopGame}>
              Stop
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
