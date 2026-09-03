import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Lightbulb, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import ChapterHeader from './ChapterHeader.jsx';

// Fire a small celebratory burst when the voucher reveals.
function celebrateWin() {
  const palette = ['#f4b8a3', '#f7d774', '#c6b3e0', '#f9c1cf', '#e5a765', '#b8933f'];
  confetti({
    particleCount: 110,
    spread: 75,
    startVelocity: 48,
    origin: { x: 0.5, y: 0.55 },
    colors: palette,
  });
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 90,
      startVelocity: 40,
      origin: { x: 0.2, y: 0.7 },
      colors: palette,
    });
    confetti({
      particleCount: 60,
      spread: 90,
      startVelocity: 40,
      origin: { x: 0.8, y: 0.7 },
      colors: palette,
    });
  }, 320);
}

// A tiny 3-question reasoning game (bank-exam flavoured, kept easy).
// Answer all 3 correctly → the Amazon voucher is revealed as the prize.
export default function ReasoningChallenge({ chapter, questions, prize }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(() => Array(questions.length).fill(null));
  const [feedback, setFeedback] = useState(null);      // 'right' | 'wrong'
  const [pickedIndex, setPickedIndex] = useState(null); // last option tapped
  const [showHint, setShowHint] = useState(false);
  const [done, setDone] = useState(false);

  const q = questions[step];

  const pick = (i) => {
    if (feedback === 'right') return; // don't let a mid-transition click hijack the flow
    const correct = i === q.correct;
    setPickedIndex(i);
    if (correct) {
      const next = [...answers];
      next[step] = i;
      setAnswers(next);
      setFeedback('right');
    } else {
      setFeedback('wrong');
    }
  };

  // Confetti on win.
  useEffect(() => {
    if (done) {
      const t = setTimeout(celebrateWin, 300);
      return () => clearTimeout(t);
    }
  }, [done]);

  // Right → hold the green flash briefly, then advance.
  // Wrong → let her see the miss, then reset so she can try again.
  useEffect(() => {
    if (!feedback) return;
    const rightDelay = 720;
    const wrongDelay = 1200;
    const t = setTimeout(() => {
      if (feedback === 'right') {
        setShowHint(false);
        setPickedIndex(null);
        if (step + 1 < questions.length) {
          setStep(step + 1);
        } else {
          setDone(true);
        }
      } else {
        setPickedIndex(null);
      }
      setFeedback(null);
    }, feedback === 'right' ? rightDelay : wrongDelay);
    return () => clearTimeout(t);
  }, [feedback, step, questions.length]);

  const restart = () => {
    setStep(0);
    setAnswers(Array(questions.length).fill(null));
    setFeedback(null);
    setShowHint(false);
    setDone(false);
  };

  const solvedCount = answers.filter((a) => a !== null).length;

  return (
    <section className="reasoning" id="game">
      <div className="section-inner">
        <ChapterHeader
          number={chapter.number}
          title={chapter.title}
          subtitle="Three tiny questions for a very smart girl. Solve all three and there's a prize. 🎁"
        />

        <div className="reasoning-card">
          {/* progress dots */}
          <div className="reasoning-progress" aria-hidden="true">
            {questions.map((_, i) => (
              <span
                key={i}
                className={`reasoning-dot ${i < solvedCount ? 'is-done' : ''} ${i === step && !done ? 'is-current' : ''}`}
              />
            ))}
          </div>

          {!done ? (
              <motion.div
                key={`q-${step}`}
                className="reasoning-question"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <p className="reasoning-count">
                  Question {step + 1} of {questions.length}
                </p>
                <p className="reasoning-prompt">{q.prompt}</p>
                <h3 className="reasoning-text">{q.question}</h3>

                <div className="reasoning-options">
                  {q.options.map((opt, i) => {
                    const isPicked = pickedIndex === i;
                    const isCorrect = isPicked && feedback === 'right';
                    const isWrong = isPicked && feedback === 'wrong';
                    return (
                      <button
                        type="button"
                        key={i}
                        className={`reasoning-option ${isCorrect ? 'is-correct' : ''} ${isWrong ? 'is-wrong' : ''}`}
                        onClick={() => pick(i)}
                      >
                        <span className="reasoning-option-letter">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="reasoning-hint-row">
                  <button
                    type="button"
                    className="reasoning-hint-btn"
                    onClick={() => setShowHint((v) => !v)}
                  >
                    <Lightbulb size={14} /> {showHint ? 'hide hint' : 'need a hint?'}
                  </button>
                  <AnimatePresence>
                    {showHint && (
                      <motion.p
                        className="reasoning-hint"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        {q.hint}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      key={feedback}
                      className={`reasoning-feedback is-${feedback}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {feedback === 'right' ? (
                        <>
                          <Check size={16} /> Nice! Moving on.
                        </>
                      ) : (
                        <>
                          <X size={16} /> Not quite — try again.
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="prize"
                className="reasoning-prize"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55 }}
              >
                <h3 className="reasoning-prize-heading">{prize.heading}</h3>
                <p className="reasoning-prize-sub">{prize.subline}</p>

                <div className="voucher-wrap">
                  <span className="voucher-ribbon">🎁 For You</span>
                  <div className="voucher-frame">
                    <img
                      src={prize.image}
                      alt="Your Amazon voucher"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>

                <p className="reasoning-prize-caption">{prize.caption}</p>

                <button
                  type="button"
                  className="btn btn-ghost reasoning-retry"
                  onClick={restart}
                >
                  <RotateCcw size={16} /> play again
                </button>
              </motion.div>
            )}
        </div>
      </div>
    </section>
  );
}
