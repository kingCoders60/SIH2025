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

      const isIndiaEvent = event.geometry.some(
        (g) =>
          g.coordinates &&
          g.coordinates[1] >= 6 &&
          g.coordinates[1] <= 38 && // latitude
          g.coordinates[0] >= 68 &&
          g.coordinates[0] <= 97 // longitude
      );

      if (!isIndiaEvent) continue; // skip non-India events

      const timestamp = new Date(event.geometry[0].date);
      const message = event.description || event.title;

      // Check for duplicates
      const exists = await Alert.findOne({ message, timestamp });
      if (exists) continue;

      await Alert.create({
        type: event.title,
        severity: isCritical ? "Critical" : "Moderate",
        region: "India",
        message,
        source: "NASA EONET",
        timestamp,
        status: "Active",
      });
    }

    console.log("✅ NASA India alerts fetched and stored");
  } catch (err) {
    console.error("❌ Error fetching NASA alerts:", err.message);
  }
}
