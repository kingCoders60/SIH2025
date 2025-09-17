import axios from "axios";
import * as cheerio from "cheerio";
import Alert from "../models/alert.model.js";

async function fetchIMDAlerts() {
  try {
    const res = await axios.get("https://mausam.imd.gov.in/");
    const $ = cheerio.load(res.data);

    const cycloneText = $("#cyclone-warning").text().trim(); // hypothetical selector

    if (cycloneText) {
      await Alert.create({
        type: "Cyclone Warning",
        severity: "Critical",
        region: "Odisha",
        message: cycloneText,
        source: "IMD",
        timestamp: new Date(),
      });
      console.log("✅ IMD alert stored");
    }
  } catch (err) {
    console.error("MD fetch error:", err.message);
  }
}

export default fetchIMDAlerts;
