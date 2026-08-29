import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function SectionTransition({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-10 ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GlowButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  disabled?: boolean;
}) {
  const base =
    "relative inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 text-base font-semibold tracking-wide transition-colors select-none disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "text-primary-foreground animate-glow"
      : "glass text-foreground/90 hover:bg-white/15";
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.03 }}
      className={`${base} ${styles} ${className}`}
      style={
        variant === "primary"
          ? { background: "var(--gradient-rose)", boxShadow: "var(--shadow-glow)" }
          : undefined
      }
    >
      {children}
    </motion.button>
  );
}

export function ProgressFooter({
  step,
  total,
  onBack,
  onNext,
  nextLabel,
}: {
  step: number;
  total: number;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
}) {
  return (
    <div className="mt-12 flex w-full flex-col items-center gap-5">
      {nextLabel && onNext && (
        <GlowButton onClick={onNext}>
          {nextLabel} <ArrowRight className="h-4 w-4" />
        </GlowButton>
      )}
      <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
        <div className="flex justify-start">
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex min-h-[40px] items-center gap-1 rounded-full px-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>
          )}
        </div>
        <span className="font-mono text-[11px] tracking-[0.25em] text-muted-foreground">
          {String(step).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="flex justify-end">
          <div className="flex gap-1">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={`h-1 w-1.5 rounded-full transition-colors ${
                  i < step ? "bg-rose" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScriptHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`script text-gradient-rose text-center text-4xl sm:text-6xl ${className}`}
    >
      {children}
    </h2>
  );
}
