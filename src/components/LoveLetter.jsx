import { useState } from 'react';
import { motion } from 'framer-motion';

// Cinematic Hogwarts-letter open:
//   closed    → parchment front, handwritten emerald address
//   flipping  → envelope rotates Y 180° to show the wax-sealed back
//   breaking  → wax seal cracks / falls
//   opening   → back flap folds up, letter peeks out of the pouch
//   open      → envelope disappears, full letter unfolds into view

// Absolute delays (ms after tap) at which each stage begins.
const TIMELINE = [
  { stage: 'flipping', at: 0 },
  { stage: 'breaking', at: 900 },
  { stage: 'opening', at: 1500 },
  { stage: 'open', at: 2700 },
];

export default function LoveLetter({ loveLetter, husbandName, wifeName }) {
  const [stage, setStage] = useState('closed');

  const openIt = () => {
    if (stage !== 'closed') return;
    TIMELINE.forEach(({ stage: s, at }) => {
      setTimeout(() => setStage(s), at);
    });
  };

  const flipped = stage !== 'closed';
  const broken = ['breaking', 'opening', 'open'].includes(stage);
  const opening = ['opening', 'open'].includes(stage);
  const isOpen = stage === 'open';

  return (
    <section className="letter" id="letter">
      <div className="section-inner">
        <motion.p
          className="letter-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
        >
          Okay… jokes aside. ❤️
        </motion.p>

        {!isOpen ? (
          <motion.div
            className="envelope-stage"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <button
              type="button"
              className="envelope-btn"
              onClick={openIt}
              aria-label="Open the letter"
              disabled={stage !== 'closed'}
            >
              <div
                className={[
                  'envelope',
                  flipped ? 'is-flipped' : '',
                  broken ? 'is-broken' : '',
                  opening ? 'is-opening' : '',
                ].join(' ')}
              >
                <div className="env-glow" aria-hidden="true" />

                {/* FRONT — parchment + emerald-ink address */}
                <div className="env-face env-front">
                  <div className="env-parchment" />
                  <div className="env-stamp" aria-hidden="true">
                    <span className="env-stamp-heart">❤</span>
                    <span className="env-stamp-caption">With Love</span>
                  </div>
                  <div className="env-address">
                    <p className="env-addr-name">Miss {wifeName}</p>
                    <p>The Cosiest Home in Kerala,</p>
                    <p>Wherever She's Reading This Now</p>
                    <p className="env-addr-post">✦ By Owl Post ✦</p>
                  </div>
                </div>

                {/* BACK — wax seal + fold-up flap + letter peek */}
                <div className="env-face env-back">
                  <div className="env-parchment" />
                  <div className="env-letter-peek" aria-hidden="true">
                    <div className="env-letter-inner">
                      <span className="env-letter-heart">❤</span>
                      <span className="env-letter-lines">
                        <i />
                        <i />
                        <i />
                      </span>
                    </div>
                  </div>
                  <div className="env-back-flap">
                    <div className="env-back-flap-inner" />
                  </div>
                  <div className="wax-seal" aria-hidden="true">
                    <span>❤</span>
                  </div>
                </div>
              </div>
            </button>

            {stage === 'closed' && (
              <p className="envelope-hint">✧ Tap to open ✧</p>
            )}
          </motion.div>
        ) : (
          <motion.article
            className="letter-body"
            initial={{ opacity: 0, scaleY: 0.05, y: -40 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top center' }}
          >
            {/* Edit the letter body in src/data/birthdayData.js */}
            <p className="letter-text">{loveLetter}</p>
            <p className="letter-sign">
              — Yours, always{husbandName ? `, ${husbandName}` : ''}{' '}
              <span aria-hidden="true">❤</span>
            </p>
          </motion.article>
        )}
      </div>
    </section>
  );
}
