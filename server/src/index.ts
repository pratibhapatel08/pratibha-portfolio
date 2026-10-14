import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { portfolioData } from "./seed.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin(origin, callback) {
      if (
        !origin ||
        /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin) ||
        origin === clientOrigin
      ) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
  }),
);

app.use(express.json({ limit: "32kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, status: "API is running" });
});

app.get("/api/portfolio", (_req, res) => {
  res.json({
    ok: true,
    ...portfolioData,
  });
});

app.post("/api/contact", (_req, res) => {
  res.status(501).json({
    ok: false,
    error: "Contact message storage is not configured.",
  });
});

app.listen(port, () => {
  console.log(`API ready on port ${port}`);
});