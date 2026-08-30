import { useMemo } from 'react';

// Renders a soft layer of floating hearts + sparkles behind a section.
// Rendered once with random positions — cheap on the main thread.
export default function FloatingHearts({ count = 10, sparkles = 8, emoji = '❤' }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 0.8 + Math.random() * 1.2,
        duration: 12 + Math.random() * 10,
        delay: Math.random() * 12,
        opacity: 0.25 + Math.random() * 0.35,
      })),
    [count]
  );

  const sparks = useMemo(
    () =>
      Array.from({ length: sparkles }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 4,
      })),
    [sparkles]
  );

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}rem`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            color: `rgba(233, 141, 160, ${h.opacity})`,
          }}
        >
          {emoji}
        </span>
      ))}
      {sparks.map((s) => (
        <span
          key={`s-${s.id}`}
          className="sparkle"
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
