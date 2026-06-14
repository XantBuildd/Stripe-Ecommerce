import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookieHelper } from "../utils/cookieHelper.js";
import { jwtSign } from "../services/jwt.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const isFound = await User.findOne({ email });

    if (isFound)
      return res.status(400).json({ message: "Email already exists" });

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const token = jwtSign({ id: user._id });

    res.cookie("token", token, cookieHelper);

    return res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwtSign({ id: user._id });

    res.cookie("token", token, cookieHelper);

    return res.json({
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", cookieHelper);
    return res.json({ message: "Logout successful" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
