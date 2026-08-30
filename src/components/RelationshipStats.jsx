import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import FloatingHearts from './FloatingHearts.jsx';

// Return the numeric percentage width for the progress bar, given the raw value.
function barWidth(stat) {
  if (typeof stat.value === 'number') {
    if (stat.unit === '%') return Math.max(1, Math.min(100, stat.value));
    // Non-percent numbers: cap width for display
    return Math.min(100, (stat.value / 1000) * 100 || 5);
  }
  // Infinity, CLASSIFIED etc. → visually full
  return 100;
}

function AnimatedNumber({ value, active }) {
  const [display, setDisplay] = useState(
    typeof value === 'number' ? 0 : value
  );

  useEffect(() => {
    if (!active) return;
    if (typeof value !== 'number') {
      setDisplay(value);
      return;
    }
    let raf;
    const start = performance.now();
    const duration = 1400;
    const from = 0;
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = from + (value - from) * eased;
      setDisplay(cur < 1 && cur > 0 ? cur.toFixed(4) : Math.round(cur));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, active]);

  return <>{display}</>;
}

function StatRow({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const width = barWidth(stat);

  return (
    <motion.div
      ref={ref}
      className="stat-row"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className="stat-label">
        <span>{stat.label}</span>
        <span className="stat-value">
          <AnimatedNumber value={stat.value} active={inView} />
          {stat.unit}
        </span>
      </div>
      <div className="stat-bar">
        <motion.div
          className="stat-fill"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: width / 100 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 + index * 0.05 }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </motion.div>
  );
}

export default function RelationshipStats({ stats }) {
  return (
    <section className="stats" id="stats">
      <FloatingHearts count={5} sparkles={5} />

      <div className="section-inner">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Independently verified*
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          😂 Relationship <em>Analytics™</em>
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Data collected from a totally unbiased source (me).
        </motion.p>

        <div className="stats-grid">
          {stats.map((stat, i) => (
            <StatRow key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
