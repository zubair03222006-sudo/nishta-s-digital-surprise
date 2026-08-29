import { useMemo } from "react";

type Props = { count?: number; className?: string };

const GLYPHS = ["❤️", "💗", "✨", "⭐", "🤍", "🎀"];

export default function FloatingHearts({ count = 12, className = "" }: Props) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 12,
        size: 12 + Math.random() * 20,
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        opacity: 0.25 + Math.random() * 0.4,
      })),
    [count],
  );

  return (
    <div aria-hidden className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}>
      {items.map((it) => (
        <span
          key={it.id}
          className="absolute bottom-[-10vh] will-change-transform"
          style={{
            left: `${it.left}%`,
            fontSize: it.size,
            opacity: it.opacity,
            animation: `float-up ${it.duration}s linear ${it.delay}s infinite`,
          }}
        >
          {it.glyph}
        </span>
      ))}
    </div>
  );
}
