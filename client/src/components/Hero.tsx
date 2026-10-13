"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { formatPhone, phoneHref, splitName, yearsNumber } from "@/lib/format";
import type { Profile } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
};

function CountUp({ value }: { value: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 900);
      setCurrent(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{current}</>;
}

export function Hero({ profile, orbit }: { profile: Profile; orbit: string[] }) {
  const { first, last } = splitName(profile.name);
  const years = yearsNumber(profile.yearsLabel);

  return (
    <section className="hero" id="top">
      <motion.div className="hero-copy" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.09 } } }}>
        <motion.p className="eyebrow" variants={item}>
          <span className="pulse" />
          Open to new work
        </motion.p>
        <motion.h1 variants={item}>
          {first}
          {last ? <em>{last}</em> : null}
        </motion.h1>
        <motion.p className="role" variants={item}>
          {profile.title}
        </motion.p>
        <motion.p className="headline" variants={item}>
          with {profile.headline}
        </motion.p>
        <motion.p className="lede" variants={item}>
          {profile.lede}
        </motion.p>
        <motion.div className="hero-actions" variants={item}>
          <a className="btn btn-primary" href="#projects">
            View projects
          </a>
          <a className="btn btn-ghost" href="/Resume/Pratibha_Patel_MERN_Fullstack_Developer .pdf" download>
            Download resume
          </a>
        </motion.div>
        <motion.div className="hero-meta" variants={item}>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={phoneHref(profile.phone)}>{formatPhone(profile.phone)}</a>
        </motion.div>
      </motion.div>

      <motion.aside
        className="portrait"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.25, ease }}
      >
        <div className="portrait-frame">
          <img src="/Image/pratibha_photo.jpeg" alt="Portrait of Pratibha Patel" />
          <div className="portrait-badge">
            <strong>
              <CountUp value={years} />+
            </strong>
            <span>years</span>
          </div>
        </div>
        <p className="portrait-caption">Micro Technologies · Oct 2023 – Present</p>
        <ul className="orbit-tags">
          {orbit.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      </motion.aside>

      <a className="scroll-hint" href="#about">
        <span />
        Scroll
      </a>
    </section>
  );
}
