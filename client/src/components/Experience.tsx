import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import type { ExperienceItem } from "@/lib/types";

export function Experience({ items }: { items: ExperienceItem[] }) {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <Reveal>
          <SectionHeading index="02" kicker="Experience" title="Hands-on full-stack work, from interface to deploy." />
        </Reveal>
        <div className="timeline">
          {items.map((job) => (
            <Reveal key={`${job.company}-${job.period}`}>
              <article className="job">
                <header>
                  <div>
                    <p className="job-company">{job.company}</p>
                    <h3>{job.role}</h3>
                  </div>
                  <div className="job-time">
                    {job.current ? <span className="badge">Present</span> : null}
                    <time>{job.period}</time>
                  </div>
                </header>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
