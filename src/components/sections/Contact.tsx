import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { SectionLabel } from "./About";

export function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setTimeout(() => {
      setState("sent");
      setTimeout(() => {
        setState("idle");
        setForm({ name: "", email: "", message: "" });
      }, 3200);
    }, 1600);
  };

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <SectionLabel index="06" title="Contact" subtitle="The Cockpit" />

        <div className="mt-16 glass-panel relative overflow-hidden rounded-3xl p-2">
          {/* Dashboard shell */}
          <div className="relative rounded-[1.4rem] carbon-bg p-8 md:p-12">
            {/* Top bar — dash lights */}
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-[var(--neon-red)] animate-pulse-glow" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">Dashboard · Comms</span>
              </div>
              <div className="flex gap-2">
                {["BAT", "OIL", "TMP"].map((k, i) => (
                  <span key={k} className="rounded border border-white/10 px-2 py-1 font-mono text-[9px] uppercase tracking-widest"
                    style={{ color: i === 0 ? "var(--neon-blue)" : "rgba(255,255,255,0.5)" }}>
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <form onSubmit={submit} className="grid gap-6 md:grid-cols-2">
              <DashField label="Pilot Name" name="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your name" />
              <DashField label="Channel" name="email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@domain.com" icon={<Mail className="h-3 w-3" />} />
              <div className="md:col-span-2">
                <DashField
                  label="Transmission"
                  name="message"
                  value={form.message}
                  onChange={(v) => setForm({ ...form, message: v })}
                  placeholder="Tell me about the project, the timeline, the ambition…"
                  textarea
                />
              </div>

              <div className="md:col-span-2 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Avg response · 24h · akashvarmav2910@gmail.com
                </p>
                <button
                  type="submit"
                  disabled={state !== "idle"}
                  data-cursor="hover"
                  className="relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-3.5 font-semibold uppercase tracking-wider text-sm text-white disabled:opacity-90"
                  style={{ background: "var(--gradient-red-blue)", boxShadow: "var(--shadow-glow-red)" }}
                >
                  <AnimatePresence mode="wait">
                    {state === "idle" && (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        Ignite Transmission <Send className="h-4 w-4" />
                      </motion.span>
                    )}
                    {state === "sending" && (
                      <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Ignition…
                      </motion.span>
                    )}
                    {state === "sent" && (
                      <motion.span key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Engine running
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </form>

            {/* Success glow */}
            <AnimatePresence>
              {state === "sent" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute inset-0 rounded-[1.4rem]"
                  style={{ boxShadow: "inset 0 0 80px oklch(0.65 0.25 25 / 0.5)" }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashField({
  label, name, value, onChange, placeholder, type = "text", textarea, icon,
}: {
  label: string; name: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; textarea?: boolean; icon?: React.ReactNode;
}) {
  return (
    <label className="group block">
      <span className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
        {icon}{label}
      </span>
      <div className="relative">
        {textarea ? (
          <textarea
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required
            rows={5}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[var(--neon-blue)] focus:ring-2 focus:ring-[var(--neon-blue)]/30"
          />
        ) : (
          <input
            name={name}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[var(--neon-blue)] focus:ring-2 focus:ring-[var(--neon-blue)]/30"
          />
        )}
        <div className="pointer-events-none absolute -top-1 right-3 h-1 w-1 rounded-full bg-[var(--neon-blue)] opacity-0 transition group-focus-within:opacity-100"
          style={{ boxShadow: "0 0 8px var(--neon-blue)" }} />
      </div>
    </label>
  );
}
