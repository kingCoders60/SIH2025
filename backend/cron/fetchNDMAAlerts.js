import axios from "axios";
import * as cheerio from "cheerio";
import Alert from "../models/alert.model.js";

async function fetchNDMAAlerts() {
  try {
    const res = await axios.get("https://ndma.gov.in/");
    const $ = cheerio.load(res.data);

    const floodText = $(".alert-banner").text().trim(); // hypothetical selector

    if (floodText) {
      await Alert.create({
        type: "Flood Alert",
        severity: "Moderate",
        region: "Bihar",
        message: floodText,
        source: "NDMA",
        timestamp: new Date(),
      });
      console.log("✅ NDMA alert stored");
    }
  } catch (err) {
    console.error("❌ NDMA fetch error:", err.message);
  }
}

export default fetchNDMAAlerts;
