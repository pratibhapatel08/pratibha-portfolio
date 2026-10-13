import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { Education, Experience, Message, Profile, Project, Skill } from "./models.js";
import { seedIfEmpty } from "./seed.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/pratibha_portfolio";
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin) || origin === clientOrigin) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
  }),
);
app.use(express.json({ limit: "32kb" }));

const asyncHandler =
  (fn: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    fn(req, res, next).catch(next);
  };

app.get("/api/health", (_req, res) => {
  const db = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.json({ ok: true, db });
});

app.get("/api/portfolio", asyncHandler(async (_req, res) => {
  const [profile, experience, skills, projects, education] = await Promise.all([
    Profile.findOne().lean(),
    Experience.find().sort({ order: 1 }).lean(),
    Skill.find().sort({ order: 1 }).lean(),
    Project.find().sort({ order: 1 }).lean(),
    Education.find().sort({ order: 1 }).lean(),
  ]);

  if (!profile) {
    res.status(404).json({ ok: false, error: "Portfolio profile has not been seeded yet." });
    return;
  }

  res.json({ ok: true, profile, experience, skills, projects, education });
}));

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post("/api/contact", asyncHandler(async (req, res) => {
  const name = String(req.body?.name ?? "").trim();
  const email = String(req.body?.email ?? "").trim();
  const subject = String(req.body?.subject ?? "").trim();
  const message = String(req.body?.message ?? "").trim();

  if (name.length < 2 || name.length > 80) {
    res.status(400).json({ ok: false, error: "Please enter your name (2–80 characters)." });
    return;
  }
  if (!emailPattern.test(email) || email.length > 120) {
    res.status(400).json({ ok: false, error: "Please enter a valid email address." });
    return;
  }
  if (subject.length > 140) {
    res.status(400).json({ ok: false, error: "Subject should be 140 characters or fewer." });
    return;
  }
  if (message.length < 10 || message.length > 2000) {
    res.status(400).json({ ok: false, error: "Message should be between 10 and 2000 characters." });
    return;
  }

  const saved = await Message.create({ name, email, subject, message });
  res.status(201).json({
    ok: true,
    id: saved._id,
    message: "Message received. Pratibha will get back to you soon.",
  });
}));

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ ok: false, error: "Something went wrong. Please try again." });
});

async function start() {
  await mongoose.connect(mongoUri);
  await seedIfEmpty();
  app.listen(port, () => {
    console.log(`API ready at http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start API. Is local MongoDB running?", error);
  process.exit(1);
});
