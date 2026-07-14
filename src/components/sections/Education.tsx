import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { SectionLabel } from "./About";

const EDUCATION_ITEMS = [
  {
    year: "2020",
    degree: "Secondary School",
    institution: "Universal High School",
    achievement: "Scored 100% — laid the foundation for a disciplined engineering mindset.",
  },
  {
    year: "2023",
    degree: "Intermediate",
    institution: "Srinivasa Gravity",
    achievement: "98.10% — top of class. Chose Computer Science for B.Tech.",
  },
  {
    year: "2027",
    degree: "B.Tech Computer Science",
    institution: "Kalasalingam University",
    achievement: "Expected graduation · 9.21 CGPA. Open to Software Developer / Engineer roles.",
  },
];

const ACCENT_COLOR = "#3b82f6";
const DARK_BG = "#0f172a";

export function Education() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 85%", "start 25%"],
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

      const direction = v - prev > 0 ? 1 : -1;
      tilt.set(Math.min(speed * 0.8, 8) * direction);

      trailOpacity.set(Math.min(speed * 0.16, 0.95));
      trailScaleX.set(1 + Math.min(speed * 0.25, 2.0));
      prev = v;

      if (v >= 74) setUnlockedCount(3);
      else if (v >= 35) setUnlockedCount(2);
      else setUnlockedCount(1);
    });
  }, [carX, blur, tilt, trailOpacity, trailScaleX]);

  const carLeft = useTransform(carX, (v) => `${v}%`);
  const carFilter = useTransform(blur, (v) => `blur(${v}px)`);
  const glowLeft = useTransform(carX, (v) => `${v}%`);

  return (
    <section id="education" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="05" title="Education" subtitle="Academic Foundation" />

        <div className="relative mt-20">
          {/* Track */}
          <div
            ref={trackRef}
            className="relative h-5 w-full overflow-visible rounded-full"
            style={{
              background: DARK_BG,
              boxShadow: `inset 0 2px 8px rgba(0,0,0,0.8), 0 0 0 1px rgba(59,130,246,0.15)`,
            }}
          >
            {/* Road lane dashes */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                backgroundImage: `repeating-linear-gradient(90deg, rgba(59,130,246,0.25) 0 10px, transparent 10px 24px)`,
              }}
            />

            {/* Progress fill */}
            <motion.div
              style={{
                width: trackPct,
                background: `linear-gradient(90deg, #1e40af, ${ACCENT_COLOR})`,
                boxShadow: `0 0 14px ${ACCENT_COLOR}80`,
              }}
              className="absolute inset-y-0 left-0 rounded-full"
            />

            {/* Glow at leading edge */}
            <motion.div
              style={{
                left: glowLeft,
                top: "50%",
                translateX: "-50%",
                translateY: "-50%",
                background: `radial-gradient(circle, ${ACCENT_COLOR} 0%, transparent 70%)`,
                filter: "blur(7px)",
              }}
              className="pointer-events-none absolute h-12 w-12 rounded-full"
            />

            {/* Sliding element */}
            <motion.div
              style={{ left: carLeft, filter: carFilter }}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              {/* Trail */}
              <motion.div
                style={{
                  opacity: trailOpacity,
                  scaleX: trailScaleX,
                  background: `linear-gradient(90deg, transparent, ${ACCENT_COLOR}90)`,
                  boxShadow: `0 0 12px ${ACCENT_COLOR}60`,
                }}
                className="absolute right-full top-1/2 h-[3px] w-28 origin-right -translate-y-1/2 rounded-full"
              />

              {/* Smoke puffs */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  animate={{
                    x: [-6, -28 - i * 10],
                    y: [0, (i - 1) * 4],
                    opacity: [0.7, 0],
                    scale: [1, 0.3],
                  }}
                  transition={{
                    duration: 0.5 + i * 0.1,
                    repeat: Infinity,
                    delay: i * 0.13,
                    ease: "easeOut",
                  }}
                  style={{
                    width: 4,
                    height: 4,
                    top: "50%",
                    right: "100%",
                    translateY: "-50%",
                    background: ACCENT_COLOR,
                    boxShadow: `0 0 6px ${ACCENT_COLOR}`,
                  }}
                />
              ))}

              {/* Main icon circle */}
              <motion.div
                style={{
                  rotateZ: tilt,
                  width: 68,
                  height: 68,
                  borderRadius: "50%",
                  border: `2px solid ${ACCENT_COLOR}`,
                  boxShadow: `0 0 20px ${ACCENT_COLOR}cc, 0 0 40px ${ACCENT_COLOR}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `linear-gradient(135deg, rgba(59,130,246,0.2), rgba(59,130,246,0.05))`,
                }}
                className="relative"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={ACCENT_COLOR}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6m0 0a8 8 0 0 1-16 0m16 0a8 8 0 0 0-16 0m16 0v-4" />
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M7 15h10" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* Education cards */}
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {EDUCATION_ITEMS.map((item, i) => {
              const isUnlocked = unlockedCount >= i + 1;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass-panel relative rounded-xl p-5 transition-all duration-500 ${
                    isUnlocked ? "-translate-y-1" : "opacity-40 scale-[0.98]"
                  }`}
                  style={{
                    borderWidth: "1px",
                    borderColor: isUnlocked ? `${ACCENT_COLOR}50` : "rgba(255,255,255,0.06)",
                    boxShadow: isUnlocked ? `0 0 20px ${ACCENT_COLOR}15` : "none",
                  }}
                >
                  <div
                    className="absolute -top-3 left-5 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white transition-all duration-500"
                    style={{
                      background: isUnlocked ? ACCENT_COLOR : "rgba(255,255,255,0.1)",
                      boxShadow: isUnlocked ? `0 0 14px ${ACCENT_COLOR}` : "none",
                      color: isUnlocked ? DARK_BG : "white",
                    }}
                  >
                    Step/{i + 1}
                  </div>
                  <p
                    className="font-mono text-3xl transition-all duration-500 font-bold"
                    style={{
                      color: isUnlocked ? ACCENT_COLOR : "rgba(255,255,255,0.25)",
                    }}
                  >
                    {item.year}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white">{item.degree}</p>
                  <p
                    className="font-mono text-[10px] uppercase tracking-widest mt-0.5"
                    style={{
                      color: isUnlocked ? ACCENT_COLOR : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {item.institution}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-white/55">
                    {item.achievement}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
