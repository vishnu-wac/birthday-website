import { useMemo } from 'react';

// Ambient birthday backdrop: balloons + confetti dots + soft stars.
// Rendered once per section, cheap on the main thread.
const BALLOON_COLORS = ['#f4b8a3', '#f7d774', '#c6b3e0', '#f9c1cf', '#b4d8c7'];
const CONFETTI_COLORS = ['#e5a765', '#c99cd6', '#e78d9f', '#f2c65a', '#8fc7ac'];

export default function FloatingBirthday({
  balloons = 4,
  confetti = 12,
  stars = 6,
}) {
  const balloonList = useMemo(
    () =>
      Array.from({ length: balloons }, (_, i) => ({
        id: i,
        left: 6 + Math.random() * 88,
        size: 22 + Math.random() * 18,
        duration: 16 + Math.random() * 12,
        delay: Math.random() * 14,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        sway: (Math.random() - 0.5) * 40,
      })),
    [balloons]
  );

  const confettiList = useMemo(
    () =>
      Array.from({ length: confetti }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 4 + Math.random() * 5,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        duration: 3.5 + Math.random() * 3,
        delay: Math.random() * 5,
        rot: Math.floor(Math.random() * 360),
      })),
    [confetti]
  );

  const starList = useMemo(
    () =>
      Array.from({ length: stars }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 2.5 + Math.random() * 2.5,
        delay: Math.random() * 4,
      })),
    [stars]
  );

  return (
    <div className="birthday-bg" aria-hidden="true">
      {balloonList.map((b) => (
        <span
          key={`b-${b.id}`}
          className="bg-balloon"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size * 1.2}px`,
            background: b.color,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            '--sway': `${b.sway}px`,
          }}
        >
          <span className="bg-balloon-string" />
        </span>
      ))}

      {confettiList.map((c) => (
        <span
          key={`c-${c.id}`}
          className="bg-confetti"
          style={{
            left: `${c.left}%`,
            top: `${c.top}%`,
            width: `${c.size}px`,
            height: `${c.size * 0.6}px`,
            background: c.color,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
            transform: `rotate(${c.rot}deg)`,
          }}
        />
      ))}

      {starList.map((s) => (
        <span
          key={`s-${s.id}`}
          className="bg-star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
