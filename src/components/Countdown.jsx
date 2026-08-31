import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FloatingBirthday from './FloatingBirthday.jsx';

// Ticks every second; returns { d, h, m, s, done }.
function useCountdown(targetDate) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, targetDate.getTime() - now);
  const s = Math.floor(diff / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
    done: diff === 0,
  };
}

function Unit({ value, label }) {
  const shown = String(value).padStart(2, '0');
  return (
    <div className="countdown-unit">
      <span className="countdown-value">{shown}</span>
      <span className="countdown-label">{label}</span>
    </div>
  );
}

export default function Countdown({ target, wifeName, birthdayLabel, onDone }) {
  const { d, h, m, s, done } = useCountdown(target);

  // The moment we hit zero, let the parent flip to the birthday site.
  useEffect(() => {
    if (done && onDone) onDone();
  }, [done, onDone]);

  return (
    <section className="countdown">
      <FloatingBirthday balloons={5} confetti={14} stars={8} />

      <div className="countdown-inner">
        <motion.p
          className="countdown-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          🎂 Save the date
        </motion.p>

        <motion.h1
          className="countdown-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Something is coming…
        </motion.h1>

        <motion.p
          className="countdown-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          for <em>{wifeName}</em>, on <em>{birthdayLabel}</em>.
        </motion.p>

        <motion.div
          className="countdown-clock"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          aria-live="polite"
          aria-label={`Time until birthday: ${d} days, ${h} hours, ${m} minutes, ${s} seconds`}
        >
          <Unit value={d} label="days" />
          <span className="countdown-sep" aria-hidden="true">:</span>
          <Unit value={h} label="hours" />
          <span className="countdown-sep" aria-hidden="true">:</span>
          <Unit value={m} label="minutes" />
          <span className="countdown-sep" aria-hidden="true">:</span>
          <Unit value={s} label="seconds" />
        </motion.div>

        <motion.p
          className="countdown-foot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1 }}
        >
          Come back on the day. Something has been prepared for you. ❤
        </motion.p>
      </div>
    </section>
  );
}
