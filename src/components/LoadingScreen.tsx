import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

// RPM needle sweeps 0→270 deg as pct goes 0→100
const PCT_TO_DEG = (p: number) => -135 + (p / 100) * 270;

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);
  const rawDeg = useMotionValue(PCT_TO_DEG(0));
  const needleDeg = useSpring(rawDeg, { stiffness: 80, damping: 18 });

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 9 + 3;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        // brief redline flash then exit
        setTimeout(() => { setGone(true); onDone(); }, 700);
      }
      const floored = Math.min(100, Math.floor(p));
      setPct(floored);
      rawDeg.set(PCT_TO_DEG(floored));
    }, 90);
    return () => clearInterval(id);
  }, [onDone, rawDeg]);

  const isRedline = pct >= 85;

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center carbon-bg"
        >
          {/* Ambient glow */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: isRedline ? [0.25, 0.5, 0.25] : 0.18 }}
            transition={{ repeat: isRedline ? Infinity : 0, duration: 0.4 }}
            style={{ background: "radial-gradient(circle at 50% 55%, rgba(255,40,40,0.45), transparent 60%)" }}
          />

          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-8"
          >
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 0.65, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-mono text-sm uppercase tracking-[0.5em] text-[var(--neon-blue)]"
              >
                Hello
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.9 }}
                className="mt-4 text-3xl md:text-4xl font-extrabold text-gradient-chrome tracking-[0.25em] uppercase font-display"
                style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.15))" }}
              >
                Welcome to my world
              </motion.h2>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
