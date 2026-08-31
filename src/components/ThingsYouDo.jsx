import { motion } from 'framer-motion';
import ChapterHeader from './ChapterHeader.jsx';

// Numbered list of playful "things you do" — feels like a checklist.
export default function ThingsYouDo({ chapter, items }) {
  return (
    <section className="things-you-do" id="things-you-do">
      <div className="section-inner">
        <ChapterHeader
          number={chapter.number}
          title={chapter.title}
          subtitle="…that I have somehow learned to live with. 😂"
        />

        <ol className="things-list">
          {items.map((text, i) => (
            <motion.li
              key={i}
              className="things-item"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <span className="things-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="things-text">{text}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
