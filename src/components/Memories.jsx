import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ChapterHeader from './ChapterHeader.jsx';

const rotations = [-2.4, 1.6, -1.1, 2.2, -1.8, 1.3, -0.7, 2.0];

function PolaroidImage({ src, title }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="polaroid-img" aria-hidden="true">
        <span className="polaroid-placeholder">❤</span>
      </div>
    );
  }
  return (
    <div className="polaroid-img">
      <img
        src={src}
        alt={title}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function MemoryModal({ memory, onClose }) {
  const [failed, setFailed] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`Memory: ${memory.title}`}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.article
        className="modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35 }}
      >
        <button
          ref={closeRef}
          className="modal-close"
          onClick={onClose}
          aria-label="Close memory"
        >
          <X size={20} />
        </button>

        {failed ? (
          <div className="modal-img" aria-hidden="true">
            <span className="polaroid-placeholder">❤</span>
          </div>
        ) : (
          <div className="modal-img">
            <img
              src={memory.image}
              alt={memory.title}
              onError={() => setFailed(true)}
            />
          </div>
        )}

        <div className="modal-body">
          <p className="modal-date">{memory.date}</p>
          <h3 className="modal-title">{memory.title}</h3>
          {memory.caption && (
            <p className="modal-caption">{memory.caption}</p>
          )}
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function Memories({ chapter, memories }) {
  const [active, setActive] = useState(null);

  return (
    <section className="memories" id="memories">
      <div className="section-inner">
        <ChapterHeader
          number={chapter.number}
          title={chapter.title}
          subtitle="A stack of photos. Tap one to open it."
        />

        <div className="polaroid-grid">
          {memories.map((m, i) => (
            <motion.button
              key={i}
              className="polaroid"
              style={{ transform: `rotate(${rotations[i % rotations.length]}deg)` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              onClick={() => setActive(m)}
              aria-label={`Open memory: ${m.title}, ${m.date}`}
            >
              <PolaroidImage src={m.image} title={m.title} />
              <p className="polaroid-caption">{m.title}</p>
              <p className="polaroid-date">{m.date}</p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <MemoryModal memory={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
