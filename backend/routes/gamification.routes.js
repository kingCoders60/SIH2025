// routes/gamification.routes.js
import express from "express";
import {
  getUserProgress,
  updateUserProgress,
} from "../controllers/gamification.controller.js";

const router = express.Router();

router.get("/:id/progress", getUserProgress);
router.post("/:id/progress", updateUserProgress);

export default router;
