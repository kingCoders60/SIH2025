import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import drillRoutes from "./routes/drill.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { config } from "./config/env.js";
import alertRoutes from "./routes/alerts.routes.js";
import { fetchNASAAlerts } from "./cron/fetchNASAAlerts.js";
dotenv.config();
import fetchIMDAlerts from "./cron/fetchIMDAlerts.js";
import fetchNDMAAlerts from "./cron/fetchNDMAAlerts.js";
const PORT = process.env.PORT || 5001;

const app = express();
const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/drills", drillRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/alerts", alertRoutes);

app.get("/", (req, res) => {
  res.send("Server Already Running.");
});

console.log("⏳ Fetching NASA alerts...");

connectDB()
  .then(() => {
    setInterval(fetchNASAAlerts, 30 * 60 * 1000);
    setInterval(fetchIMDAlerts, 30 * 60 * 1000);
    setInterval(fetchNDMAAlerts, 30 * 60 * 1000);
    app.listen(PORT, () => {
      console.log(`Server is live at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting the DB..", err.message);
    process.exit(1);
  });
