import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      region: user.region,
    },
    process.env.SECRET_PRIVATE_KEY,
    { expiresIn: "7d" }
  );
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, region, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      region,
      role,
    });

    const token = generateToken(newUser);
    // console.log("Signup payload:", data);
    console.log("Incoming signup data:", req.body);
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed!",
      error: error.message,
    });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({ user, token });
  } catch (error) {
    return res.status(500).json({
      message: "Login Failed",
      error: error.message,
    });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      message: "Logged Out Successfully!",
    });
  } catch (error) {
    console.log("Error in logout Controller", error);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
