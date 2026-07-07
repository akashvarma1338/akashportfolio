import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Rocket, MapPin, Mail, Phone } from "lucide-react";
import akashPhoto from "@/assets/akash-photo.jpg";

export function About() {
  return (
    <section id="about" className="relative px-6 py-28 section-divider">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="01" title="About Me" subtitle="The Rider Behind the Throttle" />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <div className="card-base p-8 flex flex-col items-center text-center h-full">
              {/* Photo */}
              <div className="relative w-44 h-44 mb-6">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "var(--gradient-red-blue)",
                    padding: 3,
                    boxShadow: "0 0 40px rgba(229,57,53,0.35), 0 0 80px rgba(59,130,246,0.15)",
                  }}
                >
                  <div className="h-full w-full rounded-full overflow-hidden bg-[#0a0a0f]">
                    <img
                      src={akashPhoto}
                      alt="Vanapala Akash Varma"
                      className="h-full w-full object-cover"
                      style={{ objectPosition: "center 18%" }}
                    />
                  </div>
                </div>
                {/* Status dot */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1.5 glass-panel rounded-full px-2.5 py-1">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse-glow" style={{ boxShadow: "0 0 8px #34d399" }} />
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Available</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white">Vanapala Akash Varma</h3>
              <p className="mt-1 text-sm font-medium" style={{ color: "var(--neon-blue)" }}>
                Software Developer
              </p>

              <div className="mt-4 flex flex-col gap-2 w-full text-sm" style={{ color: "rgba(160,160,185,0.9)" }}>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--neon-red)" }} />
                  Martur, Andhra Pradesh — 523301
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--neon-blue)" }} />
                  akashvarmav2910@gmail.com
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--neon-red)" }} />
                  +91 9032549818
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/6 w-full grid grid-cols-2 gap-3">
                {[
                  { val: "9.21/10", label: "CGPA" },
                  { val: "2027",    label: "Graduating" },
                  { val: "2+",      label: "Projects" },
                  { val: "3",       label: "Certifications" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] py-3 px-2">
                    <div className="text-xl font-bold text-white">{s.val}</div>
                    <div className="text-[10px] font-mono uppercase tracking-wider mt-0.5" style={{ color: "rgba(140,140,165,0.9)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Info cards */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="card-base p-7"
            >
              <h4 className="text-[11px] font-mono uppercase tracking-[0.4em] mb-3" style={{ color: "var(--neon-red)" }}>
                Professional Summary
              </h4>
              <p className="text-[15px] leading-[1.8]" style={{ color: "rgba(175,175,200,0.95)" }}>
                Computer Science undergraduate with strong foundations in software development,
                object-oriented programming, and database systems. Proficient in Python, Java, SQL,
                HTML, and CSS. Experienced with REST API integration, Firebase, Supabase, and deploying
                applications on Vercel. Passionate about building reliable, production-grade software systems.
              </p>
            </motion.div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Rocket,
                  color: "var(--neon-red)",
                  title: "Mission",
                  body: "Build reliable, performant software — from concept to production — using modern tools and clean engineering principles.",
                  delay: 0.15,
                },
                {
                  icon: Briefcase,
                  color: "var(--neon-blue)",
                  title: "Experience",
                  body: "Web Developer at SCRS KARE Club · Event Coordinator at IEEE EdSoc KARE. Real products used by students daily.",
                  delay: 0.2,
                },
                {
                  icon: GraduationCap,
                  color: "var(--neon-red)",
                  title: "Education",
                  body: "B.Tech CS · Kalasalingam University · CGPA 9.21/10. Graduating 2027. Intermediate 98.10% · Secondary 100%.",
                  delay: 0.25,
                },
                {
                  icon: MapPin,
                  color: "var(--neon-blue)",
                  title: "Currently Seeking",
                  body: "Software Developer / Engineer roles. Open to internships, full-time and collaborative opportunities.",
                  delay: 0.3,
                },
              ].map((c) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: c.delay, duration: 0.6 }}
                  className="card-base p-5 group hover:border-white/15 transition-colors duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: `${c.color}18`, border: `1px solid ${c.color}30` }}
                    >
                      <c.icon className="h-5 w-5" style={{ color: c.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider font-semibold mb-1.5" style={{ color: c.color }}>{c.title}</p>
                      <p className="text-[13.5px] leading-[1.7]" style={{ color: "rgba(165,165,190,0.95)" }}>{c.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ index, title, subtitle }: { index: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.45em]" style={{ color: "var(--neon-red)" }}>
          {index} —
        </span>
        {subtitle && (
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "rgba(120,120,145,0.9)" }}>
            {subtitle}
          </span>
        )}
      </div>
      <h2 className="font-bold tracking-tight text-gradient-chrome" style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}>
        {title}
      </h2>
    </motion.div>
  );
}
