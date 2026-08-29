import { useEffect, useState } from "react";

export default function TypingText({
  text,
  speed = 45,
  startDelay = 0,
  className = "",
  onDone,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  onDone?: () => void;
}) {
  const [shown, setShown] = useState("");
  const [started, setStarted] = useState(startDelay === 0);

  useEffect(() => {
    if (startDelay === 0) return;
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, text, speed]);

  return (
    <p className={className}>
      {shown}
      {started && shown.length < text.length && (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-rose align-middle" />
      )}
    </p>
  );
}
