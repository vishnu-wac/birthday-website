import { motion } from 'framer-motion';
import ChapterHeader from './ChapterHeader.jsx';

// Playful "government form" style card that lists cute report fields.
export default function BirthdayReport({ chapter, report, stamp }) {
  return (
    <section className="report" id="report">
      <div className="section-inner">
        <ChapterHeader
          number={chapter.number}
          title={chapter.title}
          subtitle="Filed by one very biased husband."
        />

        <motion.article
          className="report-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
        >
          <header className="report-head">
            <span className="report-tag">FILE #01</span>
            <span className="report-classified">CONFIDENTIAL</span>
          </header>

          <dl className="report-list">
            {report.map((row, i) => (
              <motion.div
                key={row.field}
                className="report-row"
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <dt>{row.field}</dt>
                <dd>{row.value}</dd>
              </motion.div>
            ))}
          </dl>

          <footer className="report-foot">
            <span className="report-stamp">{stamp}</span>
          </footer>
        </motion.article>
      </div>
    </section>
  );
}
