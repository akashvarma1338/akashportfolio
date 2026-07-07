import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Github, ExternalLink, X, ChevronLeft, ChevronRight, Gauge, Calendar, Users } from "lucide-react";
import { SectionLabel } from "./About";
import veggie1 from "@/assets/veggie-1.png";
import veggie2 from "@/assets/veggie-2.png";
import veggie3 from "@/assets/veggie-3.png";
import ai1 from "@/assets/ai-1.png";
import ai2 from "@/assets/ai-2.png";
import ai3 from "@/assets/ai-3.png";

type Project = {
  name: string;
  tag: string;
  desc: string;
  longDesc: string;
  tech: string[];
  accent: string; // CSS gradient or image URL
  year: string;
  role: string;
  client: string;
  liveUrl: string;
  githubUrl: string;
  gallery: string[];
  metrics: { label: string; value: string }[];
};

const PROJECTS: Project[] = [
  {
    name: "Veggie Market",
    tag: "Full Stack · E-Commerce",
    desc: "Full-stack e-commerce platform enabling direct farmer-to-customer vegetable sales with dynamic listings, cart and Supabase backend.",
    longDesc:
      "Developed a full-stack e-commerce platform enabling direct farmer-to-customer vegetable sales. Implemented dynamic product listings, cart functionality, and responsive user interfaces. Designed and managed backend services using Supabase for product storage and order processing. Created optimised database schemas to support scalable transactions and deployed on Vercel with continuous deployment.",
    tech: ["HTML", "CSS", "Supabase", "Vercel", "REST APIs"],
    accent: `url(${veggie1})`,
    year: "2025",
    role: "Full Stack Developer",
    client: "Personal Project",
    liveUrl: "https://veggiemarket.vercel.app/",
    githubUrl: "https://github.com/akashvarma1338/veggie-market",
    gallery: [veggie1, veggie2, veggie3],
    metrics: [
      { label: "Backend", value: "Supabase" },
      { label: "Deploy", value: "Vercel" },
      { label: "Type", value: "Full Stack" },
    ],
  },
  {
    name: "AI Study Assistant",
    tag: "AI · Learning Platform",
    desc: "AI-powered study platform with topic explanations, automated summaries, quizzes and flashcards — powered by Groq API (Llama 3.1).",
    longDesc:
      "Built an AI-powered study platform providing topic explanations, automated summaries, quizzes and flashcards. Integrated Groq API (Llama 3.1) to generate real-time AI responses for learning assistance. Implemented secure authentication and persistent study history using Firebase Authentication and Firestore. Developed responsive interfaces and optimised API workflows for better performance.",
    tech: ["Groq API", "Llama 3.1", "Firebase", "Firestore", "HTML", "CSS"],
    accent: `url(${ai1})`,
    year: "2025",
    role: "Solo Developer",
    client: "Personal Project",
    liveUrl: "https://ai-studybuddy-varma.vercel.app/",
    githubUrl: "https://github.com/akashvarma1338",
    gallery: [ai1, ai2, ai3],
    metrics: [
      { label: "AI Model", value: "Llama 3.1" },
      { label: "Auth", value: "Firebase" },
      { label: "Features", value: "4 modes" },
    ],
  },
];

export function Projects() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="04" title="Projects" subtitle="The Garage" />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} onOpen={() => setOpenIdx(i)} />
          ))}
        </div>
      </div>

      <ProjectModal
        projects={PROJECTS}
        index={openIdx}
        onClose={() => setOpenIdx(null)}
        onNavigate={(dir) =>
          setOpenIdx((cur) =>
            cur === null ? cur : (cur + dir + PROJECTS.length) % PROJECTS.length,
          )
        }
      />
    </section>
  );
}

function ProjectCard({ project: p, index: i, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="group relative overflow-hidden rounded-3xl glass-panel cursor-pointer"
      data-cursor="hover"
      onClick={onOpen}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={p.accent.startsWith('url') ? { backgroundImage: p.accent, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: p.accent }} />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.15)_42%,transparent_55%)] transition-transform duration-1000 group-hover:translate-x-1/3" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute top-4 left-4 glass-panel rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">{p.tag}</div>
        <div className="absolute top-4 right-4 font-mono text-xs text-white/40">/ 0{i + 1}</div>
        <div className="absolute bottom-4 right-4 glass-panel rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.3em] text-white/0 transition group-hover:text-white">Open ↗</div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-bold text-white">{p.name}</h3>
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            <a href={p.liveUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="glass-panel flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:text-white" aria-label="Live demo">
              <ExternalLink className="h-4 w-4" />
            </a>
            <a href={p.githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="glass-panel flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:text-white" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/65">{p.desc}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/60">{t}</span>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px oklch(0.65 0.25 25 / 0.5), 0 0 60px oklch(0.65 0.25 25 / 0.25)" }} />
    </motion.article>
  );
}

function ProjectModal({ projects, index, onClose, onNavigate }: {
  projects: Project[]; index: number | null; onClose: () => void; onNavigate: (dir: 1 | -1) => void;
}) {
  const open = index !== null;
  const p = open ? projects[index] : null;
  const [shot, setShot] = useState(0);

  useEffect(() => { setShot(0); }, [index]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, onClose, onNavigate]);

  const nextShot = useCallback(() => { if (!p) return; setShot((s) => (s + 1) % p.gallery.length); }, [p]);
  const prevShot = useCallback(() => { if (!p) return; setShot((s) => (s - 1 + p.gallery.length) % p.gallery.length); }, [p]);

  return (
    <AnimatePresence>
      {open && p && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] flex items-center justify-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-2xl" onClick={onClose} />

          <motion.div initial={{ x: 0 }} animate={{ x: "-100%" }} exit={{ x: 0 }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1], delay: 0.05 }}
            className="absolute inset-y-0 left-0 z-10 w-1/2 origin-left"
            style={{ background: "linear-gradient(90deg, #050505 0%, #0d0d0d 70%, oklch(0.65 0.25 25 / 0.4) 100%)", boxShadow: "inset -2px 0 0 oklch(0.65 0.25 25 / 0.6)" }}>
            <div className="absolute right-0 top-1/2 h-24 w-1 -translate-y-1/2 rounded-l-full bg-[var(--neon-red)] shadow-[0_0_30px_var(--neon-red)]" />
          </motion.div>
          <motion.div initial={{ x: 0 }} animate={{ x: "100%" }} exit={{ x: 0 }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1], delay: 0.05 }}
            className="absolute inset-y-0 right-0 z-10 w-1/2 origin-right"
            style={{ background: "linear-gradient(270deg, #050505 0%, #0d0d0d 70%, oklch(0.7 0.18 245 / 0.4) 100%)", boxShadow: "inset 2px 0 0 oklch(0.7 0.18 245 / 0.6)" }}>
            <div className="absolute left-0 top-1/2 h-24 w-1 -translate-y-1/2 rounded-r-full bg-[var(--neon-blue)] shadow-[0_0_30px_var(--neon-blue)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.55, duration: 0.5 } }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
            className="relative z-20 flex h-[92vh] w-[94vw] max-w-7xl flex-col overflow-hidden rounded-3xl glass-panel"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-[var(--neon-red)] animate-pulse-glow" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/50">
                  Case File · {String(index! + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onNavigate(-1)} aria-label="Previous" className="glass-panel flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:text-white"><ChevronLeft className="h-4 w-4" /></button>
                <button onClick={() => onNavigate(1)} aria-label="Next" className="glass-panel flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:text-white"><ChevronRight className="h-4 w-4" /></button>
                <button onClick={onClose} aria-label="Close" className="glass-panel flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:text-white" style={{ boxShadow: "0 0 24px oklch(0.65 0.25 25 / 0.4)" }}><X className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-5">
              <div className="relative col-span-3 overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.div key={`${index}-${shot}`} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.6, ease: "easeOut" }} className="absolute inset-0"
                    style={p.gallery[shot].startsWith('url') || p.gallery[shot].startsWith('/') || p.gallery[shot].startsWith('data') || !p.gallery[shot].includes('gradient')
                      ? { backgroundImage: `url(${p.gallery[shot]})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                      : { background: p.gallery[shot] }} />
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.12)_42%,transparent_55%)]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute top-5 left-5 glass-panel rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/80">{p.tag}</div>
                <button onClick={prevShot} className="glass-panel absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
                <button onClick={nextShot} className="glass-panel absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition hover:text-white"><ChevronRight className="h-5 w-5" /></button>
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
                  {p.gallery.map((g, gi) => (
                    <button key={gi} onClick={() => setShot(gi)} className="h-12 w-16 overflow-hidden rounded-md border transition"
                      style={{ borderColor: gi === shot ? "var(--neon-red)" : "rgba(255,255,255,0.15)", boxShadow: gi === shot ? "0 0 16px var(--neon-red)" : "none" }}>
                      <div className="h-full w-full"
                        style={g.startsWith('/') || g.startsWith('data') || !g.includes('gradient')
                          ? { backgroundImage: `url(${g})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                          : { background: g }} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-span-2 flex flex-col gap-6 overflow-y-auto p-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--neon-red)]">/ {p.year}</p>
                  <h3 className="mt-3 text-4xl font-bold leading-tight text-gradient-chrome">{p.name}</h3>
                </div>
                <p className="text-sm leading-relaxed text-white/70">{p.longDesc}</p>
                <div className="grid grid-cols-3 gap-3">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                      <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">{m.label}</p>
                      <p className="mt-1 font-mono text-lg text-gradient-chrome tabular-nums">{m.value}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InfoLine icon={<Users className="h-3 w-3" />} label="Client" value={p.client} />
                  <InfoLine icon={<Gauge className="h-3 w-3" />} label="Role" value={p.role} />
                  <InfoLine icon={<Calendar className="h-3 w-3" />} label="Year" value={p.year} />
                  <InfoLine icon={<ExternalLink className="h-3 w-3" />} label="Status" value="Shipped" />
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">Powertrain & Specs</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/70">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto flex gap-3 pt-4">
                  <a href={p.liveUrl} className="relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3 font-semibold uppercase tracking-wider text-xs text-white"
                    style={{ background: "var(--gradient-red-blue)", boxShadow: "var(--shadow-glow-red)" }}>
                    Live Demo <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="glass-panel inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white/90 transition hover:text-white">
                    <Github className="h-3.5 w-3.5" /> Source
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InfoLine({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-widest text-white/40">{icon}{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
