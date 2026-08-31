import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChapterHeader from './ChapterHeader.jsx';

// A single gift box. Closed: ribbon-tied box. Open: lid flies off, message rises.
function GiftBox({ gift, index, isOpen, onToggle }) {
  return (
    <motion.button
      type="button"
      className={`gift ${isOpen ? 'is-open' : ''}`}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label={isOpen ? `Close ${gift.label}` : `Open ${gift.label}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.09 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="gift-visual">
        <div className="gift-shadow" aria-hidden="true" />
        <div className="gift-lid" aria-hidden="true">
          <div className="gift-bow" aria-hidden="true" />
        </div>
        <div className="gift-box" aria-hidden="true">
          <div className="gift-ribbon-v" />
          <div className="gift-ribbon-h" />
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="gift-card"
              initial={{ y: 40, opacity: 0, rotate: -3 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="gift-card-title">{gift.title}</p>
              <p className="gift-card-msg">{gift.message}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="gift-label">{isOpen ? '↑ close' : gift.label}</p>
    </motion.button>
  );
}

export default function Gifts({ chapter, gifts }) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="gifts" id="gifts">
      <div className="section-inner">
        <ChapterHeader
          number={chapter.number}
          title={chapter.title}
          subtitle="Pick one. Or all of them, you deserve it."
        />

        <div className="gifts-row">
          {gifts.map((g, i) => (
            <GiftBox
              key={i}
              gift={g}
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
