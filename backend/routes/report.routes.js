import express from "express";
import {
  createReport,
  getAllReports,
} from "../controllers/report.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.post("/create", createReport);

router.get("/all", protectRoute, isAdmin, getAllReports);

export default router;
