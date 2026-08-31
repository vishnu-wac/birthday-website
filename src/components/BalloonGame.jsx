import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import ChapterHeader from './ChapterHeader.jsx';

const GOAL = 8;
const SPAWN_INTERVAL_MS = 900;
const BALLOON_LIFETIME_MS = 7000;
const COLORS = ['#f4b8a3', '#f7d774', '#c6b3e0', '#f9c1cf', '#b4d8c7', '#a4c8e6'];

// A balloon drifting UP the board. Pops on pointerdown.
function FloatingBalloon({ balloon, onPop }) {
  return (
    <motion.button
      type="button"
      className="pop-balloon"
      style={{ left: `${balloon.left}%`, color: balloon.color }}
      initial={{ bottom: '-70px', opacity: 0 }}
      animate={{
        bottom: '110%',
        opacity: [0, 1, 1, 1, 0.8],
        x: [0, balloon.sway, -balloon.sway, 0],
      }}
      transition={{
        bottom: { duration: balloon.duration, ease: 'linear' },
        opacity: {
          duration: balloon.duration,
          times: [0, 0.05, 0.5, 0.9, 1],
        },
        x: {
          duration: balloon.duration,
          times: [0, 0.33, 0.66, 1],
          ease: 'easeInOut',
        },
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        onPop(balloon);
      }}
      aria-label="Pop this balloon"
    >
      <svg viewBox="0 0 60 84" width="46" height="64" aria-hidden="true">
        <ellipse cx="30" cy="30" rx="26" ry="30" fill="currentColor" />
        <ellipse cx="22" cy="20" rx="6" ry="9" fill="rgba(255,255,255,0.35)" />
        <polygon points="27,60 33,60 30,66" fill="currentColor" />
        <path
          d="M30 66 C 22 72 38 76 30 84"
          stroke="rgba(0,0,0,0.35)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </motion.button>
  );
}

export default function BalloonGame({ chapter, messages }) {
  const [running, setRunning] = useState(false);
  const [balloons, setBalloons] = useState([]);
  const [popped, setPopped] = useState(0);
  const [flash, setFlash] = useState(null);
  const [won, setWon] = useState(false);

  const idRef = useRef(0);
  const spawnRef = useRef(null);
  const cleanupRef = useRef(null);

  const startGame = () => {
    setPopped(0);
    setWon(false);
    setFlash(null);
    setBalloons([]);
    setRunning(true);
  };

  const stopGame = useCallback(() => {
    setRunning(false);
    setBalloons([]);
    if (spawnRef.current) clearInterval(spawnRef.current);
    if (cleanupRef.current) clearInterval(cleanupRef.current);
  }, []);

  useEffect(() => {
    if (!running) return;
    spawnRef.current = setInterval(() => {
      const id = ++idRef.current;
      setBalloons((prev) => [
        ...prev,
        {
          id,
          left: 6 + Math.random() * 84,
          duration: 5 + Math.random() * 2.5,
          spawnedAt: Date.now(),
          color: COLORS[id % COLORS.length],
          sway: 8 + Math.random() * 14,
        },
      ]);
    }, SPAWN_INTERVAL_MS);

    cleanupRef.current = setInterval(() => {
      const now = Date.now();
      setBalloons((prev) => prev.filter((b) => now - b.spawnedAt < BALLOON_LIFETIME_MS));
    }, 1000);

    return () => {
      clearInterval(spawnRef.current);
      clearInterval(cleanupRef.current);
    };
  }, [running]);

  const handlePop = (balloon) => {
    setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
    setPopped((c) => {
      const next = c + 1;
      if (next >= GOAL) {
        setWon(true);
        setRunning(false);
        setBalloons([]);
      }
      return next;
    });
    // 40% chance of showing a little floating message on pop
    if (Math.random() < 0.4) {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      setFlash({ text: msg, at: Date.now() });
      setTimeout(() => setFlash(null), 1200);
    }
  };

  return (
    <section className="balloon-game" id="game">
      <div className="section-inner">
        <ChapterHeader
          number={chapter.number}
          title={chapter.title}
          subtitle={`Pop ${GOAL} balloons. Show them who's boss.`}
        />

        <div className="game-board">
          <div className="game-hud" aria-live="polite">
            <span>Balloons popped: {popped} / {GOAL}</span>
            {running && <span>Go!</span>}
          </div>

          <AnimatePresence>
            {balloons.map((b) => (
              <FloatingBalloon key={b.id} balloon={b} onPop={handlePop} />
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {flash && (
              <motion.div
                className="game-caught-msg"
                key={flash.at}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                {flash.text}
              </motion.div>
            )}
          </AnimatePresence>

          {!running && !won && (
            <div className="game-start-wrap">
              <button className="btn" type="button" onClick={startGame}>
                {popped > 0 ? 'Play again 🎈' : 'Start popping 🎈'}
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
                <h3>🎉 YOU DID IT!</h3>
                <p>
                  You officially deserve cake now. 🎂<br />
                  (You already did. But now it's official.)
                </p>
                <button
                  className="btn btn-ghost"
                  onClick={startGame}
                  style={{
                    marginTop: 20,
                    background: 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.6)',
                  }}
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
