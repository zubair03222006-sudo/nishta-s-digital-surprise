import { motion } from "framer-motion";
import { useMemo } from "react";

export default function BirthdayCake({ lit = true }: { lit?: boolean }) {
  const candles = [0, 1, 2, 3, 4];
  const sparks = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        d: 2 + Math.random() * 3,
        delay: Math.random() * 3,
      })),
    [],
  );

  return (
    <div className="relative mx-auto h-64 w-full max-w-[320px] select-none">
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          className="absolute text-xs"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.1, 0.5], y: [0, -10, 0] }}
          transition={{ duration: s.d, delay: s.delay, repeat: Infinity }}
        >
          ✨
        </motion.span>
      ))}

      <div className="absolute inset-x-0 bottom-4 flex flex-col items-center">
        {/* candles */}
        <div className="mb-1 flex items-end gap-3">
          {candles.map((c) => (
            <div key={c} className="flex flex-col items-center">
              <motion.div
                className="mb-1 h-4 w-2.5 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 50% 65%, #fff8d6, #ffb020 55%, #ff5722 90%)",
                  filter: "blur(0.3px)",
                  boxShadow: "0 0 16px 4px rgba(255,170,60,0.6)",
                }}
                animate={
                  lit
                    ? { opacity: 1, scaleY: [1, 1.2, 0.92, 1], scaleX: [1, 0.9, 1.08, 1] }
                    : { opacity: 0, scaleY: 0.2 }
                }
                transition={
                  lit
                    ? { duration: 0.8 + c * 0.07, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.4 }
                }
              />
              <div className="h-10 w-2 rounded-sm bg-gradient-to-b from-blush to-rose" />
            </div>
          ))}
        </div>

        {/* top tier */}
        <div
          className="relative h-14 w-44 rounded-t-xl rounded-b-md"
          style={{ background: "var(--gradient-cream)", boxShadow: "var(--shadow-soft)" }}
        >
          <div className="absolute inset-x-0 top-0 h-4 rounded-t-xl bg-[oklch(0.78_0.15_15)]" />
          <div className="absolute inset-x-2 top-3 flex justify-between">
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                className="block h-3 w-2 rounded-b-full bg-[oklch(0.78_0.15_15)]"
                style={{ height: 8 + ((i * 5) % 12) }}
              />
            ))}
          </div>
        </div>
        {/* bottom tier */}
        <div
          className="relative h-16 w-64 rounded-b-2xl rounded-t-md"
          style={{ background: "var(--gradient-cream)", boxShadow: "var(--shadow-soft)" }}
        >
          <div className="absolute inset-x-0 top-0 h-4 bg-[oklch(0.72_0.16_12)]" />
          <div className="absolute inset-x-3 top-3 flex justify-between">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="block w-2 rounded-b-full bg-[oklch(0.72_0.16_12)]"
                style={{ height: 8 + ((i * 7) % 14) }}
              />
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-4 text-sm">
            <span>🍓</span>
            <span>🍒</span>
            <span>🍓</span>
          </div>
        </div>
        <div className="h-2 w-72 rounded-full bg-black/40 blur-[6px]" />
      </div>
    </div>
  );
}
