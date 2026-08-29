import { motion } from "framer-motion";

export default function GiftBox({ open }: { open: boolean }) {
  return (
    <div className="relative mx-auto h-52 w-52 select-none">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.2 20 / 0.55), transparent 65%)" }}
        animate={{ scale: open ? [1, 1.6, 1.2] : [1, 1.12, 1], opacity: open ? 0.9 : 0.6 }}
        transition={{ duration: open ? 1 : 2.6, repeat: open ? 0 : Infinity }}
      />

      {/* lid */}
      <motion.div
        className="absolute left-1/2 top-8 h-10 w-44 -translate-x-1/2 rounded-md"
        style={{ background: "var(--gradient-rose)", boxShadow: "var(--shadow-glow)" }}
        animate={open ? { y: -90, rotate: -18, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute left-1/2 top-[-18px] -translate-x-1/2 text-3xl">🎀</div>
        <div className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 bg-[oklch(0.95_0.05_80)]/80" />
      </motion.div>

      {/* body */}
      <motion.div
        className="absolute bottom-6 left-1/2 h-28 w-40 -translate-x-1/2 rounded-xl"
        style={{
          background: "linear-gradient(160deg, oklch(0.5 0.2 22), oklch(0.35 0.14 20))",
          boxShadow: "var(--shadow-soft)",
        }}
        animate={open ? { scaleY: [1, 0.92, 1] } : { y: [0, -4, 0] }}
        transition={{ duration: open ? 0.6 : 3, repeat: open ? 0 : Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 bg-[oklch(0.95_0.05_80)]/80" />
      </motion.div>

      {open && (
        <>
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 text-xl"
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
              animate={{
                x: (Math.random() - 0.5) * 240,
                y: -60 - Math.random() * 180,
                opacity: [0, 1, 0],
                scale: 1,
              }}
              transition={{ duration: 1.6 + Math.random(), delay: i * 0.06 }}
            >
              {i % 2 ? "❤️" : "✨"}
            </motion.span>
          ))}
        </>
      )}
    </div>
  );
}
