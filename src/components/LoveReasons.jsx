import { useState } from 'react';
import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts.jsx';

function ReasonCard({ reason, index }) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((v) => !v);
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <motion.div
      className={`reason-card${flipped ? ' flipped' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`Reason: ${reason.title}. Click to reveal.`}
      onClick={toggle}
      onKeyDown={onKey}
    >
      <div className="reason-inner">
        <div className="reason-face reason-front">
          <span className="reason-icon" aria-hidden="true">{reason.icon}</span>
          <h3 className="reason-title">{reason.title}</h3>
          <p className="reason-hint">Tap to reveal</p>
        </div>
        <div className="reason-face reason-back">
          <p className="reason-back-text">{reason.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function LoveReasons({ reasons }) {
  return (
    <section className="reasons" id="reasons">
      <FloatingHearts count={8} sparkles={6} />

      <div className="section-inner">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          The evidence, elaborated
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ❤️ Reasons I <em>Love You</em>
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Tap a card. There's a lot of these — I'll keep it to a few.
        </motion.p>

        <div className="reason-grid">
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.title} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
