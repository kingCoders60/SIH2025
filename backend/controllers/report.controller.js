import Report from "../models/report.model.js";

// Create a new report
export const createReport = async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json({ message: "Report submitted successfully." });
  } catch (err) {
    console.error("Report submission error:", err);
    res.status(500).json({ message: "Failed to submit report." });
  }
};

// Get all reports (admin only)
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate(
      "reporterId",
      "name email role"
    );
    res.status(200).json(reports);
  } catch (err) {
    console.error("Report fetch error:", err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
};
