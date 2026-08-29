import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MUSIC_SRC } from "@/data/birthday";

export default function MusicController({ enabled }: { enabled: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.22;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [enabled]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.volume = 0.22;
      audio.play().then(() => setPlaying(true)).catch(() => setAvailable(false));
    }
  };

  if (!enabled) return null;

  return (
    <>
      {/* Replace /public/audio/birthday.mp3 with your own track. */}
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        preload="none"
        onError={() => setAvailable(false)}
      />
      <motion.button
        type="button"
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={playing ? "Mute music" : "Play music"}
        className="glass fixed bottom-5 right-4 z-[70] grid h-12 w-12 place-items-center rounded-full text-lg"
        title={available ? "Background music" : "Add /audio/birthday.mp3 to enable music"}
      >
        <span className={playing ? "animate-pulse" : "opacity-70"}>
          {playing ? "🎵" : "🔇"}
        </span>
      </motion.button>
    </>
  );
}
