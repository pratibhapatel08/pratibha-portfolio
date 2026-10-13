import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import type { EducationItem } from "@/lib/types";

export function Education({ items }: { items: EducationItem[] }) {
  return (
    <section className="section" id="education">
      <div className="wrap">
        <Reveal>
          <SectionHeading index="05" kicker="Education" title="A foundation in mathematics and computer science." />
        </Reveal>
        <div className="edu-list">
          {items.map((item) => (
            <Reveal key={`${item.school}-${item.year}`}>
              <article className="edu-card">
                <p className="edu-year">{item.year}</p>
                <div>
                  <h3>
                    {item.degree}
                    <span> in {item.field}</span>
                  </h3>
                  <p>
                    {item.school}
                    <span> · {item.location}</span>
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
