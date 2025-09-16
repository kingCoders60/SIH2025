import Drill from "../models/drill.model.js";

export const createDrill = async (req, res) => {
  try {
    const { userId, type, date } = req.body;
    const drill = new Drill({ userId, type, date });
    await drill.save();
    res.status(200).json({ message: "Drill Created", drill });
  } catch (error) {
    res.status(500).json({
      message: "Some error has occured at drill Controller" + error.message,
    });
  }
};
export const updateDrillStatus = async (req, res) => {
  try {
  } catch (err) {
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
    res.status(500).json({
      message: "Some error has occured at getUserDrills" + err.message,
    });
  }
};
