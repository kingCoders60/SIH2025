import express from "express";
import {
  registerUser,
  loginUser,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
// router.post("/logout", logout);
router.get("/check", protectRoute, checkAuth);

export default router;
