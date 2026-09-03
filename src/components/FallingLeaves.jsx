import { useMemo } from 'react';

// Real 5-lobed maple leaves drifting down. Slow, warm, mixed sizes and rotations
// so the layer feels organic rather than uniform.
const LEAF_COLORS = [
  '#c9793a', // burnt orange
  '#b8933f', // gold
  '#8f4a1e', // russet
  '#d4a860', // amber
  '#a24837', // rust
  '#c26a4c', // terracotta
];

// Two maple silhouettes — one broad, one slightly narrower — for variety.
const MAPLE_PATHS = [
  // Broad, classic Canadian-style maple silhouette.
  'M32 60 L30 44 L18 48 L22 40 L8 36 L18 30 L10 22 L20 22 L22 12 L28 20 L32 6 L36 20 L42 12 L44 22 L54 22 L46 30 L56 36 L42 40 L46 48 L34 44 Z',
  // Slightly narrower / taller sibling.
  'M32 60 L30 46 L20 50 L23 40 L12 34 L20 30 L14 22 L22 22 L23 12 L28 20 L32 6 L36 20 L41 12 L42 22 L50 22 L44 30 L52 34 L41 40 L44 50 L34 46 Z',
];

function MapleLeaf({ colour, path, size }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d={path} fill={colour} />
      {/* central vein */}
      <path
        d="M32 60 L32 20"
        stroke="rgba(0,0,0,0.22)"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      {/* small side veins */}
      <path
        d="M32 34 L22 30 M32 34 L42 30 M32 28 L26 22 M32 28 L38 22"
        stroke="rgba(0,0,0,0.14)"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function FallingLeaves({ count = 12 }) {
  const leaves = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 22 + Math.random() * 20,
        colour: LEAF_COLORS[i % LEAF_COLORS.length],
        path: MAPLE_PATHS[i % MAPLE_PATHS.length],
        duration: 12 + Math.random() * 10,
        delay: Math.random() * 14,
        sway: (Math.random() - 0.5) * 60,
        rotSpeed: 260 + Math.floor(Math.random() * 220),
      })),
    [count]
  );

  return (
    <div className="falling-leaves" aria-hidden="true">
      {leaves.map((l) => (
        <span
          key={l.id}
          className="falling-leaf"
          style={{
            left: `${l.left}%`,
            animationDuration: `${l.duration}s`,
            animationDelay: `${l.delay}s`,
            '--sway': `${l.sway}px`,
            '--rot': `${l.rotSpeed}deg`,
          }}
        >
          <MapleLeaf colour={l.colour} path={l.path} size={l.size} />
        </span>
      ))}
    </div>
  );
}
