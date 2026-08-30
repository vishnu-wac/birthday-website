import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts.jsx';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function BirthdayInvestigation({ caseFile, evidence }) {
  return (
    <section className="investigation" id="investigation">
      <FloatingHearts count={6} sparkles={4} emoji="🔎" />

      <div className="section-inner">
        <motion.span
          className="eyebrow"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          Case #❤️
        </motion.span>

        <motion.h2
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          🔎 The Birthday <em>Investigation</em>
        </motion.h2>

        <motion.p
          className="section-subtitle"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          After thorough review of the evidence, a formal case has been opened.
        </motion.p>

        <motion.article
          className="case-file"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className="case-file-title">CASE FILE #01</p>
          <dl>
            <dt>Name</dt><dd>{caseFile.name}</dd>
            <dt>Age</dt><dd>{caseFile.age}</dd>
            <dt>Status</dt><dd>{caseFile.status}</dd>
            <dt>Occupation</dt><dd>{caseFile.occupation}</dd>
            <dt>Danger Level</dt><dd>{caseFile.dangerLevel}</dd>
          </dl>
        </motion.article>

        <div className="evidence-list">
          {evidence.map((e, i) => (
            <motion.div
              key={e.id}
              className="evidence-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="evidence-id">EVIDENCE #{e.id}</span>
              <span className="evidence-emoji" aria-hidden="true">{e.emoji}</span>
              <p className="evidence-text">{e.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="verdict"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <p className="verdict-label">VERDICT</p>
          <p className="verdict-text">Guilty of being the best wife ever. ❤️</p>
        </motion.div>

        <div className="section-cta">
          <a href="#reasons" className="btn btn-ghost">
            Continue Investigation →
          </a>
        </div>
      </div>
    </section>
  );
}
