import express from "express";
import Alert from "../models/alert.model.js";

const router = express.Router();

// GET /api/alerts?region=Odisha&severity=Critical
router.get("/", async (req, res) => {
  try {
    const { region, severity, status } = req.query;
    const query = {};
    if (region) query.region = region;
    if (severity) query.severity = severity;
    if (status) query.status = status;

    const alerts = await Alert.find(query).sort({ timestamp: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

export default router;
