import { useState } from 'react';
import { motion } from 'framer-motion';

// Quiet closing screen — one photograph and three short lines.
export default function FinalPhoto({ photo, fallbackPhoto, caption, tagline }) {
  const [imgFailed, setImgFailed] = useState(false);
  const src = imgFailed ? fallbackPhoto : photo;

  return (
    <section className="final-photo" id="final-photo">
      <div className="section-inner final-photo-inner">
        <motion.div
          className="final-photo-frame"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {src ? (
            <img
              src={src}
              alt="Us"
              onError={() => setImgFailed(true)}
              loading="lazy"
            />
          ) : (
            <span className="final-photo-fallback" aria-hidden="true">❤</span>
          )}
          <span className="final-photo-vignette" aria-hidden="true" />
        </motion.div>

        <motion.p
          className="final-caption"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {caption}
        </motion.p>

        <motion.p
          className="final-birthday"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Happy Birthday, My Love ❤
        </motion.p>

        <motion.p
          className="final-tagline"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
        >
          {tagline}
        </motion.p>
      </div>
    </section>
  );
}
