"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchPortfolio } from "@/lib/api";
import type { PortfolioData } from "@/lib/types";
import { About } from "./About";
import { DotField } from "./DotField";
import { Contact } from "./Contact";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Marquee } from "./Marquee";
import { Navbar } from "./Navbar";
import { Projects } from "./Projects";
import { Skills } from "./Skills";

const orbitPreference = ["React.js", "Next.js", "Node.js", "MongoDB", "MySQL", "Docker", "JWT", "Generative AI"];

export function Portfolio() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
      document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      setProgress(max > 0 ? root.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchPortfolio()
      .then((portfolio) => {
        if (!cancelled) {
          setData(portfolio);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const known = new Set(data?.skills.flatMap((group) => group.items) ?? []);
  const orbit = orbitPreference.filter((item) => known.has(item));
  const marquee = Array.from(known);

  return (
    <MotionConfig reducedMotion="user">
      <DotField />
      <div className="cursor-glow" aria-hidden="true" />
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      {status === "loading" ? (
        <div className="loader">
          <span>PP</span>
          <p>Opening the portfolio</p>
        </div>
      ) : null}
      {status === "error" ? (
        <div className="loader">
          <span>PP</span>
          <p>The API is not reachable. Start MongoDB, then the Express server on port 5000.</p>
          <button className="btn btn-primary" type="button" onClick={() => setAttempt((value) => value + 1)}>
            Try again
          </button>
        </div>
      ) : null}
      {status === "ready" && data ? (
        <>
          <Navbar />
          <main>
            <Hero profile={data.profile} orbit={orbit} />
            <Marquee items={marquee} />
            <About profile={data.profile} />
            <Experience items={data.experience} />
            <Skills groups={data.skills} />
            <Projects items={data.projects} />
            <Education items={data.education} />
            <Contact profile={data.profile} />
          </main>
          <Footer profile={data.profile} />
        </>
      ) : null}
    </MotionConfig>
  );
}
