"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import type { ProjectItem } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

export function Projects({ items }: { items: ProjectItem[] }) {
  return (
    <section className="section" id="projects">
      <div className="wrap">
        <Reveal>
          <SectionHeading index="04" kicker="Selected work" title="Three products. Three different problems." />
        </Reveal>
        <div className="project-list">
          {items.map((project, index) => (
            <motion.article
              key={project.title}
              className={`project tone-${project.accent} ${index % 2 ? "flip" : ""}`}
              initial={{ opacity: 0, x: index % 2 ? 70 : -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
            >
              <div className="project-visual" aria-hidden="true">
                <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                <strong>{project.title}</strong>
                <em>{project.category}</em>
              </div>
              <div className="project-body">
                <p className="project-kicker">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <ul>
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="stack">
                  {project.stack.map((tech, chipIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + chipIndex * 0.04, duration: 0.35 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
