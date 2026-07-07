import { motion } from "framer-motion";
import { SectionLabel } from "./About";

// Devicons CDN — colored SVG logos
const TECHS = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "SQL",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
];

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 section-divider">
      <div className="mx-auto max-w-5xl">
        <SectionLabel index="02" title="Skills" subtitle="Technical Stack" />

        <motion.div
          className="mt-14 flex flex-wrap gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {TECHS.map((tech) => (
            <motion.div
              key={tech.name}
              variants={{
                hidden:  { opacity: 0, x: -12 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
              className="group flex items-center gap-3 card-base px-5 py-3 cursor-default"
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="h-6 w-6 object-contain shrink-0"
                loading="lazy"
              />
              <span className="text-[14px] font-medium" style={{ color: "rgba(200,200,220,0.95)" }}>
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Core CS tags */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 card-base p-6"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.4em] mb-4" style={{ color: "rgba(130,130,155,0.9)" }}>
            Core CS Concepts
          </p>
          <div className="flex flex-wrap gap-2">
            {["Data Structures", "Algorithms", "OOP", "Problem Solving", "REST API Integration", "Version Control", "Prompt Engineering"].map((item) => (
              <span key={item} className="tag-pill">{item}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
