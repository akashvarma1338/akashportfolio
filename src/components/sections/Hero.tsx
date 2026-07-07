import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { useEffect, useRef } from "react";
import akashPhoto from "@/assets/akash-photo-nobg.png";
import reVideo from "@/assets/Royal_Enfield_logo_inaccurate_video_202606301021.mp4";

export function Hero() {
  const { scrollYProgress } = useScroll();
  const videoY       = useTransform(scrollYProgress, [0, 0.5], ["0%", "18%"]);
  const videoScale   = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 50, damping: 20 });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 50, damping: 20 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      mouseX.set((e.clientX - left) / width - 0.5);
      mouseY.set((e.clientY - top) / height - 0.5);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen w-full overflow-hidden flex items-center">

      {/* ── Royal Enfield video background ── */}
      <motion.div
        style={{ y: videoY, scale: videoScale, opacity: videoOpacity }}
        className="absolute inset-0 z-0"
      >
        <motion.div
          style={{ rotateY, rotateX, transformStyle: "preserve-3d", perspective: 1400 }}
          className="absolute inset-0"
        >
          <video
            src={reVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </motion.div>

        {/* Dark overlays for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/70" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/55" />
      </motion.div>

      {/* Neon floor accents */}
      <motion.div className="pointer-events-none absolute bottom-0 left-0 h-[35%] w-[45%]"
        initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.8, duration: 1.5 }}
        style={{ background: "radial-gradient(ellipse at 15% 100%, rgba(220,38,38,0.45), transparent 65%)" }} />
      <motion.div className="pointer-events-none absolute bottom-0 right-0 h-[35%] w-[45%]"
        initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 2.0, duration: 1.5 }}
        style={{ background: "radial-gradient(ellipse at 85% 100%, rgba(223,168,44,0.4), transparent 65%)" }} />

      {/* Floor fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to top, #0a0a0f, transparent)" }} />

      {/* HUD chips */}
      <motion.div className="absolute top-24 left-6 z-10 hidden lg:flex flex-col gap-2"
        initial={{ x: -24, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}>
        <div className="flex items-center gap-2 glass-panel rounded-xl px-3 py-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--neon-red)] animate-pulse-glow" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">Live · Garage</span>
        </div>
        <div className="glass-panel rounded-xl px-3 py-2 font-mono">
          <div className="text-[9px] uppercase tracking-widest text-white/35">Location</div>
          <div className="text-xs text-white/70 mt-0.5">Martur, AP · India</div>
        </div>
      </motion.div>

      <motion.div className="absolute top-24 right-6 z-10 hidden lg:block"
        initial={{ x: 24, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}>
        <div className="glass-panel rounded-xl px-4 py-3 text-right font-mono">
          <div className="text-[9px] uppercase tracking-widest text-white/35">Rider Status</div>
          <div className="text-sm text-white font-semibold mt-0.5">Open to Work</div>
          <div className="text-[10px] text-[var(--neon-blue)] mt-0.5">SDE · 2027</div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 mx-auto min-h-screen max-w-6xl flex items-center px-6 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-center w-full">
          {/* Left Column: Text & Content */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="h-px w-8 bg-[var(--neon-red)]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.45em] text-[var(--neon-red)]">
                Software Developer
              </span>
            </motion.div>

            <motion.h1
              className="font-extrabold leading-[1.0] tracking-tight"
              style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.9 } } }}
            >
              {["Vanapala", "Akash", "Varma"].map((word, i) => (
                <motion.span
                  key={i}
                  className={`block ${i < 2 ? "text-white" : "text-gradient-red-blue"}`}
                  variants={{
                    hidden: { y: 50, opacity: 0 },
                    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.7 }}
              className="mt-6 max-w-lg text-[1.05rem] leading-relaxed"
              style={{ color: "rgba(180,180,200,0.9)" }}
            >
              CS undergraduate building full-stack web apps and AI-powered platforms
            </motion.p>

            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.75, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="#projects"
                className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{ background: "var(--gradient-red-blue)", boxShadow: "var(--shadow-glow-red)" }}>
                View Projects <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#contact"
                className="glass-panel inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white/85 transition hover:text-white">
                Contact Me
              </a>
              <div className="flex items-center gap-2 ml-1">
                <a href="https://github.com/akashvarma1338" target="_blank" rel="noreferrer"
                  className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl text-white/60 transition hover:text-white">
                  <Github className="h-4 w-4" />
                </a>
                <a href="https://linkedin.com/in/vanapala-akash-varma" target="_blank" rel="noreferrer"
                  className="glass-panel flex h-10 w-10 items-center justify-center rounded-xl text-white/60 transition hover:text-white">
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.6 }}
              className="mt-10 flex items-center gap-6 flex-wrap"
            >
              {[
                { val: "9.21", label: "CGPA" },
                { val: "2+",   label: "Projects Shipped" },
                { val: "3",    label: "Certifications" },
                { val: "2027", label: "Graduating" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-white leading-none">{s.val}</span>
                  <span className="text-[11px] text-white/45 mt-1 font-mono uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: User Portrait Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center items-center h-[60vh] lg:h-[80vh] w-full select-none"
          >
            {/* Ambient matching neon red/gold light glow behind portrait */}
            <div className="absolute h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(220,38,38,0.18)_0%,transparent_70%)] filter blur-3xl" />
            <div className="absolute h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(223,168,44,0.12)_0%,transparent_70%)] filter blur-3xl translate-x-12 translate-y-12" />

            <motion.img
              src={akashPhoto}
              alt="Vanapala Akash Varma"
              className="h-full w-full object-contain relative z-10 max-h-[55vh] lg:max-h-[75vh] drop-shadow-[0_12px_40px_rgba(0,0,0,0.6)] scale-[1.4] origin-bottom translate-y-[2%]"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-white/30">Scroll</span>
        <ArrowDown className="h-4 w-4 text-white/30 animate-float-y" />
      </motion.div>    </section>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let v = 0; const step = to / 50; let raf = 0;
    const tick = () => { v = Math.min(v + step, to); if (ref.current) ref.current.textContent = `${Math.floor(v)}${suffix}`; if (v < to) raf = requestAnimationFrame(tick); };
    const t = setTimeout(() => { raf = requestAnimationFrame(tick); }, 1800);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}
