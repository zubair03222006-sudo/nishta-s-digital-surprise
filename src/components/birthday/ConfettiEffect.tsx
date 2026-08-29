import { useEffect, useRef } from "react";

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  color: string;
  shape: "rect" | "circle" | "heart";
  life: number;
};

type Listener = (opts: { count?: number; origin?: { x: number; y: number }; spread?: number }) => void;

const listeners = new Set<Listener>();

/** Fire confetti from anywhere. origin values are 0..1 of the viewport. */
export function fireConfetti(opts: {
  count?: number;
  origin?: { x: number; y: number };
  spread?: number;
} = {}) {
  listeners.forEach((l) => l(opts));
}

const COLORS = ["#e11d48", "#fb7185", "#fecdd3", "#fff7ed", "#f59e0b", "#ffffff"];

function drawHeart(ctx: CanvasRenderingContext2D, s: number) {
  ctx.beginPath();
  ctx.moveTo(0, s * 0.3);
  ctx.bezierCurveTo(0, -s * 0.1, -s, -s * 0.1, -s, s * 0.35);
  ctx.bezierCurveTo(-s, s * 0.8, 0, s * 1.05, 0, s * 1.4);
  ctx.bezierCurveTo(0, s * 1.05, s, s * 0.8, s, s * 0.35);
  ctx.bezierCurveTo(s, -s * 0.1, 0, -s * 0.1, 0, s * 0.3);
  ctx.fill();
}

export default function ConfettiEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const piecesRef = useRef<Piece[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      const pieces = piecesRef.current;
      for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i];
        p.vy += 0.16;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 1;
        if (p.y > h + 60 || p.life <= 0) {
          pieces.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.min(1, p.life / 40);
        ctx.fillStyle = p.color;
        if (p.shape === "rect") ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        else if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else drawHeart(ctx, p.size / 2);
        ctx.restore();
      }
      if (pieces.length > 0) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        rafRef.current = null;
        ctx.clearRect(0, 0, w, h);
      }
    };

    const listener: Listener = ({ count = 80, origin = { x: 0.5, y: 0.45 }, spread = 1 }) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const max = 320;
      const n = Math.min(count, max - piecesRef.current.length);
      for (let i = 0; i < n; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (2 + Math.random() * 8) * spread;
        piecesRef.current.push({
          x: origin.x * w,
          y: origin.y * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          size: 6 + Math.random() * 9,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: Math.random() < 0.2 ? "heart" : Math.random() < 0.5 ? "circle" : "rect",
          life: 120 + Math.random() * 80,
        });
      }
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(loop);
    };

    listeners.add(listener);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
    />
  );
}
