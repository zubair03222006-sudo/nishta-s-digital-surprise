import { motion } from "framer-motion";
import type { Memory } from "@/data/birthday";

export default function MemoryCard({
  memory,
  rotate,
  onOpen,
}: {
  memory: Memory;
  rotate: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 26, rotate: rotate * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 5 }}
      whileTap={{ scale: 0.96, rotate: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="glass-cream block w-full rounded-md p-2.5 pb-8 text-left"
      style={{ boxShadow: "0 18px 40px -18px rgba(0,0,0,0.8)" }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-black/10">
        <img
          src={memory.src}
          alt={memory.caption}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="mt-2 flex items-baseline justify-between gap-2">
        <span className="script text-lg text-[oklch(0.5_0.2_22)]">{memory.caption}</span>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-widest text-black/45">
        {memory.label}
      </span>
    </motion.button>
  );
}
