import express from "express";
import {
  getAllDisasters,
  createDisaster,
} from "../controllers/disaster.controller.js";

const router = express.Router();

router.get("/", getAllDisasters);
router.get("/", createDisaster);

export default router;
