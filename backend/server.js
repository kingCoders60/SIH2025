import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import drillRoutes from "./routes/drill.routes.js";
import authRoutes from "./routes/auth.routes.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const alloedOrigins = [process.env.CLIENT_URL || "http://localhost:5173"];

app.use(
  cors({
    origin: alloedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/drills", drillRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server Already Running.");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is live at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting the DB..", err.message);
    process.exit(1);
  });
