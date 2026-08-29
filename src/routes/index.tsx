import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

import ConfettiEffect, { fireConfetti } from "@/components/birthday/ConfettiEffect";
import FloatingHearts from "@/components/birthday/FloatingHearts";
import TypingText from "@/components/birthday/TypingText";
import BirthdayCake from "@/components/birthday/BirthdayCake";
import MemeCard from "@/components/birthday/MemeCard";
import MemoryCard from "@/components/birthday/MemoryCard";
import ComplimentGenerator from "@/components/birthday/ComplimentGenerator";
import GiftBox from "@/components/birthday/GiftBox";
import MusicController from "@/components/birthday/MusicController";
import {
  GlowButton,
  ProgressFooter,
  Reveal,
  ScriptHeading,
  SectionTransition,
} from "@/components/birthday/Shell";
import { LETTER, MEMES, MEMORIES, QUIZ, type Memory } from "@/data/birthday";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday, Nishta — A Very Questionable Surprise" },
      {
        name: "description",
        content:
          "An unnecessarily complicated interactive birthday surprise for Nishta: memes, cake, memories, a quiz and one very glowing gift box.",
      },
      { property: "og:title", content: "Happy Birthday, Nishta ❤️" },
      {
        property: "og:description",
        content:
          "Enter at your own risk: memes, cake, a memory wall, a quiz and a gift box made with questionable amounts of effort.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BirthdayExperience,
});

const TOTAL = 9;

function BirthdayExperience() {
  const [screen, setScreen] = useState(0); // 0 = entry
  const [musicEnabled, setMusicEnabled] = useState(false);

  const go = useCallback((n: number) => {
    setScreen(n);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <FloatingHearts count={14} />
      <ConfettiEffect />
      <MusicController enabled={musicEnabled} />

      <AnimatePresence mode="wait">
        {screen === 0 && (
          <Entry
            key="entry"
            onEnter={() => {
              setMusicEnabled(true);
              fireConfetti({ count: 60, origin: { x: 0.5, y: 0.6 } });
              go(1);
            }}
          />
        )}
        {screen === 1 && <Reveal1 key="s1" go={go} />}
        {screen === 2 && <MemeIntro key="s2" go={go} />}
        {screen === 3 && <MemeDeck key="s3" go={go} />}
        {screen === 4 && <LetterScreen key="s4" go={go} />}
        {screen === 5 && <MemoryWall key="s5" go={go} />}
        {screen === 6 && <QuizGame key="s6" go={go} />}
        {screen === 7 && <ComplimentScreen key="s7" go={go} />}
        {screen === 8 && <FinalGift key="s8" go={go} />}
      </AnimatePresence>

      {screen > 0 && (
        <footer className="relative z-10 px-5 pb-24 pt-6 text-center">
          <p className="script text-xl text-blush/80">
            Made with questionable amounts of effort for Nishta ❤️
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            © Birthday Department 2026
          </p>
        </footer>
      )}
    </main>
  );
}

/* ---------------- SCREEN 0: ENTRY ---------------- */
function Entry({ onEnter }: { onEnter: () => void }) {
  const [stage, setStage] = useState(0);

  return (
    <motion.section
      key="entry"
      exit={{ opacity: 0, scale: 1.25, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-display text-5xl font-black tracking-tight text-cream sm:text-7xl"
      >
        WAIT... 👀
      </motion.h1>

      <div className="mt-8 flex min-h-[170px] max-w-md flex-col gap-4">
        <TypingText
          text="Someone's birthday is today."
          className="text-lg text-blush sm:text-2xl"
          onDone={() => setStage(1)}
        />
        {stage >= 1 && (
          <TypingText
            text="and unfortunately for you..."
            startDelay={700}
            className="text-lg text-muted-foreground sm:text-xl"
            onDone={() => setStage(2)}
          />
        )}
        {stage >= 2 && (
          <TypingText
            text="you have been selected for a very questionable birthday surprise. 💀"
            startDelay={800}
            speed={35}
            className="text-lg font-semibold text-cream sm:text-xl"
            onDone={() => setStage(3)}
          />
        )}
      </div>

      <AnimatePresence>
        {stage >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            <GlowButton onClick={onEnter}>ENTER AT YOUR OWN RISK →</GlowButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

/* ---------------- SCREEN 1: BIRTHDAY REVEAL ---------------- */
function Reveal1({ go }: { go: (n: number) => void }) {
  const [wished, setWished] = useState(false);

  const makeWish = () => {
    setWished(true);
    setTimeout(() => {
      fireConfetti({ count: 120, origin: { x: 0.5, y: 0.5 }, spread: 1.2 });
    }, 700);
  };

  return (
    <SectionTransition>
      <AnimatePresence>
        {wished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0.35] }}
            transition={{ duration: 1.4 }}
            className="pointer-events-none fixed inset-0 z-0 bg-black"
          />
        )}
      </AnimatePresence>

      <ScriptHeading className="!text-5xl sm:!text-7xl">Happy Birthday, Nishta ❤️</ScriptHeading>
      <Reveal delay={0.1}>
        <p className="mt-5 max-w-md text-center text-base text-blush sm:text-lg">
          Congratulations, you have successfully survived another year of being you.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Honestly... that's impressive. 😭
        </p>
      </Reveal>

      <div className="relative z-10 mt-8 w-full">
        <BirthdayCake lit={!wished} />
      </div>

      {wished && <WishParticles />}

      {!wished ? (
        <div className="relative z-10 mt-8">
          <GlowButton onClick={makeWish}>Make a wish ✨</GlowButton>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="relative z-10 mt-8 flex flex-col items-center gap-2"
        >
          <p className="script text-3xl text-gradient-rose">Wish locked in. 🔒✨</p>
          <p className="text-sm text-muted-foreground">Now let's get to the actual gift...</p>
        </motion.div>
      )}

      <div className="relative z-10 w-full">
        <ProgressFooter
          step={2}
          total={TOTAL}
          onBack={() => go(0)}
          onNext={wished ? () => go(2) : undefined}
          nextLabel={wished ? "SHOW ME THE CHAOS" : undefined}
        />
      </div>
    </SectionTransition>
  );
}

function WishParticles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 30 + Math.random() * 60,
        d: 1.6 + Math.random() * 2.4,
        delay: Math.random() * 1.2,
        s: 2 + Math.random() * 4,
      })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[5]">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.s,
            height: d.s,
            boxShadow: "0 0 10px 2px rgba(255,200,120,0.8)",
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: -120 }}
          transition={{ duration: d.d, delay: d.delay, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

/* ---------------- SCREEN 2: MEME INTRO ---------------- */
function MemeIntro({ go }: { go: (n: number) => void }) {
  return (
    <SectionTransition className="min-h-screen justify-center">
      <Reveal>
        <h2 className="text-center font-display text-3xl font-black leading-tight text-cream sm:text-5xl">
          THE OFFICIAL NISHTA BIRTHDAY MEME ARCHIVE™
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-4 max-w-md text-center text-blush">
          A scientifically inaccurate collection of memes dedicated to you.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="glass mt-8 w-full max-w-md rounded-3xl p-6 text-left">
          <p className="font-semibold text-cream">⚠️ Side effects may include:</p>
          <ul className="mt-3 space-y-1.5 text-sm text-blush/90">
            <li>• laughing</li>
            <li>• judging me</li>
            <li>• saying "bro what 😭"</li>
            <li>• questioning our friendship</li>
          </ul>
        </div>
      </Reveal>
      <ProgressFooter
        step={3}
        total={TOTAL}
        onBack={() => go(1)}
        onNext={() => go(3)}
        nextLabel="I'M READY 💀"
      />
    </SectionTransition>
  );
}

/* ---------------- SCREEN 3: MEME CARDS ---------------- */
function MemeDeck({ go }: { go: (n: number) => void }) {
  const [i, setI] = useState(0);
  const last = i === MEMES.length - 1;

  const move = (dir: 1 | -1) => {
    setI((prev) => Math.min(MEMES.length - 1, Math.max(0, prev + dir)));
  };

  return (
    <SectionTransition className="min-h-screen justify-center">
      <div className="mb-4 flex w-full items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          meme {i + 1} / {MEMES.length}
        </span>
        <div className="flex flex-1 gap-1">
          {MEMES.map((m, idx) => (
            <span
              key={m.id}
              className={`h-1 flex-1 rounded-full transition-colors ${
                idx <= i ? "bg-rose" : "bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative w-full">
        <AnimatePresence mode="wait">
          <MemeCard key={MEMES[i].id} meme={MEMES[i]} onSwipe={move} />
        </AnimatePresence>
      </div>

      <div className="mt-6 flex w-full items-center justify-center gap-3">
        <GlowButton variant="ghost" onClick={() => move(-1)} disabled={i === 0}>
          ← Prev
        </GlowButton>
        {!last ? (
          <GlowButton onClick={() => move(1)}>Next →</GlowButton>
        ) : (
          <GlowButton onClick={() => go(4)}>One more thing →</GlowButton>
        )}
      </div>

      <ProgressFooter step={4} total={TOTAL} onBack={() => go(2)} />
    </SectionTransition>
  );
}

/* ---------------- SCREEN 4: THE MESSAGE ---------------- */
function LetterScreen({ go }: { go: (n: number) => void }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= LETTER.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 900 : 2100);
    return () => clearTimeout(t);
  }, [shown]);

  const done = shown >= LETTER.length;

  return (
    <SectionTransition className="min-h-screen justify-center">
      <ScriptHeading>Okay... enough bullying 😭</ScriptHeading>

      <div className="mt-8 flex w-full max-w-xl flex-col gap-5">
        {LETTER.slice(0, shown).map((line, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className={
              idx >= LETTER.length - 2
                ? "script text-center text-3xl text-gradient-rose sm:text-4xl"
                : "text-center text-base leading-relaxed text-blush/95 sm:text-lg"
            }
          >
            {line}
          </motion.p>
        ))}
      </div>

      {!done && (
        <button
          onClick={() => setShown(LETTER.length)}
          className="mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground underline-offset-4 hover:underline"
        >
          skip the pauses
        </button>
      )}

      <ProgressFooter
        step={5}
        total={TOTAL}
        onBack={() => go(3)}
        onNext={done ? () => go(5) : undefined}
        nextLabel={done ? "Open the archives" : undefined}
      />
    </SectionTransition>
  );
}

/* ---------------- SCREEN 5: MEMORY WALL ---------------- */
function MemoryWall({ go }: { go: (n: number) => void }) {
  const [active, setActive] = useState<Memory | null>(null);
  const rotations = useMemo(() => MEMORIES.map((_, i) => ((i % 5) - 2) * 2.2), []);

  return (
    <SectionTransition className="min-h-screen">
      <Reveal>
        <h2 className="text-center font-display text-3xl font-black text-cream sm:text-5xl">
          THE NISHTA ARCHIVES 📸
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Tap a polaroid to open it.
        </p>
      </Reveal>

      <div className="mt-8 grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
        {MEMORIES.map((m, i) => (
          <MemoryCard key={m.id} memory={m} rotate={rotations[i]} onOpen={() => setActive(m)} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-5 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-cream relative w-full max-w-sm rounded-lg p-3 pb-6"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute -top-4 -right-3 grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <img
                src={active.src}
                alt={active.caption}
                className="w-full rounded-sm object-cover"
              />
              <p className="script mt-3 text-center text-2xl text-[oklch(0.5_0.2_22)]">
                {active.caption}
              </p>
              <p className="text-center font-mono text-[10px] uppercase tracking-widest text-black/45">
                {active.label}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProgressFooter
        step={6}
        total={TOTAL}
        onBack={() => go(4)}
        onNext={() => go(6)}
        nextLabel="Let's go"
      />
    </SectionTransition>
  );
}

/* ---------------- SCREEN 6: QUIZ ---------------- */
function QuizGame({ go }: { go: (n: number) => void }) {
  const [q, setQ] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = QUIZ[q];

  const choose = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === current.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (q === QUIZ.length - 1) {
      setFinished(true);
      fireConfetti({ count: 140, origin: { x: 0.5, y: 0.4 }, spread: 1.2 });
    } else {
      setQ((v) => v + 1);
      setPicked(null);
    }
  };

  return (
    <SectionTransition className="min-h-screen justify-center">
      <Reveal>
        <h2 className="text-center font-display text-2xl font-black text-cream sm:text-4xl">
          HOW WELL DO YOU KNOW NISHTA? 👀
        </h2>
      </Reveal>

      {!finished ? (
        <div className="glass mt-8 w-full max-w-md rounded-3xl p-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            question {q + 1} / {QUIZ.length}
          </span>
          <p className="mt-3 text-lg font-semibold text-cream">{current.question}</p>
          <div className="mt-5 flex flex-col gap-2.5">
            {current.options.map((opt, idx) => {
              const isCorrect = idx === current.correct;
              const state =
                picked === null
                  ? "idle"
                  : isCorrect
                    ? "correct"
                    : idx === picked
                      ? "wrong"
                      : "dim";
              return (
                <motion.button
                  key={opt}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => choose(idx)}
                  className={`min-h-[52px] rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                    state === "correct"
                      ? "border-emerald-400/60 bg-emerald-400/15 text-cream"
                      : state === "wrong"
                        ? "border-destructive/60 bg-destructive/20 text-cream"
                        : state === "dim"
                          ? "border-white/10 text-muted-foreground"
                          : "border-white/15 text-blush hover:bg-white/10"
                  }`}
                >
                  <span className="mr-2 font-mono opacity-60">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {opt}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {picked !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex flex-col gap-4"
              >
                <p className="script text-2xl text-gradient-rose">
                  {picked === current.correct ? current.reactionRight : current.reactionWrong}
                </p>
                <GlowButton onClick={next}>
                  {q === QUIZ.length - 1 ? "See result →" : "Next question →"}
                </GlowButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass mt-8 w-full max-w-md rounded-3xl p-8 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Result
          </p>
          <p className="script mt-3 text-4xl text-gradient-rose">
            {score === QUIZ.length ? "100% Certified Nishta Expert 🏆" : "Certified Nishta Expert 🏆"}
          </p>
          <p className="mt-3 text-sm text-blush">
            You scored {score} / {QUIZ.length}. The certificate is emotional, not legal. 🗿
          </p>
        </motion.div>
      )}

      <ProgressFooter
        step={7}
        total={TOTAL}
        onBack={() => go(5)}
        onNext={finished ? () => go(7) : undefined}
        nextLabel={finished ? "One more thing" : undefined}
      />
    </SectionTransition>
  );
}

/* ---------------- SCREEN 7: COMPLIMENTS ---------------- */
function ComplimentScreen({ go }: { go: (n: number) => void }) {
  return (
    <SectionTransition className="min-h-screen justify-center">
      <Reveal>
        <h2 className="text-center font-display text-3xl font-black text-cream sm:text-5xl">
          ONE LAST THING...
        </h2>
      </Reveal>
      <div className="mt-8 w-full">
        <ComplimentGenerator />
      </div>
      <ProgressFooter
        step={8}
        total={TOTAL}
        onBack={() => go(6)}
        onNext={() => go(8)}
        nextLabel="Finish"
      />
    </SectionTransition>
  );
}

/* ---------------- SCREEN 8: FINAL GIFT ---------------- */
function FinalGift({ go }: { go: (n: number) => void }) {
  const [opened, setOpened] = useState(false);

  const open = () => {
    setOpened(true);
    fireConfetti({ count: 160, origin: { x: 0.5, y: 0.55 }, spread: 1.4 });
    setTimeout(() => fireConfetti({ count: 90, origin: { x: 0.2, y: 0.4 } }), 500);
    setTimeout(() => fireConfetti({ count: 90, origin: { x: 0.8, y: 0.4 } }), 900);
  };

  return (
    <SectionTransition className="min-h-screen justify-center">
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        animate={{
          opacity: opened ? 1 : 0,
        }}
        transition={{ duration: 1.4 }}
        style={{
          background:
            "radial-gradient(90% 70% at 50% 30%, oklch(0.6 0.2 15 / 0.55), transparent 70%), linear-gradient(160deg, oklch(0.35 0.15 12), oklch(0.2 0.08 20))",
        }}
      />
      {opened && <Fireworks />}

      <div className="relative z-10 flex flex-col items-center">
        {!opened ? (
          <>
            <p className="text-center text-lg text-blush">There's still one thing left...</p>
            <div className="mt-6">
              <GiftBox open={false} />
            </div>
            <div className="mt-6">
              <GlowButton onClick={open}>OPEN YOUR GIFT 🎁</GlowButton>
            </div>
          </>
        ) : (
          <>
            <GiftBox open />
            <motion.h2
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 16 }}
              className="mt-6 text-center font-display text-3xl font-black text-cream sm:text-5xl"
            >
              🎉 HAPPY BIRTHDAY NISHTA 🎉
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="script mt-4 text-center text-3xl text-gradient-rose"
            >
              May this year be ridiculously good to you.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-5 max-w-sm text-center text-sm text-blush/85"
            >
              — From someone who clearly spent way too much time making this website 😭❤️
            </motion.p>
          </>
        )}
      </div>

      <div className="relative z-10 w-full">
        <ProgressFooter step={9} total={TOTAL} onBack={() => go(7)} />
      </div>
    </SectionTransition>
  );
}

function Fireworks() {
  const bursts = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => ({
        id: i,
        x: 15 + Math.random() * 70,
        y: 12 + Math.random() * 35,
        delay: i * 0.8,
      })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[5]">
      {bursts.map((b) => (
        <div key={b.id} className="absolute" style={{ left: `${b.x}%`, top: `${b.y}%` }}>
          {Array.from({ length: 12 }).map((_, k) => (
            <motion.span
              key={k}
              className="absolute h-1 w-1 rounded-full bg-gold"
              style={{ boxShadow: "0 0 8px 2px rgba(255,180,120,0.8)" }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: Math.cos((k / 12) * Math.PI * 2) * 70,
                y: Math.sin((k / 12) * Math.PI * 2) * 70,
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 1.4, delay: b.delay, repeat: Infinity, repeatDelay: 3 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
