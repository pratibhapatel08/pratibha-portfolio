import type { ContactPayload, PortfolioData } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://pratibha-portfolio.onrender.com";

export async function fetchPortfolio(): Promise<PortfolioData> {
  const response = await fetch(`${API_URL}/api/portfolio`, { cache: "no-store" });
  const data = (await response.json()) as PortfolioData & { ok?: boolean; error?: string };
  if (!response.ok || !data.profile) {
    throw new Error(data.error || "Unable to load portfolio.");
  }
  return {
    profile: data.profile,
    experience: data.experience,
    skills: data.skills,
    projects: data.projects,
    education: data.education,
  };
}

export async function sendMessage(payload: ContactPayload): Promise<string> {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json()) as { message?: string; error?: string };
  if (!response.ok) {
    throw new Error(data.error || "Unable to send your message.");
  }
  return data.message || "Message received.";
}
