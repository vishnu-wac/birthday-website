import { useEffect, useState } from 'react';

// Tiny fixed-position dots on the right side showing which chapter is in view.
// Uses IntersectionObserver so scroll listeners don't run every frame.
export default function ProgressNav({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const observers = [];
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActiveId(item.id);
          });
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="progress-nav" aria-label="Chapter navigation">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`progress-dot ${activeId === item.id ? 'is-active' : ''}`}
          onClick={() => jump(item.id)}
          aria-label={`Jump to ${item.label}`}
          aria-current={activeId === item.id ? 'true' : undefined}
        >
          <span className="progress-dot-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
