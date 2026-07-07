import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { SectionLabel } from "./About";
import reLogo from "@/assets/re-logo.jpg";


// RE brand colours
const RE_GOLD  = "#c8a84b";
const RE_DARK  = "#1a1408";
const STOPS = [
  {
    year: "2020",
    role: "Secondary School",
    company: "Universal High School",
    note: "Scored 100% — laid the foundation for a disciplined engineering mindset.",
  },
  {
    year: "2023",
    role: "Intermediate",
    company: "Srinivasa Gravity",
    note: "98.10% — top of class. Chose Computer Science for B.Tech.",
  },
  {
    year: "2025",
    role: "Event Coordinator",
    company: "IEEE EdSoc KARE",
    note: "Organised technical workshops and seminars. Managed logistics for multiple events.",
  },
  {
    year: "2026",
    role: "Web Developer",
    company: "SCRS KARE Club",
    note: "Building and maintaining club web platforms. Designing responsive interfaces.",
  },
  {
    year: "2027",
    role: "B.Tech CS · 9.21 CGPA",
    company: "Kalasalingam University",
    note: "Expected graduation. Open to Software Developer / Engineer roles.",
  },
];

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: trackRef, 
    offset: ["start 85%", "start 25%"] 
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [3, 97]);
  const carX = useSpring(rawX, { stiffness: 45, damping: 20 });
  const trackPct = useTransform(carX, (v) => `${v}%`);

  const blur = useMotionValue(0);
  const tilt = useMotionValue(0);
  const trailOpacity = useMotionValue(0);
  const trailScaleX = useMotionValue(1);

  const [unlockedCount, setUnlockedCount] = useState(1);

  useEffect(() => {
    let prev = 3;
    return carX.on("change", (v) => {
      const speed = Math.abs(v - prev) * 4;
      blur.set(Math.min(speed * 0.4, 3));
      
      // Dynamic tilt based on direction of movement and speed
      const direction = v - prev > 0 ? 1 : -1;
      tilt.set(Math.min(speed * 0.8, 8) * direction);
      
      trailOpacity.set(Math.min(speed * 0.16, 0.95));
      trailScaleX.set(1 + Math.min(speed * 0.25, 2.0));
      prev = v;

      // Update active checkpoints as car passes
      if (v >= 86) setUnlockedCount(5);
      else if (v >= 64) setUnlockedCount(4);
      else if (v >= 41) setUnlockedCount(3);
      else if (v >= 20) setUnlockedCount(2);
      else setUnlockedCount(1);
    });
  }, [carX, blur, tilt, trailOpacity, trailScaleX]);

  const carLeft = useTransform(carX, (v) => `${v}%`);
  const carFilter = useTransform(blur, (v) => `blur(${v}px)`);
  const glowLeft = useTransform(carX, (v) => `${v}%`);

  return (
    <section id="experience" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="05" title="Experience" subtitle="My Engineering Journey" />

        <div className="relative mt-20">
          {/* Track — RE road theme */}
          <div ref={trackRef} className="relative h-5 w-full overflow-visible rounded-full"
            style={{ background: RE_DARK, boxShadow: `inset 0 2px 8px rgba(0,0,0,0.8), 0 0 0 1px rgba(200,168,75,0.15)` }}>

            {/* Road lane dashes */}
            <div className="absolute inset-0 rounded-full"
              style={{ backgroundImage: `repeating-linear-gradient(90deg, rgba(200,168,75,0.25) 0 10px, transparent 10px 24px)` }} />

            {/* Progress fill — RE gold */}
            <motion.div
              style={{
                width: trackPct,
                background: `linear-gradient(90deg, #8b6914, ${RE_GOLD})`,
                boxShadow: `0 0 14px ${RE_GOLD}80`,
              }}
              className="absolute inset-y-0 left-0 rounded-full"
            />

            {/* Glow at leading edge */}
            <motion.div
              style={{ left: glowLeft, top: "50%", translateX: "-50%", translateY: "-50%",
                background: `radial-gradient(circle, ${RE_GOLD} 0%, transparent 70%)`, filter: "blur(7px)" }}
              className="pointer-events-none absolute h-12 w-12 rounded-full"
            />

            {/* RE Bike sliding on track */}
            <motion.div
              style={{ left: carLeft, filter: carFilter }}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              {/* Dust / exhaust trail */}
              <motion.div
                style={{
                  opacity: trailOpacity,
                  scaleX: trailScaleX,
                  background: `linear-gradient(90deg, transparent, ${RE_GOLD}90)`,
                  boxShadow: `0 0 12px ${RE_GOLD}60`,
                }}
                className="absolute right-full top-1/2 h-[3px] w-28 origin-right -translate-y-1/2 rounded-full"
              />

              {/* Exhaust smoke puffs */}
              {[0, 1, 2].map((i) => (
                <motion.div key={i}
                  className="absolute rounded-full"
                  animate={{ x: [-6, -28 - i * 10], y: [0, (i - 1) * 4], opacity: [0.7, 0], scale: [1, 0.3] }}
                  transition={{ duration: 0.5 + i * 0.1, repeat: Infinity, delay: i * 0.13, ease: "easeOut" }}
                  style={{ width: 4, height: 4, top: "50%", right: "100%", translateY: "-50%",
                    background: RE_GOLD, boxShadow: `0 0 6px ${RE_GOLD}` }}
                />
              ))}

              {/* Royal Enfield logo */}
              <motion.div
                style={{ rotateZ: tilt, width: 68, height: 68, borderRadius: "50%",
                  border: `2px solid ${RE_GOLD}`, boxShadow: `0 0 20px ${RE_GOLD}cc, 0 0 40px ${RE_GOLD}44`,
                  overflow: "hidden" }}
                className="relative flex items-center justify-center">
                <img src={reLogo} alt="Royal Enfield" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </motion.div>
            </motion.div>
          </div>

          {/* Checkpoints */}
          <div className="mt-14 grid gap-6 md:grid-cols-5">
            {STOPS.map((s, i) => {
              const isUnlocked = unlockedCount >= i + 1;
              return (
                <motion.div key={s.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass-panel relative rounded-xl p-5 transition-all duration-500 ${
                    isUnlocked 
                      ? "-translate-y-1" 
                      : "opacity-40 scale-[0.98]"
                  }`}
                  style={{
                    borderWidth: '1px',
                    borderColor: isUnlocked ? `${RE_GOLD}50` : 'rgba(255,255,255,0.06)',
                    boxShadow: isUnlocked ? `0 0 20px ${RE_GOLD}15` : 'none',
                  }}
                >
                  <div className="absolute -top-3 left-5 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white transition-all duration-500"
                    style={{ 
                      background: isUnlocked ? RE_GOLD : "rgba(255,255,255,0.1)",
                      boxShadow: isUnlocked ? `0 0 14px ${RE_GOLD}` : "none",
                      color: isUnlocked ? RE_DARK : "white",
                    }}>
                    CP/{i + 1}
                  </div>
                  <p className={`font-mono text-3xl transition-all duration-500 font-bold`}
                    style={{ color: isUnlocked ? RE_GOLD : "rgba(255,255,255,0.25)" }}>{s.year}</p>
                  <p className="mt-2 text-sm font-semibold text-white">{s.role}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest mt-0.5"
                    style={{ color: isUnlocked ? RE_GOLD : "rgba(255,255,255,0.3)" }}>{s.company}</p>
                  <p className="mt-3 text-xs leading-relaxed text-white/55">{s.note}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <Stats />
      </div>
    </section>
  );
}

function StatsProgressRing({ value, max, label, unit, accent }: { value: number; max: number; label: string; unit: string; accent: string }) {
  const pct = value / max;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - pct * circumference;

  return (
    <div className="glass-panel relative flex flex-col items-center rounded-2xl p-6 border-t-2 border-t-white/10 shadow-md">
      <div className="relative h-44 w-44 rounded-full border-[4px] border-white/5 shadow-[0_0_15px_rgba(255,255,255,0.04)] bg-black/40 flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90">
          <defs>
            <linearGradient id={`g-${label}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--neon-blue)" />
              <stop offset="100%" stopColor={accent} />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle cx="100" cy="100" r={radius} stroke="rgba(255,255,255,0.04)" strokeWidth="8" fill="none" />
          {/* Glowing active progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            stroke={`url(#g-${label})`}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${accent})` }}
          />
        </svg>
        <div className="absolute text-center">
          <p className="font-mono text-3xl font-bold text-gradient-chrome tabular-nums">{value}</p>
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/40 mt-1">{unit}</p>
        </div>
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">{label}</p>
    </div>
  );
}

function Stats() {
  return (
    <div className="mt-20">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsProgressRing value={2}   max={5}  label="Projects"  unit="shipped"    accent="#dc2626" />
        <StatsProgressRing value={9}   max={10} label="CGPA"      unit="/ 10"       accent="#dfa82c" />
        <StatsProgressRing value={3}   max={5}  label="Certs"     unit="earned"     accent="#dc2626" />
        <StatsProgressRing value={6}   max={10} label="Tech Stack" unit="domains"   accent="#dfa82c" />
      </div>
    </div>
  );
}
