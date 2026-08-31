import { motion } from 'framer-motion';

// Small elegant chapter marker shown above each major section.
// number: '01', '02'…  title: 'The Girl Who Stole My Heart'
export default function ChapterHeader({ number, title, subtitle }) {
  return (
    <div className="chapter-header">
      <motion.div
        className="chapter-mark"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7 }}
      >
        <span className="chapter-rule" aria-hidden="true" />
        <span className="chapter-number">Chapter {number}</span>
        <span className="chapter-rule" aria-hidden="true" />
      </motion.div>

      <motion.h2
        className="chapter-title"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.75, delay: 0.15 }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="chapter-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
