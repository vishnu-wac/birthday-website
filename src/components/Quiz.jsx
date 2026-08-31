import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import ChapterHeader from './ChapterHeader.jsx';

// Score a result: for opinion questions (correct === null), any answer counts.
function scoreQuiz(quiz, answers) {
  return quiz.reduce((score, q, i) => {
    const ans = answers[i];
    if (ans == null) return score;
    if (q.correct == null) return score + 1;
    return q.correct === ans ? score + 1 : score;
  }, 0);
}

function pickResult(score, results) {
  // results are sorted by ascending min; pick the highest bucket the score qualifies for.
  let chosen = results[0];
  for (const r of results) {
    if (score >= r.min) chosen = r;
  }
  return chosen;
}

export default function Quiz({ chapter, quiz, results }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(() => Array(quiz.length).fill(null));
  const done = step >= quiz.length;

  const pick = (choice) => {
    const next = [...answers];
    next[step] = choice;
    setAnswers(next);
    setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers(Array(quiz.length).fill(null));
  };

  const score = scoreQuiz(quiz, answers);
  const result = pickResult(score, results);
  const q = quiz[step];

  return (
    <section className="quiz" id="quiz">
      <div className="section-inner">
        <ChapterHeader
          number={chapter.number}
          title={chapter.title}
          subtitle="Fair warning — the answers are based entirely on my opinion."
        />

        <div className="quiz-card">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={`q-${step}`}
                className="quiz-question"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35 }}
              >
                <p className="quiz-count">
                  Question {step + 1} of {quiz.length}
                </p>
                <h3 className="quiz-text">{q.question}</h3>
                <div className="quiz-options">
                  {q.options.map((opt, i) => (
                    <button
                      type="button"
                      key={i}
                      className="quiz-option"
                      onClick={() => pick(i)}
                    >
                      <span className="quiz-option-letter">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                className="quiz-result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="quiz-result-eyebrow">🎉 result</p>
                <p className="quiz-result-score">
                  You got <strong>{score}</strong> / {quiz.length}
                </p>
                <p className="quiz-result-msg">{result.message}</p>
                <button
                  type="button"
                  className="btn btn-ghost quiz-retry"
                  onClick={reset}
                >
                  <RotateCcw size={16} /> try again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
