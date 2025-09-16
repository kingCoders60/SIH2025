import express from "express";
import {
  createDrill,
  updateDrillStatus,
  getUserDrills,
} from "../controllers/drill.controller.js";

const router = express.Router();

router.post("/", createDrill);
router.put("/:drillId/status", updateDrillStatus);
router.get("/user/:userId", getUserDrills);

export default router;
