"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import type { SkillGroup } from "@/lib/types";

const chip = {
  hidden: { opacity: 0, y: 14, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
};

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <section className="section" id="skills">
      <div className="wrap">
        <Reveal>
          <SectionHeading index="03" kicker="Skills" title="A stack shaped by product work, cloud, and AI." />
        </Reveal>
        <div className="skill-grid">
          {groups.map((group, index) => (
            <Reveal key={group.category} delay={(index % 3) * 0.08} className={index === 0 ? "span-2" : undefined}>
              <article className="skill-card">
                <h3>{group.category}</h3>
                <motion.ul
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: index * 0.05 } } }}
                >
                  {group.items.map((item) => (
                    <motion.li key={item} variants={chip} whileHover={{ y: -4, scale: 1.05 }}>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
