import { motion, useMotionValue, useTransform } from "framer-motion";
import type { MemeCard as MemeCardType } from "@/data/birthday";

const TINTS: Record<MemeCardType["tint"], string> = {
  rose: "text-cream",
  cream: "text-ink",
  ink: "text-cream",
};

const BGS: Record<MemeCardType["tint"], string> = {
  rose: "linear-gradient(150deg, oklch(0.55 0.21 22), oklch(0.72 0.16 8))",
  cream: "linear-gradient(150deg, oklch(0.98 0.02 70), oklch(0.9 0.06 8))",
  ink: "linear-gradient(150deg, oklch(0.22 0.04 18), oklch(0.13 0.03 20))",
};

export default function MemeCard({
  meme,
  onSwipe,
}: {
  meme: MemeCardType;
  onSwipe?: (dir: 1 | -1) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const opacity = useTransform(x, [-220, 0, 220], [0.3, 1, 0.3]);

  return (
    <motion.article
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      style={{ x, rotate, opacity, background: BGS[meme.tint] }}
      onDragEnd={(_, info) => {
        if (info.offset.x < -80) onSwipe?.(1);
        else if (info.offset.x > 80) onSwipe?.(-1);
      }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full cursor-grab touch-pan-y overflow-hidden rounded-3xl p-6 active:cursor-grabbing sm:p-9 ${TINTS[meme.tint]}`}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-2xl"
        style={{ background: "white" }}
      />
      <span className="relative inline-flex rounded-full border border-current/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">
        {meme.category}
      </span>
      <h3 className="relative mt-4 font-display text-2xl font-bold leading-tight sm:text-3xl">
        {meme.title}
      </h3>
      <div className="relative mt-5 space-y-2.5">
        {meme.lines.map((l, i) => (
          <p
            key={i}
            className={
              l.style === "big"
                ? "text-xl font-extrabold leading-snug sm:text-2xl"
                : l.style === "muted"
                  ? "text-sm opacity-70"
                  : l.style === "accent"
                    ? "font-mono text-sm tracking-wide opacity-90"
                    : "text-base sm:text-lg"
            }
          >
            {l.text}
          </p>
        ))}
      </div>
      {meme.footer && (
        <p className="script relative mt-6 text-2xl opacity-90">{meme.footer}</p>
      )}
      <p className="relative mt-6 text-[10px] uppercase tracking-[0.25em] opacity-50">
        swipe / tap next
      </p>
    </motion.article>
  );
}
