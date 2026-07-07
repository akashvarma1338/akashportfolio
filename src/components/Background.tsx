import { useEffect, useState } from "react";

const STREAKS = [
  { top: 12, delay: 0,    dur: 9,  color: "var(--neon-red)",  w: 160, opacity: 0.7 },
  { top: 28, delay: 2.1,  dur: 13, color: "var(--neon-blue)", w: 220, opacity: 0.5 },
  { top: 44, delay: 1.0,  dur: 11, color: "var(--neon-red)",  w: 100, opacity: 0.6 },
  { top: 60, delay: 3.5,  dur: 15, color: "var(--neon-blue)", w: 180, opacity: 0.45 },
  { top: 75, delay: 0.7,  dur: 10, color: "var(--neon-red)",  w: 130, opacity: 0.55 },
  { top: 88, delay: 4.2,  dur: 12, color: "var(--neon-blue)", w: 90,  opacity: 0.4 },
];

export function Background() {
  const [particles, setParticles] = useState<{ x: number; y: number; d: number; s: number; hue: number }[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 36 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        d: Math.random() * 10 + 8,
        s: Math.random() * 2.5 + 0.8,
        hue: Math.random() > 0.5 ? 25 : 245,
      })),
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Carbon weave */}
      <div className="absolute inset-0 carbon-bg" />

      {/* Ambient color spots */}
      <div
        className="absolute -top-1/3 -left-1/4 h-[60vw] w-[60vw] rounded-full opacity-40 blur-3xl animate-drift"
        style={{ background: "radial-gradient(circle, oklch(0.65 0.25 25 / 0.3), transparent 60%)", animationDuration: "18s" }}
      />
      <div
        className="absolute -bottom-1/3 -right-1/4 h-[60vw] w-[60vw] rounded-full opacity-40 blur-3xl animate-drift"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.18 245 / 0.3), transparent 60%)", animationDuration: "22s", animationDelay: "4s" }}
      />

      {/* Speed-trail streaks with taper */}
      <div className="absolute inset-0">
        {STREAKS.map((s, i) => (
          <div
            key={i}
            className="absolute animate-streak"
            style={{
              top: `${s.top}%`,
              width: s.w,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${s.color} 40%, ${s.color} 60%, transparent)`,
              opacity: s.opacity,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.dur}s`,
              filter: "blur(0.6px)",
              boxShadow: `0 0 8px ${s.color}`,
            }}
          />
        ))}
      </div>

      {/* Rotating rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[120vmin] w-[120vmin] opacity-[0.06]">
        <div className="absolute inset-0 rounded-full border border-white animate-spin-slow" />
        <div className="absolute inset-10 rounded-full border border-white" />
        <div
          className="absolute inset-32 rounded-full border border-white/50 animate-spin-slow"
          style={{ animationDirection: "reverse", animationDuration: "30s" }}
        />
      </div>

      {/* Floating particles (neon-tinted) */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-drift"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            animationDuration: `${p.d}s`,
            animationDelay: `${i * 0.25}s`,
            background: `oklch(0.8 0.2 ${p.hue} / 0.7)`,
            boxShadow: `0 0 6px oklch(0.7 0.25 ${p.hue} / 0.8)`,
          }}
        />
      ))}

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
}
