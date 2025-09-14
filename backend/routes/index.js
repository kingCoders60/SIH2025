import express from "express";
import authRoutes from "./auth.routes.js";
import disasterRoutes from "./disaster.routes.js";
import drillRoutes from "./drill.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/disasters", disasterRoutes);
router.use("/drills", drillRoutes);

export default router;
