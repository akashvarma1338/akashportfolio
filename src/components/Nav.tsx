import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { id: "home",         label: "Home" },
  { id: "about",        label: "About" },
  { id: "skills",       label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "projects",     label: "Projects" },
  { id: "experience",   label: "Experience" },
  { id: "contact",      label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    links.forEach((l) => { const el = document.getElementById(l.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-5 left-1/2 z-50 -translate-x-1/2 w-auto"
    >
      <div
        className="flex items-center gap-1 rounded-2xl px-2 py-1.5 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(10,10,15,0.92)"
            : "rgba(255,255,255,0.04)",
          backdropFilter: "blur(28px) saturate(160%)",
          border: scrolled
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(255,255,255,0.07)",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.5)" : "none",
        }}
      >
        {/* Brand mark */}
        <div className="flex items-center gap-2 px-3 py-1 mr-1">
          <div
            className="h-6 w-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white"
            style={{ background: "var(--gradient-red-blue)" }}
          >
            A
          </div>
          <span className="hidden sm:block font-semibold text-sm text-white/80 tracking-tight">
            Akash
          </span>
        </div>

        <div className="h-5 w-px bg-white/10 mx-1" />

        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className="relative rounded-xl px-3.5 py-2 text-[13px] font-medium text-white/55 transition-colors duration-200 hover:text-white"
          >
            {active === l.id && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(229,57,53,0.25), rgba(59,130,246,0.2))",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span className={`relative transition-colors duration-200 ${active === l.id ? "text-white font-semibold" : ""}`}>
              {l.label}
            </span>
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
