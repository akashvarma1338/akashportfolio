import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionLabel } from "./About";
import ac1 from "@/assets/ac-1.jpg";
import ac2 from "@/assets/ac-2.jpg";
import ac3 from "@/assets/ac-3.jpg";
import ac4 from "@/assets/ac-4.jpg";

const SLIDES = [
  {
    img: ac1,
    title: "Merit Student Award",
    subtitle: "Kalasalingam University · 2024",
    desc: "Recognised as a Merit Student by Kalasalingam University for outstanding academic performance. This award is presented to students who consistently maintain exceptional grades and demonstrate dedication to their field of study. Achieving a CGPA of 9.21, this honour reflects a commitment to excellence throughout the B.Tech Computer Science programme.",
  },
  {
    img: ac2,
    title: "Merit Student Award",
    subtitle: "Kalasalingam University · 2025",
    desc: "Awarded the Merit Student distinction for sustained academic brilliance and exemplary conduct. The recognition celebrates not just grades but the overall contribution to the academic community — participating in technical events, workshops, and maintaining a high standard of learning across all semesters.",
  },
  {
    img: ac3,
    title: "Merit Student Award",
    subtitle: "Kalasalingam University · 2026",
    desc: "Honoured with the Merit Student Award in recognition of top-tier academic achievement and consistent performance. This accolade from Kalasalingam University stands as a testament to hard work, discipline, and a passion for computer science — values that drive every project and challenge undertaken.",
  },
  {
    img: ac4,
    title: "24-Hour Hackathon Winner",
    subtitle: "IEEE SMC Club · Kalasalingam University",
    desc: "Won the 24-hour hackathon organised by the IEEE Systems, Man, and Cybernetics (SMC) Club. Competed against teams across the university, building a fully functional solution within a single day under high-pressure conditions. The win demonstrated strong problem-solving skills, rapid prototyping ability, and effective teamwork — core traits of a real-world software engineer.",
  },
];

export function Achievements() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 2000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const go = (dir: 1 | -1) => {
    setCurrent((c) => (c + dir + SLIDES.length) % SLIDES.length);
    startTimer();
  };

  // indices for prev / current / next
  const prev = (current - 1 + SLIDES.length) % SLIDES.length;
  const next = (current + 1) % SLIDES.length;

  return (
    <section id="achievements" className="relative px-6 py-28 section-divider">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="03" title="Achievements" subtitle="Milestones & Honours" />

        <div className="mt-14 relative flex items-center justify-center gap-4 select-none">

          {/* Prev arrow */}
          <button onClick={() => go(-1)}
            className="glass-panel z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/60 hover:text-white transition">
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Slider track */}
          <div className="relative flex items-center justify-center w-full max-w-4xl h-[420px] overflow-visible">

            {/* Prev card */}
            <motion.div
              key={`prev-${prev}`}
              className="absolute left-0 w-[28%] h-[340px] rounded-2xl overflow-hidden cursor-pointer opacity-50 scale-90 z-0"
              style={{ transformOrigin: "right center" }}
              onClick={() => go(-1)}
            >
              <img src={SLIDES[prev].img} alt={SLIDES[prev].title}
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
            </motion.div>

            {/* Active card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-[44%] h-[400px] rounded-2xl overflow-hidden cursor-pointer"
                style={{ boxShadow: "0 0 40px rgba(220,38,38,0.3), 0 0 80px rgba(220,38,38,0.1)" }}
                onClick={() => setSelected(current)}
              >
                <img src={SLIDES[current].img} alt={SLIDES[current].title}
                  className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--neon-blue)] mb-1">
                    {SLIDES[current].subtitle}
                  </p>
                  <p className="text-white font-bold text-lg leading-tight">
                    {SLIDES[current].title}
                  </p>
                  <p className="text-white/50 text-xs mt-1 font-mono">Click to read more ↗</p>
                </div>
                {/* Border glow */}
                <div className="absolute inset-0 rounded-2xl border border-[var(--neon-red)]/40" />
              </motion.div>
            </AnimatePresence>

            {/* Next card */}
            <motion.div
              key={`next-${next}`}
              className="absolute right-0 w-[28%] h-[340px] rounded-2xl overflow-hidden cursor-pointer opacity-50 scale-90 z-0"
              style={{ transformOrigin: "left center" }}
              onClick={() => go(1)}
            >
              <img src={SLIDES[next].img} alt={SLIDES[next].title}
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
            </motion.div>
          </div>

          {/* Next arrow */}
          <button onClick={() => go(1)}
            className="glass-panel z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/60 hover:text-white transition">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => { setCurrent(i); startTimer(); }}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 6,
                background: i === current ? "var(--neon-red)" : "rgba(255,255,255,0.2)",
              }} />
          ))}
        </div>
      </div>

      {/* Description modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            onClick={() => setSelected(null)}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 glass-panel rounded-3xl overflow-hidden max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img src={SLIDES[selected].img} alt={SLIDES[selected].title}
                  className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 glass-panel flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:text-white transition">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-7">
                <p className="font-mono text-[10px] uppercase tracking-widest mb-2"
                  style={{ color: "var(--neon-blue)" }}>
                  {SLIDES[selected].subtitle}
                </p>
                <h3 className="text-2xl font-bold text-white mb-4">{SLIDES[selected].title}</h3>
                <p className="text-sm leading-relaxed text-white/65">{SLIDES[selected].desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
