import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music } from 'lucide-react';

// Floating music player: never autoplays, and if the file is missing
// it silently hides itself so the page keeps working.
export default function MusicPlayer({ src, title }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onError = () => setAvailable(false);
    audio.addEventListener('error', onError);
    return () => audio.removeEventListener('error', onError);
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch {
      setAvailable(false);
    }
  };

  if (!available) return null;

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" />
      <AnimatePresence>
        <motion.button
          className="music-player"
          onClick={toggle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          aria-label={playing ? 'Pause music' : 'Play our song'}
        >
          <span className="music-icon" aria-hidden="true">
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </span>
          <span>
            {playing ? title || 'Playing' : `🎵 Play ${title || 'Our Song'}`}
          </span>
        </motion.button>
      </AnimatePresence>
    </>
  );
}
