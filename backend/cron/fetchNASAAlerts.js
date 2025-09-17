import axios from "axios";
import Alert from "../models/alert.model.js";

export async function fetchNASAAlerts() {
  try {
    const res = await axios.get("https://eonet.gsfc.nasa.gov/api/v3/events");
    const events = res.data.events;

    for (const event of events) {
      const isCritical = event.categories.some(
        (c) => c.title === "Severe Storms" || c.title === "Wildfires"
      );

      await Alert.create({
        type: event.title,
        severity: isCritical ? "Critical" : "Moderate",
        region: "India",
        message: event.description || event.title,
        source: "NASA EONET",
        timestamp: new Date(event.geometry[0].date),
      });
    }

    console.log("✅ NASA alerts fetched and stored");
  } catch (err) {
    console.error("Error fetching NASA alerts:", err.message);
  }
}
