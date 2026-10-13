"use client";

import { FormEvent, useState } from "react";
import { sendMessage } from "@/lib/api";
import { formatPhone, phoneHref } from "@/lib/format";
import type { Profile } from "@/lib/types";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const empty = { name: "", email: "", subject: "", message: "" };

export function Contact({ profile }: { profile: Profile }) {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [note, setNote] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setNote("");
    try {
      const message = await sendMessage(form);
      setStatus("sent");
      setNote(message);
      setForm(empty);
    } catch (error) {
      setStatus("error");
      setNote(error instanceof Error ? error.message : "Unable to send your message.");
    }
  }

  return (
    <section className="section" id="contact">
      <div className="wrap contact-grid">
        <Reveal>
          <SectionHeading index="06" kicker="Contact" title="Tell me what you want to build." />
          <p className="contact-copy">
            A short note is enough — a role, a product idea, or a question. Messages are saved to the portfolio database.
          </p>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`}>
              <span>Email</span>
              {profile.email}
            </a>
            <a href={phoneHref(profile.phone)}>
              <span>Mobile</span>
              {formatPhone(profile.phone)}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          {status === "sent" ? (
            <div className="form-success" role="status">
              <span className="check" aria-hidden="true" />
              <h3>Message sent</h3>
              <p>{note}</p>
              <button className="btn btn-ghost" type="button" onClick={() => setStatus("idle")}>
                Send another
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="field-row">
                <label>
                  Name
                  <input
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    required
                    minLength={2}
                    maxLength={80}
                  />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    required
                    maxLength={120}
                  />
                </label>
              </div>
              <label>
                Subject
                <input
                  name="subject"
                  value={form.subject}
                  onChange={(event) => setForm({ ...form, subject: event.target.value })}
                  maxLength={140}
                />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  required
                  minLength={10}
                  maxLength={2000}
                />
              </label>
              <div className="form-foot">
                <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
                <p aria-live="polite">{note}</p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
