import Drill from "../models/drill.model.js";

export const createDrill = async (req, res) => {
  try {
    const { userId, type, date } = req.body;
    const drill = new Drill({ userId, type, date });
    await drill.save();
    res.status(201).json({ message: "Drill Created", drill });
  } catch (error) {
    res.status(500).json({
      message: "Some error has occured at drill Controller" + error.message,
    });
  }
};

export const updateDrillStatus = async (req, res) => {
  try {
    const { drillId } = req.params;
    const { status, score } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    const updatedDrill = await Drill.findByIdAndUpdate(
      drillId,
      { status, score },
      { new: true } // This option returns the updated document
    );

    if (!updatedDrill) {
      return res.status(404).json({ message: "Drill not found." });
    }

    res.status(200).json({
      message: "Drill status updated successfully.",
      drill: updatedDrill,
    });
  } catch (err) {
    console.error("Error in updateDrillStatus:", err);
    res.status(500).json({
      message:
        "Some error is occured at upDrillStatus in drill controller!" +
        err.message,
    });
  }
};

export const getUserDrills = async (req, res) => {
  try {
    const { userId } = req.params;
    const drills = await Drill.find({ userId }).sort({ date: -1 });
    res.json(drills);
  } catch (err) {
    console.error("Error in getUserDrills:", err);
    res.status(500).json([]);
  }
};

// Add a new controller function to handle the completion logic
export const completeDrill = async (req, res) => {
  try {
    const { drillId, score } = req.body;

    const updatedDrill = await Drill.findByIdAndUpdate(
      drillId,
      { status: "completed", score: score },
      { new: true }
    );

    if (!updatedDrill) {
      return res.status(404).json({ message: "Drill not found." });
    }

    res
      .status(200)
      .json({ message: "Drill completed successfully.", drill: updatedDrill });
  } catch (err) {
    console.error("Error in completeDrill:", err);
    res.status(500).json({
      message: "Some error occurred while completing the drill: " + err.message,
    });
  }
};
