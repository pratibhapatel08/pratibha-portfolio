import { formatPhone, phoneHref } from "@/lib/format";
import type { Profile } from "@/lib/types";

export function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div>
          <p className="footer-name">{profile.name}</p>
          <p>{profile.title}</p>
        </div>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={phoneHref(profile.phone)}>{formatPhone(profile.phone)}</a>
        </div>
      </div>
    </footer>
  );
}
