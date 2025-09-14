import Disaster from "../models/disaster.model.js";

export const getAllDisasters = async (req, res) => {
  try {
    const disasters = await Disaster.find();
    res.json(disasters);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch disasters" });
  }
};

export const createDisaster = async (req, res) => {
  try {
    const { name, description, region } = req.body;
    const disaster = new Disaster({ name, description, region });
    await disaster.save();
    res.status(201).json(disaster);
  } catch (err) {
    res.status(500).json({ error: "Failed to create disaster" });
  }
};
