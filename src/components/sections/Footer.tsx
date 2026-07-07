import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileDown, ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--neon-red)] animate-pulse-glow" />
          Akash Varma · © {new Date().getFullYear()} · All systems nominal
        </div>

        <div className="flex items-center gap-2">
          {[
            { icon: Github,   href: "https://github.com/akashvarma1338",                          label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/vanapala-akash-varma", label: "LinkedIn" },
            { icon: Mail,     href: "mailto:akashvarmav2910@gmail.com",             label: "Email" },
            { icon: FileDown, href: "#",                                            label: "Resume" },
          ].map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label}
              className="glass-panel flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition hover:text-white">
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <motion.a
          href="#home"
          whileHover={{ y: -3 }}
          className="glass-panel group relative flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70 hover:text-white"
        >
          <span className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-[var(--neon-red)]/30 to-transparent transition-all duration-500 group-hover:w-full" />
          <span className="relative">Back to top</span>
          <ArrowUp className="relative h-3 w-3 transition group-hover:-translate-y-0.5" />
          <span className="relative -ml-1 h-3 w-px bg-white/30" />
          <span className="relative text-[var(--neon-red)]">↑</span>
        </motion.a>
      </div>
    </footer>
  );
}
