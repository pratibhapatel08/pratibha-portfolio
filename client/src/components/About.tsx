import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import type { Profile } from "@/lib/types";

export function About({ profile }: { profile: Profile }) {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <Reveal>
          <SectionHeading index="01" kicker="Profile" title="Building products that stay clear under pressure." />
        </Reveal>
        <div className="about-grid">
          <Reveal>
            <p className="pull">{profile.lede}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="summary">{profile.summary}</p>
            <ul className="focus-list">
              {profile.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
