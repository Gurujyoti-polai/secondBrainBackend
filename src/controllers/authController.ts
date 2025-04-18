import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Signup request received:", req.body); // Debugging Step
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("login request received");

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    // Set HTTP-only cookie (optional for extra security)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // console.log("Inside authController");
    const userId = (req as any).userId;
    // console.log("This is the USERId who is logging in", userId);
    const user = await User.findById(userId).select("-password");
    // console.log("This is the USER who is logging in", user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
