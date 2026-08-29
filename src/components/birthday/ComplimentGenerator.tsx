import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { COMPLIMENTS } from "@/data/birthday";
import { GlowButton } from "./Shell";
import { fireConfetti } from "./ConfettiEffect";

export default function ComplimentGenerator() {
  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState(1);

  const next = () => {
    let n = index;
    while (n === index && COMPLIMENTS.length > 1) {
      n = Math.floor(Math.random() * COMPLIMENTS.length);
    }
    setIndex(n);
    setSeen((s) => s + 1);
    fireConfetti({ count: 24, origin: { x: 0.5, y: 0.55 }, spread: 0.6 });
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="relative min-h-[190px] w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${index}-${seen}`}
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="glass flex min-h-[190px] w-full flex-col items-center justify-center gap-4 rounded-3xl p-7 text-center"
          >
            <Sparkles className="h-5 w-5 text-gold" />
            <p className="text-lg leading-relaxed text-cream sm:text-xl">
              {COMPLIMENTS[index]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <GlowButton onClick={next}>GENERATE A RANDOM COMPLIMENT ✨</GlowButton>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        compliments delivered: {seen}
      </p>
    </div>
  );
}
