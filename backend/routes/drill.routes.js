import express from "express";
import { getUserDrills, createDrill } from "../controllers/drill.controller.js";

const router = express.Router();

router.get("/", getUserDrills);
router.post("/", createDrill);

export default router;
