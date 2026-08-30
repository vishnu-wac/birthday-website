import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from './FloatingHearts.jsx';

function TimelineItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      className="timeline-item"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <span className="timeline-dot" aria-hidden="true">{item.icon}</span>
      <button
        className="timeline-card"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <p className="timeline-date">{item.date}</p>
        <h3 className="timeline-title">{item.title}</h3>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              className="timeline-story"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <p>{item.story}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function Timeline({ timeline }) {
  // Last item (Everything Ahead) always open by default
  const [openIndex, setOpenIndex] = useState(timeline.length - 1);

  return (
    <section className="timeline" id="timeline">
      <FloatingHearts count={5} sparkles={4} />

      <div className="section-inner">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Us, in chapters
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our <em>Timeline</em>
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Tap each chapter to open it. Ours is still being written.
        </motion.p>

        <div className="timeline-list">
          {timeline.map((item, i) => (
            <TimelineItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
